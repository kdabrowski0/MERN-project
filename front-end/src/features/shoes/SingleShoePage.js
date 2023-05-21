import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SingleShoePage.css";
import {
  selectShoeById,
  useDeleteShoeMutation,
  useDeleteCommentMutation,
} from "./shoesApiSlice";
import useAuth from "../../hooks/useAuth";
import CommentSection from "../comments/CommentSection";

const SingleShoePage = () => {
  const { id } = useParams();
  const { username, isAdmin, isUser } = useAuth();
  const navigate = useNavigate();

  const shoe = useSelector((state) => selectShoeById(state, id));
  const [deleteShoe] = useDeleteShoeMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const onDeleteCommentClicked = async (commentId) => {
    await deleteComment({ shoeId: shoe.id, commentId });
  };

  const onDeleteShoeClicked = async () => {
    await deleteShoe({ id: shoe.id });
    navigate("/home");
  };

  if (!shoe) {
    return (
      <section>
        <h2>shoe not found!</h2>
      </section>
    );
  }

  const date = new Date(shoe.release_date);
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();
  return (
    <div>
      <div className="singleShoePage">
        <div className="imgposition">
          <img src={shoe.img_url} alt="Shoe img" className="singleimg"></img>
        </div>
        <div className="singlecontent">
          <h2>{shoe.shoeName}</h2>
          <p>Shoe Designer: {shoe.designer}</p>
          <p>Shoe Price: {shoe.price}$</p>
          <p>Is this shoe created with collaboration: {shoe.collaboration}</p>
          <div className="date">
            <div className="date__month">{month}</div>
            <div className="date__year">{year}</div>
            <div className="date__day">{day}</div>
          </div>
        </div>
      </div>
      <p className="shoeCredit">
        {isAdmin && (
          <Link className="btn-single-shoe" to={`/editShoe/${shoe.id}`}>
            Edit shoe
          </Link>
        )}

        {isAdmin && (
          <button
            className="btn-single-shoe"
            type="button"
            onClick={onDeleteShoeClicked}
          >
            Delete shoe
          </button>
        )}
      </p>
      <footer>
        <CommentSection shoeId={shoe.id} />
      </footer>
      <div className="comments">
        {shoe.comments
          .map((comment, index) => (
            <div className="singlecomment" key={index}>
              <p className="usercomment">{comment.username}</p>
              <p>{comment.content}</p>
              {isAdmin && (
                <button onClick={() => onDeleteCommentClicked(comment._id)}>
                  Delete Comments
                </button>
              )}
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
};

export default SingleShoePage;

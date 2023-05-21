import { useAddNewCommentMutation } from '../shoes/shoesApiSlice';
import React,{useState} from 'react';
import useAuth from '../../hooks/useAuth';

const CommentSection = ({ shoeId }) => {
  const [addComment] = useAddNewCommentMutation();
  const [comment, setComment] = useState("");
  
  const { username, isAdmin, isUser } = useAuth();

  const handleComment = (e) => {
    e.preventDefault();
    addComment({ 
      shoeId: shoeId,
      content: comment,
      username: username
    });
    setComment("");
  };

  return (
    <div>
      <form onSubmit={handleComment}>
        <textarea
          className='commentarea'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="add comment"
        />
        <button className='btn-add-comment' type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
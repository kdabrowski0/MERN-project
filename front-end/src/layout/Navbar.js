import React, { useEffect }  from "react";
import { Link, useNavigate } from "react-router-dom";
import GoToTop from "./GoToTop";
import useAuth from "../hooks/useAuth";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

import "./Navbar.css";
const Navbar = () => {
  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);


  const { username, isAdmin, isUser } = useAuth();

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <li>
            <ul>
              <Link className="navi" to="/home">
                Home
              </Link>

              <GoToTop />
            </ul>
            <ul>
              <Link className="navi" to="/Funinfo">
                Fun Info
              </Link>

              <GoToTop />
            </ul>
            <ul>
              {isAdmin && (
                <Link className="navi" to="/AddShoe">
                  Add Shoe
                </Link>
              )}
              <GoToTop />
            </ul>
            <ul>
            {isAdmin && (<Link className="navi" to="/userlist">
                User List
              </Link>
              )}

              <GoToTop />
            </ul>
            <ul>
              <button className="navi" title="Logout" onClick={sendLogout}>
                Logout
              </button>
            </ul>
            {(isAdmin || isUser) && <ul>Logged in as: {username}</ul>}
          </li>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

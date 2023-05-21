import { Link } from "react-router-dom";
import GoToTop from "./GoToTop";
import './PublicPage.css'
const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">My Page</span>
        </h1>
      </header>
      <div>Login or signup first before entering further</div>
      <li className="publiclist">
        <ul>
          <Link to="/signup">User Signup</Link>
          <GoToTop />
        </ul>
        <ul>
          <Link to="/login">User Login</Link>
          <GoToTop />
        </ul>
      </li>
    </section>
    
  );
  return content;
};
export default Public;

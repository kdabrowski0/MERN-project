import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isAdmin = false;
  let isUser = false;
  let status = "User";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    isAdmin = roles.includes("Admin");
    isUser = roles.includes("User");

    if (isUser) status = "User";
    if (isAdmin) status = "Admin";

    return { username, roles, status, isAdmin, isUser };
  }

  return { username: "", roles: [], isAdmin, isUser, status };
};
export default useAuth;

import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";



const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isUser = false;
  let isAdmin = false;
  let status = "User";
  let id = null

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles, id } = decoded.UserInfo;

    isUser = roles.includes("User");
    isAdmin = roles.includes("Admin");

    if (isUser) status = "User";
    if (isAdmin) status = "Admin";

    return { id, username, roles, status, isAdmin, isUser };
  }

  return { id, username: "", roles: [], isAdmin, isUser, status };
};
export default useAuth;

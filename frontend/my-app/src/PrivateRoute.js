import { Navigate } from "react-router-dom";
import { GetEmail, GetColour } from "./scripts/getCookies";

export const PrivateRoute = ({ children}) => {

  if (GetEmail() && GetColour()) {
    return children
  }
      
  return <Navigate to="/login" />
}
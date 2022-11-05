import { Redirect } from "react-router-dom";

export const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) return <Redirect to="/" />;
  return children;
};

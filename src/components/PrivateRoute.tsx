import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  if (!token || !name) {
    return <Navigate to="/auth/signin" />;
  }

  return children;
};

export default PrivateRoute;

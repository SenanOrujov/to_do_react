import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useSelector((x) => x.account);
  if (!isLoggedIn) return <Navigate to={"/login"} />;
  return children;
}

import { RootState } from "configStore";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: Props) => {
  // Kiểm tra xem user đã đăng nhập hay chưa
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user);
  if (user === null) {
    // Chưa đăng nhập
    return <Navigate to="/login" />;
  }

  // Đã đăng nhập
  return children;
};

export default ProtectedRoute;

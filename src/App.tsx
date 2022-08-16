import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from "Components/ErrorBoundary/ErrorBoundary";
import HomeTemplate from "./Templates/HomeTemplate";
import ProtectedRoute from "Routes/ProtectedRoute";
import GlobalStyles from "./GlobalStyles";
import Loading from "Components/Loading/Loading";

// Khi import trực tiếp như thế này thì mặc định sẽ được tải về khi ứng dụng khởi chạy
// import HomePage from "./Pages/HomePage/HomePage";
// import Contact from "./Pages/Contact/Contact";
// import Login from "./Pages/Login/Login";
// import Register from "./Pages/Register/Register";
// import About from "./Pages/About/About";
// import Checkout from "./Pages/Checkout/Checkout";
// import AddMovie from "Pages/AddMovie/AddMovie";

// Sử dụng React lazy để trì hoãn việc import component, component chỉ được import khi ta gọi tới nó
const HomePage = lazy(() => import("Pages/HomePage/HomePage"));
const ListCours = lazy(() => import("Pages/Detail/ListCours"));
const DetailCours = lazy(() => import("Pages/Detail/DetailCours"));
const UserProfile = lazy(() => import("Pages/UserProfile/UserProfile"));
const Login = lazy(() => import("Pages/Login/Login"));
const Register = lazy(() => import("Pages/Register/Register"));
const About = lazy(() => import("Pages/About/About"));
const Checkout = lazy(() => import("Pages/Checkout/Checkout"));
const AddMovie = lazy(() => import("Pages/AddMovie/AddMovie"));
const ErrorPage = lazy(() => import("./Components/ErrorBoundary/ErrorPage"));

function App() {
  return (
    <ErrorBoundary>
      {/* Suspense dùng để hiện thị ra fallback UI khi component đang được load */}
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Routes>
            <Route path="" element={<HomeTemplate />}>
              <Route path="danh-muc-khoa-hoc/:maDanhMuc" element={<ListCours />} />
              <Route path="chi-tiet/:maKhoaHoc" element={<DetailCours />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="about" element={<About />} />
              <Route path="error" element={<ErrorPage />} />
              <Route
                path="dang-ky/:maKhoaHoc"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="tai-khoan/"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              
              <Route path="movies/add" element={<AddMovie />} />
              <Route index element={<HomePage />} />
              <Route path="*" element={<Navigate to={"error"} />} />
            </Route>
          </Routes>

          <GlobalStyles />
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;

//tsrfc: React.FC
//<TenComponent />: React.ReactElement

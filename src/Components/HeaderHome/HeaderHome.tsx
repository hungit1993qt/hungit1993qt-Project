//tsrafce
import { useState, useRef, useEffect } from "react";
import { useOnClickOutside, useDebounce } from "usehooks-ts";
import styles from "_Playground/SCSS/Header.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "antd/dist/antd.css";
import { Button } from "antd";
import { getKhoaHocTheoDanhMuc } from "Slices/listCourseByCatalog";
import { getParamsPagination } from "Slices/searchCours";
import { logOut } from "Slices/auth";
import { getDanhMucKhoaHoc } from "Slices/courseCatalog";
// import { ActionPagination } from "Interface/ActionPagination";

const HeaderHome = () => {
  //debound value

  const [value, setValue] = useState<string>("");
  const handleSearch = (e: any) => {
    setValue(e.target.value);
  };

  const tenKhoaHoc = useDebounce<string>(value, 500);

  // let pageSize = 8;
  // let page = 1;

  const dispatch = useDispatch<AppDispatch>();
  // const [selectCours, seSelectCours] = useState("");
  const navigate = useNavigate();
  const [activeMobile, setActiveMobile] = useState(false);

  useEffect(() => {
    dispatch(getDanhMucKhoaHoc());
    //  dispatch(getDanhSachKhoaHocPhanTrang({ tenKhoaHoc, page, pageSize }));
    dispatch(getParamsPagination(tenKhoaHoc));
  }, [tenKhoaHoc]);
  // const [visibleLogin, setVisibleLogin] = useState(false);
  // const [visibleRegister, setVisibleRegister] = useState(false);
  const ShowMenuMobile = () => {
    setActiveMobile(!activeMobile);
  };
  // const { khoaHocPhanTrang } = useSelector(
  //   (state: RootState) => state.khoaHocPhanTrang
  // );
  const ref = useRef(null);
  const handleClickOutside = () => {
    //console.log('clicked outside')
    setActiveMobile(false);
  };
  // const handleClickInside = () => {
  //   // Your custom logic here
  //   //console.log('clicked inside')
  //   setActiveMobile(true);
  // };
  useOnClickOutside(ref, handleClickOutside);
  const { danhMucKhoaHoc } = useSelector(
    (state: RootState) => state.danhMucKhoaHoc
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const getValueLocalstorage = JSON.parse(
    localStorage.getItem("userLogin") as string
  );
  const handleChange = (e: any) => {
    // seSelectCours(e.target.value);
    dispatch(getKhoaHocTheoDanhMuc(e.target.value));
    navigate(`danh-muc-khoa-hoc/${e.target.value}`);
  };
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
  };
  const { activeNavbar } = useSelector(
    (state: RootState) => state.danhMucKhoaHoc
  );

  return (
    <header className={styles["header"]}>
      <section className={styles["flex"]}>
        <NavLink to={"/"} className={styles["logo"]}>
          H-Learning <i className="fa fa-graduation-cap"></i>
        </NavLink>

        <div>
          <input
            className={activeNavbar ? styles["box"] : styles["hide"]}
            placeholder="Tìm khóa học"
            type="text"
            onChange={handleSearch}
          />
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <select
          defaultValue={"DEFAULT"}
          name="couses"
          className={styles["box"]}
          onChange={handleChange}
          required
        >
          <option value={"DEFAULT"} disabled>
            Chọn khóa học --
          </option>
          {danhMucKhoaHoc.map((danhmuckhoahoc) => {
            return (
              <option
                key={danhmuckhoahoc.maDanhMuc}
                value={`${danhmuckhoahoc.maDanhMuc}`}
              >
                {danhmuckhoahoc.tenDanhMuc}
              </option>
            );
          })}
        </select>

        <nav
          className={
            activeMobile
              ? `${styles.navbar} ${styles.active} `
              : styles["navbar"]
          }
        >
          {/* <a className={activeNavbar ? "" : styles["hide"]} href="#home">
            Trang chủ
          </a>
          <a className={activeNavbar ? "" : styles["hide"]} href="#about">
            Giới thiệu
          </a>
          <a className={activeNavbar ? "" : styles["hide"]} href="#courses">
            Các khóa học
          </a>
          <a className={activeNavbar ? "" : styles["hide"]} href="#teachers">
            Giảng viên
          </a>
          <a className={activeNavbar ? "" : styles["hide"]} href="#reviews">
            Đánh giá
          </a>
          <a className={activeNavbar ? "" : styles["hide"]} href="#contact">
            Liên hệ
          </a> */}
          <Button
            className={user ? styles["hide"] : styles["loginBtn"]}
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </Button>
          <Button
            className={user ? styles["hide"] : styles["registerBtn"]}
            onClick={() => navigate("/register")}
          >
            Đăng ký
          </Button>

          <div className={user ? styles["dropdown"] : styles["hide"]}>
            <div>
              <span className={styles["titleUser"]}>
                {user ? getValueLocalstorage.hoTen : ""}
              </span>
            </div>
            <div className={styles["dropdown-content"]}>
              <p>
                <Button
                  className={user ? styles["btn-drop-user"] : styles["hide"]}
                  onClick={() => navigate("/tai-khoan")}
                >
                  Tài khoản
                </Button>
              </p>
              <p>
                <Button
                  className={user ? styles["btn-drop-user"] : styles["hide"]}
                  onClick={() => handleLogOut()}
                >
                  Đăng xuất
                </Button>
              </p>
            </div>
          </div>
        </nav>
        <div
          onClick={() => ShowMenuMobile()}
          id={styles["menu-btn"]}
          className={activeMobile ? "fas fa-bars fa-times" : "fas fa-bars"}
          ref={ref}
        />
      </section>
    </header>
  );
};

export default HeaderHome;

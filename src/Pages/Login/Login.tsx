// Một số thư viện làm việc với form trong React: formik, react-final-form, react-hook-form
import styles from "_Playground/SCSS/Login/Login.module.scss";
import { useForm, FieldErrors } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
interface LoginValues {
  taiKhoan: string;
  matKhau: string;
}

const Login = () => {
  const [visibleLogin, setVisibleLogin] = useState(false);
  const showModal = () => {
    setVisibleLogin(true);
  };

  const handleCancel = () => {
    setVisibleLogin(false);
  };
  useEffect(() => {
    showModal()
    return function cleanup() {
      handleCancel()
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    // defaultValues: Khai báo giá trị mặc định cho các input trong form
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    // mode: cách validation được trigger (default là submit)
    mode: "onTouched",
  });

  const onSubmit = (values: LoginValues) => {
    console.log(values);
  };

  const onError = (error: FieldErrors<LoginValues>) => {
    console.log(error);
  };

  return (
    <div>
      <Modal
        visible={visibleLogin}
        title="ĐĂNG NHẬP"
        onCancel={handleCancel}
        footer={null}
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div>
            {/* <label>Tài Khoản</label> */}
            <input
              type="text"
              placeholder="Vui lòng nhập tài khoản!"
              {...register("taiKhoan", {
                // validations
                required: {
                  value: true,
                  message: "Tài khoản không được để trống",
                },
                pattern: {
                  value: /^[a-zA-Z0-9]{5,}$/,
                  message:
                    "Tài khoản bao gồm các kí tự hoa, thường, số và ít nhất 5 kí tự",
                },
              })}
              className={styles["box"]}
            />
            {/* {errors.taiKhoan?.type === 'required' && <span>Tài khoản không được để trống</span>}
          {errors.taiKhoan?.type === 'pattern' && <span>Tài khoản gồm các kí tự hoa thường, số và ít nhất 5 kí tự</span>} */}
            {errors.taiKhoan && <span>{errors.taiKhoan?.message}</span>}
          </div>
          <div>
            {/* <label>Mật Khẩu</label> */}
            <input
              type="text"
              placeholder="Vui lòng nhập mật khẩu!"
              {...register("matKhau", {
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message:
                    "Mật khẩu ít nhất một chữ cái, một số và ít nhất 8 kí tự",
                },
              })}
              className={styles["box"]}
            />
            {errors.matKhau && <span>{errors.matKhau?.message}</span>}
          </div>
          <button className={styles["loginBtn"]}>Đăng Nhập</button>
        </form>
      </Modal>
    </div>
  );
};

export default Login;

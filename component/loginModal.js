import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { axiosGet, axiosPost } from "@/api";
import * as yup from "yup";
import { loginSchema, registrationSchema } from "./validation";
import homeStyles from "../styles/Home.module.css";
const LoginModal = ({ isOpen, onRequestClose, closeLoginModal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [street, SetStreet] = useState("");
  const [Contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [Type, setType] = useState("");
  const [showRegisterationSection, setShowRegisterationSection] =
    useState(false);
  const [showLoginSection, setShowLoginSection] = useState(true);
  const [otp, setOTP] = useState(["", "", "", "", ""]);
  const length = otp.length;
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [newOtp, setnewOtp] = useState("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  const currentPath = router.asPath;
  const { city } = router.query;
  const openRegistrationModal = () => {
    setShowLoginSection(false);
    setShowRegisterationSection(true);
  };

  const openLoginModal = () => {
    setShowRegisterationSection(false);
    setShowLoginSection(true);
  };

  useEffect(() => {
    if (isOpen) {
      setModalIsOpen(true);
    }
  }, [isOpen]);

  const closeModal = () => {
    setModalIsOpen(false);
    onRequestClose();
    closeLoginModal();
  };

  const submitHandler = async (type) => {
    // setShowLoginSection(false);
    setShowRegisterationSection(false);
    setType(type);
    const api_url = process.env.API_URL;
    if (type == "login") {
      try {
        await loginSchema.validate({ mobile }, { abortEarly: false });
        const userData = await axiosPost(`/User/Login?cred=${mobile}`);
        if (userData.resp === true) {
          sessionStorage.setItem("userData", JSON.stringify(userData.respObj));
          setModalIsOpen(false);
           router.push(currentPath);
          // router.push("/")
        } else {
          setLoginError(userData.respMsg);
        }
      } catch (validationError) {
        if (validationError instanceof yup.ValidationError) {
          setLoginError(validationError.message);
        } else {
          console.log(validationError);
        }
      }
    }
    if (type == "registeration") {
      setShowOtpSection(true);
      // try {
      //   const data = await axiosPost(
      //       `${api_url}/User/Login?mobile_number=${mobile}&password=${password}`
      //     )
      //       if (data.resp === true) {
      //         sessionStorage.clear();
      //         sessionStorage.setItem(
      //           "userObject",
      //           JSON.stringify(data.respObj)
      //         );
      //         setIsLoggedIn(true);
      //         setMobile("");
      //         setPassword("");
      //         closeModal();
      //       } else {
      //         e.preventDefault();
      //         setLoginError("Please check your mobile and password.");
      //       }
      // } catch (error) {
      //   console.log(error);
      //   }
    }
  };

  const handleOTPChange = (e, index) => {
    const inputs = document.querySelectorAll("input"),
      button = document.querySelector("button");
    inputs.forEach((input, index1) => {
      input.addEventListener("keyup", (e) => {
        const currentInput = input,
          nextInput = input.nextElementSibling,
          prevInput = input.previousElementSibling;
        if (currentInput.value.length > 1) {
          currentInput.value = "";
          return;
        }
        if (
          nextInput &&
          nextInput.hasAttribute("disabled") &&
          currentInput.value !== ""
        ) {
          nextInput.removeAttribute("disabled");
          nextInput.focus();
        }
        if (e.key === "Backspace") {
          inputs.forEach((input, index2) => {
            if (index1 <= index2 && prevInput) {
              input.removeAttribute("disabled");
              input.value = "";
              prevInput.focus();
            }
          });
        }
        if (!inputs[4].disabled && inputs[4].value !== "") {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });
    });
    window.addEventListener("load", () => inputs[0].focus());
    const newOTP = [...otp];
    newOTP[index] = e.target.value;
    setOTP(newOTP);
    const valuesArray = newOTP.toString();
    const Array = valuesArray.split(",").filter((value) => value !== "");
    if (Array.length == length) {
      const combinedString = Array.join("");
      setnewOtp(combinedString);
    }
  };

  const verifyOTP = async () => {
    if (Type == "login") {
      const userData = await axiosPost(`/User/Login?cred=${mobile}`);
    } else if (Type == "registeration") {
      const obj = {
        user_id: "",
      };
    }
  };
  return (
    <div>
      <Modal
      show={modalIsOpen} onHide={closeModal}
        className={homeStyles["loginModal"]}
        centered
      >
        <div className="container container-fluid">
          {showLoginSection ? (
            <form className="p-4 m-4">
              <h1 className="text-center mb-4">Login</h1>
              <div className="form-group">
                <label className="form-label">Mobile or Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              {/* <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div> */}
              {loginError && (
                <p className="" style={{ color: "red" }}>
                  {loginError}
                </p>
              )}
              <button
                type="button"
                className="btn btn-block w-100 btn-secondary btn-block mb-4 text-center"
                onClick={() => submitHandler("login")}
              >
                Sign in
              </button>
              <div className="text-center">
                <p>
                  Not a member?{" "}
                  <span
                    onClick={openRegistrationModal}
                    style={{ cursor: "pointer" }}
                  >
                    Register
                  </span>
                </p>
                <p>Or Sign In with</p>
                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                  onClick={() => signIn("google")}
                >
                  <i className="fa fa-google"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                  onClick={() => signIn("facebook")}
                >
                  <i className="fa fa-facebook"></i>
                </button>
              </div>
            </form>
          ) : showRegisterationSection ? (
            <form className="p-4">
              <h1 className="text-center mb-4">Registration</h1>
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile</label>
                <input
                  type="text"
                  className="form-control"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-block w-100 btn-primary btn-block mb-4 text-center"
                onClick={() => submitHandler("registeration")}
              >
                Submit
              </button>
              <div className="text-center">
                <p>
                  Already have an Account?{" "}
                  <span onClick={openLoginModal} style={{ cursor: "pointer" }}>
                    Login
                  </span>
                </p>
                <p>Or sign up with</p>
                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                  onClick={() => signIn("google")}
                >
                  <i className="fa fa-google"></i>
                </button>
                <button
                  type="button"
                  className="btn btn-link btn-floating mx-1"
                  onClick={() => signIn("facebook")}
                >
                  <i className="fa fa-facebook"></i>
                </button>
              </div>
            </form>
          ) : (
            ""
          )}

          {showOtpSection ? (
            <div className="otp-container">
              <header>
                <i className="bx bxs-check-shield"></i>
              </header>
              <h4>Enter OTP Code</h4>
              <form action="#" className="otp-form">
                <div className="input-field">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      className="otp-input"
                      value={digit}
                      onChange={(e) => handleOTPChange(e, index)}
                      maxLength="1"
                    />
                  ))}
                </div>
                <button onClick={verifyOTP}>Verify OTP</button>
                <p className="mt-2 text-center">{verificationStatus}</p>
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </Modal>
    </div>
  );
};

export default LoginModal;

import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { axiosGet, axiosPost } from "@/api";
import * as yup from "yup";
import { loginSchema, registrationSchema } from "./validation";
import homeStyles from "../styles/Home.module.css";
import useUserData from "./verifyEmail";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginModal = ({ isOpen, onRequestClose, closeLoginModal }) => {
  const { data: session, status } = useSession();
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
  const [showloginInput, setShowLoginInput] = useState(true);
  const [Type, setType] = useState("");
  const [showRegisterationSection, setShowRegisterationSection] = useState(false);
  const [showLoginSection, setShowLoginSection] = useState(true);
  const [otp, setOTP] = useState(["", "", "", "", ""]);
  const length = otp.length;
  const [showOtpSection, setShowOtpSection] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [newOtp, setnewOtp] = useState("");
  const [loginError, setLoginError] = useState("");
  const inputs = ["input1", "input2", "input3", "input4"];
  const cartId =
  typeof window !== "undefined" ? sessionStorage.getItem("cartId") : "";
  const router = useRouter();
  const currentPath = router.asPath;
  const { city } = router.query;
  const [hitApi,setHitApi] = useState(false)
  const {isLoggedIn,loading} =useUserData()

  const openRegistrationModal = () => {
    setShowLoginSection(false);
    setShowRegisterationSection(true);
  };

  const openLoginModal = () => {
    setShowRegisterationSection(false);
    setShowLoginSection(true);
  };


  // useEffect(()=>{
  //   if(isLoggedIn == true){
      
  //   }else if(isLoggedIn == false){
           
  //   }
  // },[isLoggedIn])

  useEffect(() => {
    if (isOpen) {
      setModalIsOpen(true);
    }
  }, [isOpen]);

 

  const closeModal = () => {
    setModalIsOpen(false);
    setShowLoginInput(true)
    setShowOtpSection(false)
    setMobile("")
    onRequestClose();
    closeLoginModal();
  };

  const submitHandler = async (type) => {
    // setShowLoginSection(false);
    setShowRegisterationSection(false);
    setShowLoginInput(false)
      try {
        var loginData= {
          "mobile": mobile,
          "fb_id": "",
          "cart_id": cartId ? cartId : "",
          "g_id": session.user.email,
          "otp": ""
        }
        await loginSchema.validate({ mobile }, { abortEarly: false });
        setShowOtpSection(true)
        const userData = await axiosPost("/User/UserPortalRegistration",loginData);
        if (userData.resp === true) {
           sessionStorage.setItem("userData", JSON.stringify(userData.respObj));
           setShowOtpSection(true);
          // setModalIsOpen(false);
          router.push(currentPath);
        } else {
          registerUser()
          setLoginError(userData.respMsg);
        }
      } catch (validationError) {
        if (validationError instanceof yup.ValidationError) {
          setLoginError(validationError.message);
        } else {
          console.log(validationError);
        }
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

  useEffect(() => {
    inputs.forEach((id, index) => {
      const input = document.getElementById(id);
      if (input) {
        addListener(input, index);
      }
    });
  }, [showOtpSection]);

  function addListener(input, index) {
    input.addEventListener("keyup", function (event) {
      const code = parseInt(input.value);
      if (code >= 0 && code <= 9) {
        // setErrors({otp:""})
        const nextIndex = index + 1;
        const nextInput = document.getElementById(inputs[nextIndex]);
        if (nextInput) nextInput.focus();
      } else {
        input.value = "";
      }

      const key = event.key;
      if (key === "Backspace" || key === "Delete") {
        const prevIndex = index - 1;
        const prevInput = document.getElementById(inputs[prevIndex]);
        if (prevInput) prevInput.focus();
      }
    });
  }

  const verifyOTP = async () => {
    var loginData= {
      "mobile": mobile,
      "fb_id": "",
      "cart_id": cartId ? cartId : "",
      "g_id": session.user.email,
      "otp": otp
    }
    if (userData) {
      const data = await axiosPost('OtpDetails/VerifUseryOtp',loginData);
      if(data){
        toast("You have successfully logged in",{autoClose : 3000,closeButton: true})
      }
    } 
  };


  // const registerUser = async (type,e) => {
  //   // if (type === 'google') {
  //   //   try {
  //   //     const result = await signIn(type, { redirect: false });
  //   //     e.preventDefalut()
  //   //     if (result?.error) {
  //   //       console.error(`Error signing in with ${type}: ${result.error}`);
  //   //     } else {
  //   //       const userData = result.account;
  //   //       // setShowLoginSection(true);
  //   //        setShowOtpSection(true);
  //   //     }
  //   //   } catch (error) {
  //   //     console.error(`Error during Google sign-in:`, error);
  //   //   }
  //   // } else {
  //   //   setShowOtpSection(true); 
  //   //   try {
  //   //     const data = await axiosPost(
  //   //       `${api_url}/User/Login?mobile_number=${mobile}&password=${password}`
  //   //     );
  //   //     if (data.resp === true) {
  //   //       sessionStorage.clear();
  //   //       sessionStorage.setItem('userObject', JSON.stringify(data.respObj));
  //   //       setIsLoggedIn(true);
  //   //       setMobile('');
  //   //       setPassword('');
  //   //       closeModal();
  //   //     } else {
  //   //       setLoginError('Please check your mobile and password.');

  //   //     }
  //   //   } catch (error) {
  //   //     console.error('Error during login:', error);
  //   //   }
  //   // }
  // // if(type=="google"){
     
  // // }
  // // else if(type=="facebook"){

  // // }

  // if(data){
  //   setShowLoginInput(true)
  // }
  // };


  // const registerUser = async (type, e) => {
  //   if (type === 'google' || type === 'facebook') {
  //     try {
  //       const result = await signIn(type, { redirect: false });
  //       e.preventDefault();
  //       if (result?.error) {
  //         console.error(`Error signing in with ${type}: ${result.error}`);
  //       } else {
  //         const sessionData = result?.data;
  //         if (sessionData) {
  //           const userData = await axiosPost(`/User/Login?cred=${sessionData.mobile}`);
  //           if (userData.resp === true) {
  //             sessionStorage.setItem("userData", JSON.stringify(userData.respObj));
  //             router.push(currentPath);
  //           } else {
  //             setShowLoginInput(true);
  //             setShowOtpSection(true);
  //             setLoginError('Please complete registration.');
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error(`Error during ${type} sign-in:`, error);
  //     }
  //   }
  // };
  
  return (
    <div>
      <Modal
        show={modalIsOpen}
        onHide={closeModal}
        className={homeStyles["loginModal"]}
        centered
      >
        <div className="container container-fluid">
          {
          // showLoginSection ? (
            showloginInput ? (
              <form className="p-4 m-4">
                {/* <h1 className="loginTitle">Login / Sign Up</h1> */}
                <h1 className="loginTitle">{ session ? "Phone Number" :"Login / Sign Up"}</h1>
                <div className="form_group mb-3">
                  {/* <label className="form-label">Email / Phone No</label> */}
                  <input
                    type="text"
                    className="form_control"
                    value={mobile}
                    placeholder="Phone No"
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
                  className="loginButtons"
                  onClick={() => submitHandler("login")}
                >
                  Proceed
                </button>
                {
                  !session && (
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
                  <div className="socialLogin">
                    <button
                      type="button"
                      className="btn googleLogin"
                      onClick={() => signIn("google")}
                    >
                      <i className="fa fa-google"></i>
                    </button>
                    <button
                      type="button"
                      className="btn facebookLogin"
                      onClick={() => signIn("facebook")}
                    >
                      <i className="fa fa-facebook"></i>
                    </button>
                  </div>
                </div>
                  )
                }
                
              </form>
            ) : ("")
           
             
          // )
          //  : showRegisterationSection ? (
          //   <form className="p-4">
          //     <h1 className="loginTitle">Registration</h1>
          //     <div className="form-group">
          //       {/* <label className="form-label">First Name</label> */}
          //       <input
          //         type="text"
          //         className="form_control"
          //         placeholder="First Name"
          //         value={firstName}
          //         onChange={(e) => setFirstName(e.target.value)}
          //       />
          //     </div>
          //     <div className="form-group">
          //       {/* <label className="form-label">Last Name</label> */}
          //       <input
          //         type="text"
          //         className="form_control"
          //         placeholder="Last Name"
          //         value={lastName}
          //         onChange={(e) => setLastName(e.target.value)}
          //       />
          //     </div>
          //     <div className="form-group">
          //       {/* <label className="form-label">Email</label> */}
          //       <input
          //         type="text"
          //         className="form_control"
          //         placeholder="Email"
          //         value={email}
          //         onChange={(e) => setEmail(e.target.value)}
          //       />
          //     </div>
          //     <div className="form-group mb-3">
          //       {/* <label className="form-label">Mobile</label> */}
          //       <input
          //         type="text"
          //         placeholder="Mobile"
          //         className="form_control"
          //         value={mobile}
          //         onChange={(e) => setMobile(e.target.value)}
          //       />
          //     </div>
          //     <button
          //       type="button"
          //       className="loginButtons"
          //       onClick={() => submitHandler("registeration",e)}
          //     >
          //       Proceed
          //     </button>
          //     <div className="text-center">
          //       <p>
          //         Already have an Account?{" "}
          //         <span onClick={openLoginModal} style={{ cursor: "pointer" }}>
          //           Login
          //         </span>
          //       </p>
          //       <p>Or sign up with</p>
          //       <div className="socialLogin">
          //           <button
          //             type="button"
          //             className="btn googleLogin"
          //             onClick={() => registerUser("google")}
          //           >
          //             <i className="fa fa-google"></i>
          //           </button>
          //           <button
          //             type="button"
          //             className="btn facebookLogin"
          //             onClick={() => registerUser("facebook")}
          //           >
          //             <i className="fa fa-facebook"></i>
          //           </button>
          //         </div>
          //     </div>
          //   </form>
          // ) : (
          //   ""
          // )
          }
           {
              showOtpSection && (
                (
                  <div className={`${homeStyles["form-group"]} text-center p-4`}>
                    <label className="mb-4">Verify Your OTP</label>
                    <div className={`${homeStyles["otp-input"]}`}>
                      {inputs.map((id) => (
                        <input
                          className={`${homeStyles.input}`}
                          key={id}
                          id={id}
                          type="text"
                          maxLength="1"
                        />
                      ))}
                    </div>
                    <button className="btn btn-primary mt-4" onClick={verifyOTP}>verify</button>
                  </div>
                )
              )
            }
        </div>
      </Modal>
      <ToastContainer />

    </div>
  );
};

export default LoginModal;

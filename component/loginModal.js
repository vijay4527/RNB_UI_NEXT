import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const AutoOpenModal = ({ isOpen, closeLoginModal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setModalIsOpen(true);
    }
  }, [isOpen]);

  const closeModal = () => {
    setModalIsOpen(false);
    closeLoginModal();
  };

  const submitHandler = async (e) => {
    const api_url = process.env.API_URL;
    try {
      const data = await axios
        .post(
          `${api_url}/User/Login?mobile_number=${mobile}&password=${password}`
        )
        .then((res) => {
          if (res.data.resp === true) {
            sessionStorage.clear();
            sessionStorage.setItem(
              "userObject",
              JSON.stringify(res.data.respObj)
            );
            setIsLoggedIn(true);
            setMobile("");
            setPassword("");
            closeModal();
          } else {
            e.preventDefault();
            setLoginError("Please check your mobile and password.");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Auto Open Modal"
      >
        {" "}
        <div className="container container-fluid">
          <form className="p-4">
            <h1 className="text-center mb-4">Login</h1>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="mobile_field">
                Mobile
              </label>
              <input
                type="number"
                id="mobile_field"
                className="form-control"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password_field">
                Password
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {loginError && (
              <div className="alert alert-danger">{loginError}</div>
            )}
            <button
              type="button"
              className="btn btn-block w-100 btn-primary btn-block mb-4"
              onClick={submitHandler}
            >
              Sign in
            </button>
            <div className="text-center">
              <p>
                Not a member? <Link href="/register">Register</Link>
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
        </div>
      </Modal>
    </div>
  );
};

export default AutoOpenModal;

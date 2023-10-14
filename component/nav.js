import axios from "axios";
// import Modal from "react-modal";
import React, { useEffect, useState, useRef } from "react";
// import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
// import AutoOpenModal from "../../Component/cityModal";
import "@/styles/Home.module.css";
import Link from "next/link";
import { getCookie } from "@/cookieUtils";

const Header = () => {
  //   const { data, status } = useSession();
  const [category, setCategory] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  //   const [isCityModalOpen, setCityModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  //   const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const router = useRouter();
  //   const modalRef = useRef(null);
  const api_url = process.env.API_URL;
  //   const city =
  //     typeof window !== "undefined" ? localStorage.getItem("cityName") : "";
  const city = getCookie("userCity");
  const openCityModal = () => {
    setCityModalOpen(true);
  };

  const closeCityModal = () => {
    setCityModalOpen(false);
  };

  const closeModal = () => {
    setLoginModalOpen(false);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    var cityobj = {
      city_name: city,
    };
    axios.post(`${api_url}/Category/GetAllCategories`, cityobj).then((res) => {
      setCategory(res.data);
    });
  };

  const fetchSubcategories = (categoryId) => {
    if (!subcategories[categoryId]) {
      axios
        .get(`${api_url}/SubCategory/GetSubCategoryByCategoryId/${categoryId}`)
        .then((res) => {
          return setSubcategories(res.data);
        });
    }
  };

  const handleLogout = async () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      sessionStorage.clear();
      router.push("/");
    } else {
      await signOut();
    }
  };

  const submitHandler = async (e) => {
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
            setUserInfo(res.data.respObj);
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
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <div className="navbar-nav">
              <li className={`nav-item`}>
                <Link className="nav-link" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={`/${city}/product`}>
                  Product
                </Link>
              </li>

              <li className="nav-item categories-link">
                <span className="nav-link">Categories</span>
                <ul className="categories-list">
                  {category.map((cat) => (
                    <li
                      className="category-item"
                      key={cat.category_id}
                      onMouseEnter={() => fetchSubcategories(cat.category_id)}
                    >
                      <Link
                        href={`/${city}/l/${cat.category_name}`}
                        key={cat.category_id}
                        className={`nav-link`}
                      >
                        {cat.category_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item subcategory-link">
                <span className="nav-link">Sub Category</span>
                <ul className="subcategories-list">
                  {subcategories.map((subcat) => {
                    const subCategoryName = subcat.sub_category_name
                      .split(" ")
                      .join("-"); // Add this line here
                    return (
                      <li
                        className={`subcategory-item`}
                        key={subcat.sub_category_id}
                      >
                        <Link
                          className="nav-link"
                          href={`/${city}/l/${subcat.category_name}/${subCategoryName}`}
                        >
                          {subcat.sub_category_name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </div>
            <div className="ml-auto">
              <div className="nav-item">
                <li className="">
                  {isLoggedIn ? (
                    <a className="nav-link">
                      <i className="fa fa-user"></i>
                    </a>
                  ) : (
                    <span className="nav-link" href="">
                      <i
                        className="fa fa-user"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => setLoginModalOpen(true)}
                      ></i>
                    </span>
                  )}
                </li>
              </div>
            </div>
            {/* {data?.user?.name || (isLoggedIn && userInfo) ? (
              <>
                <span style={{ marginRight: "15px" }}>
                  {data?.user ? (
                    <img
                      src={data?.user?.image}
                      height="25"
                      width="25"
                      alt="user image"
                    />
                  ) : (
                    <i
                      className="fa fa-user"
                      height="25"
                      width="25"
                      alt="user image"
                    />
                  )}
                  Hi, {data?.user?.name || (isLoggedIn && userInfo.first_name)}
                </span>
                <span style={{ cursor: "pointer" }} onClick={handleLogout}>
                  Logout
                </span>
              </>
            ) : (
              ""
            )} */}

            {/* <li className="nav-item ml-4">
              <button
                className="btn btn-sm btn-secondary"
                onClick={openCityModal}
              >
                Select City
              </button>
               {isCityModalOpen && (
                <AutoOpenModal
                  isOpen={isCityModalOpen}
                  onClose={closeCityModal}
                />
              )}
            </li> */}
            {/* <li className="nav-item ml-4">
              <Link className="nav-link" href={`/${city}/myorders`}>
                My Orders
              </Link>
            </li>
            <li className="nav-item ml-4">
              <Link className="nav-link" href={`/${city}/cart`}>
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>{" "}
              </Link>
            </li> */}
          </ul>
        </div>
      </nav>
      {/* <Modal
        isOpen={isLoginModalOpen}
        // onRequestClose={closeModal}
        contentLabel="Login"
        // className={styles.modallogin}
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
                // onClick={() => signIn("google")}
              >
                <i className="fa fa-google"></i>
              </button>

              <button
                type="button"
                className="btn btn-link btn-floating mx-1"
                // onClick={() => signIn("facebook")}
              >
                <i className="fa fa-facebook"></i>
              </button>
            </div>
          </form>
        </div>
      </Modal> */}
    </>
  );
};

export default Header;

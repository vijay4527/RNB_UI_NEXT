import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import "@/styles/Home.module.css";
import Link from "next/link";
import { getCookie } from "@/cookieUtils";
import { useSession, signIn, signOut } from "next-auth/react";
import Modal from "react-modal";
import LoginModal from "@/component/loginModal";
import { axiosGet, axiosPost } from "@/api";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const Header = () => {
  const { data, status } = useSession();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState({});
  const router = useRouter();
  const { city } = router.query;
  const [isActive, setIsActive] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const formatUrl = (url) => {
    return `/${encodeURIComponent(url).replace(/%20/g, "-")}`;
  };
  const brand = [
    {
      cat_id: 1,
      name: "Our Brands",
      url_name: "/OurBrands",
      sub_categories: [
        {
          sub_id: 1,
          name: "Dayuri",
          url_name: "#Dayuri",
        },
        {
          sub_id: 2,
          name: "Yuri",
          url_name: "#Yuri",
        },
        {
          sub_id: 3,
          name: "Gaocheng",
          url_name: "#GAOCHENG",
        },
        {
          sub_id: 4,
          name: "GC Power",
          url_name: "#GCPower",
        },
        // {
        //   "sub_id": 5,
        //   "name": "EMTEX POWER TOOLS",
        //   "url_name": "#EmtexPowerTools"
        // },
        {
          sub_id: 6,
          name: "Yuri Speed",
          url_name: "#YuriSpeed",
        },
        {
          sub_id: 7,
          name: "Workpro",
          url_name: "#Workpro",
        },
      ],
    },
  ];

  const handleNavList = () => {
    var x = document.getElementById("nav");
    if (x.classNameName === "navbar navbar-expand-lg navbar-light bg-light") {
      x.classNameName += " responsive";
    } else {
      x.classNameName = "navbar navbar-expand-lg navbar-light bg-light";
    }
  };
  useEffect(() => {
    const userInfo =
      typeof window !== "undefined" ? sessionStorage.getItem("userData") : "";
    setUser(JSON.parse(userInfo));
  }, []);
  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    var cityobj = {
      city_name: city,
    };
    const categories = await axiosGet("/Category/GetAllTypeCategory/" + city);
    if (categories) {
      setCategory(JSON.parse(categories.respObj));
      console.log(categories.respObj);
    }
  };

  // const fetchSubcategories = async (categoryId) => {
  //   if (!subcategories[categoryId]) {
  //     const subcategoryData = await axiosGet(
  //       `/SubCategory/GetSubCategoryByCategoryId/${categoryId}`
  //     );
  //     if (subcategoryData) {
  //       return setSubcategories(subcategoryData);
  //     }
  //   }
  // };

  const handleLogout = async () => {
    if (user) {
      setIsLoggedIn(false);
      sessionStorage.clear();
      localStorage.removeItem("userData");
      setUser({});
      router.push("/");
    } else {
      await signOut();
    }
  };

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  const handleMouseEnter = async (category) => {
    // fetchSubcategories(categoryId);
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleCategoryClick = (category) => {
    if (hoveredCategory === category) {
      setHoveredCategory(null);
    } else {
      // fetchSubcategories(categoryId);
      setHoveredCategory(category);
    }
  };
  return (
    <>
      <div>
        <Navbar className="navbar_wrapper navbar navbar-expand-lg navbar-light">
          <div className="container">
            <div className="navbar_body">
              <div className="navbar_logo">
                <a href="/" className="navbar-brand">
                  {/* <img
                    src="https://fama.b-cdn.net/Yuri/logos/yuri%20logo%202.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  /> */}
                </a>
              </div>
              <div className="navbar_content">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <div className="navbar_MobileClose">
                    <span>Close</span>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  </div>
                  <Nav className="me-auto"></Nav>
                </Navbar.Collapse>
              </div>
              <div className="navbar_search">
                <ul>
                  {/* <li>
                    <a href="/events" className="nav-link">
                      <b>Events</b>
                      <i
                        className="icon-fa fa fa-calendar"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li> */}
                  {/* <li>
                    <a
                      href="https://bit.ly/yuricatalogue2023"
                      target="_blank"
                      className="catelog-icon nav-link"
                    >
                      <b>Our Catalog</b>
                      <i className=" icon-fa fa fa-book" aria-hidden="true"></i>
                    </a>
                  </li> */}
                  {/* <li>
                    <a href="/find-retailer" className="nav-link">
                      <b>Find Us</b>
                      <i
                        className="icon-fa fa fa-map-marker"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li> */}
                  <li>
                    {/* <div className="nav-link">
                      <div className="search-product">
                        <input
                          placeholder="Search product..."
                          type="text"
                          readOnly=""
                        />
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </div>
                    </div> */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Navbar>
        <nav className="subNavbar_wrapper navbar navbar-expand-lg navbar-light">
          <div className="container">
            <button
              className="navbar-toggler toggleButton"
              type="button"
              onClick={toggleClass}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`navbar-collapse collapse ${isActive ? "show" : ""}`}
            >
              <div className="navbar_MobileClose" onClick={toggleClass}>
                <span>Close</span>
                <button className="navbar-toggler toggleButton" type="button">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
              <div className="Brands_navbody">
                <div className="subNavbar_body">
                  {category.map((category) => (
                    <div
                      className={`sub_nav ${
                        hoveredCategory === category ? "show" : ""
                      }`}
                      key={category.cat_id}
                    >
                      <div
                        onMouseEnter={() => handleMouseEnter(category)}
                        onMouseLeave={handleMouseLeave}
                        className={
                          !category.json_sub_category
                            ? "sub_navbtn active"
                            : "sub_navbtn"
                        }
                      >
                        <Link
                          href={`/products${formatUrl(category.url_name)}`}
                          onClick={toggleClass}
                        >
                          <h4 className="category-title">
                            {category.category_name}
                          </h4>
                        </Link>
                        <span className="category-dropIcon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="9"
                            height="7"
                            fill="none"
                            viewBox="0 0 9 7"
                          >
                            <path
                              stroke="#000"
                              d="M8.177 1.25 4.355 5.663a.1.1 0 0 1-.15 0L.382 1.25"
                            />
                          </svg>
                        </span>
                      </div>

                      <div
                        className={
                          !category.sub_categories
                            ? "MobileSub_navbtn active"
                            : "MobileSub_navbtn sub_navbtn"
                        }
                      >
                        <Link
                          href={`/products${formatUrl(category.url_name)}`}
                          onClick={toggleClass}
                        >
                          <h4 className="category-title">
                            {category.category_name}
                          </h4>
                        </Link>
                        <span
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleCategoryClick(category)}
                          className="category-dropIcon"
                        >
                          <i className="plus_Icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-plus"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                          </i>
                          <i className="mins_Icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-dash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                            </svg>
                          </i>
                        </span>
                      </div>
                      {category.json_sub_category && (
                        <div
                          className={`subnav-content ${
                            hoveredCategory === category ? "active" : ""
                          }`}
                        >
                          <ul className="submenu-list">
                            {category.json_sub_category.map((subcategory) => (
                              <li
                                className="category-sub-title"
                                key={subcategory.sub_category_id}
                              >
                                <Nav.Link
                                  onClick={toggleClass}
                                  href={`/products${formatUrl(
                                    category.url_name
                                  )}${formatUrl(subcategory.url_name)}`}
                                >
                                  {subcategory.sub_category_name}
                                </Nav.Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="mob_backdrop">
          <div className="  "></div>
        </div>
      </div>

      {!data
        ? !(user && Object.keys(user).length > 0) && (
            <LoginModal
              isOpen={isLoginModalOpen}
              onRequestClose={closeLoginModal}
              closeLoginModal={closeLoginModal}
              contentLabel="Login"
            />
          )
        : ""}
    </>
  );
};

export default Header;

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
    const categories = await axiosPost("/Category/GetAllCategories", cityobj);
    if (categories) {
      setCategory(categories);
    }
  };

  const fetchSubcategories = async (categoryId) => {
    if (!subcategories[categoryId]) {
      const subcategoryData = await axiosGet(
        `/SubCategory/GetSubCategoryByCategoryId/${categoryId}`
      );
      if (subcategoryData) {
        return setSubcategories(subcategoryData);
      }
    }
  };

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

  const handleMouseEnter = async (category, categoryId) => {
    fetchSubcategories(categoryId);
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
    setSubcategories([]);
  };
  return (
    <>
      {/* <nav classNameName="navbar navbar-expand-lg navbar-light bg-light" id="nav">
        <ul classNameName="navbar-nav">
          <li classNameName={`nav-item`}>
            <Link classNameName="nav-link" href="/">
              Home
            </Link>
          </li>

          <li classNameName="nav-item categories-link">
            <span classNameName="nav-link">Categories</span>
            <ul classNameName="categories-list">
              {category.map((cat) => (
                <li
                  classNameName="category-item"
                  key={cat.category_id}
                  onMouseEnter={() => fetchSubcategories(cat.category_id)}
                >
                  <Link
                    href={`/${city}/l/${cat.category_name}`}
                    key={cat.category_id}
                    classNameName={`nav-link`}
                  >
                    {cat.category_name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li classNameName="nav-item subcategory-link">
            <span classNameName="nav-link">Sub Category</span>
            <ul classNameName="subcategories-list">
              {subcategories.map((subcat) => {
                if (!subcat || !subcat.sub_category_name) {
                  return null;
                }
                const subCategoryName = subcat.sub_category_name
                  .split(" ")
                  .join("-");
                return (
                  <li
                    classNameName={`subcategory-item`}
                    key={subcat.sub_category_id}
                  >
                    <Link
                      classNameName="nav-link"
                      href={`/${city}/l/${subcat.category_name}/${subCategoryName}`}
                    >
                      {subcat.sub_category_name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <div classNameName="">
            <div classNameName="nav-item">
              <li classNameName="">
                {isLoggedIn ? (
                  <a classNameName="nav-link">
                    <i classNameName="fa fa-user"></i>
                  </a>
                ) : (
                  <span classNameName="nav-link" href="">
                    <i
                      classNameName="fa fa-user"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={openLoginModal}
                    ></i>
                  </span>
                )}
              </li>
            </div>
          </div>
          {data?.user?.name || (user && Object.keys(user).length > 0) ? (
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
                    classNameName="fa fa-user"
                    height="25"
                    width="25"
                    alt="user image"
                  />
                )}
                Hi, {data?.user?.name || (user && user.first_name) || ""}
              </span>
              <li classNameName="nav-item">
                <Link classNameName="nav-link" href={`${city}/profile`}>
                  Manage Profile
                </Link>
              </li>
              <span style={{ cursor: "pointer" }} onClick={handleLogout}>
                Logout
              </span>
            </>
          ) : (
            user &&
            Object.keys(user).length > 0 && (
              <div>
                <span style={{ marginRight: "15px" }}>
                  <img
                    src={user?.image}
                    height="25"
                    width="25"
                    alt="user image"
                  />
                  Hi, {user.first_name || ""}
                </span>
                <li classNameName="nav-item">
                  <Link classNameName="nav-link" href={`${city}/profile`}>
                    Manage Profile
                  </Link>
                </li>
                <span style={{ cursor: "pointer" }} onClick={handleLogout}>
                  Logout
                </span>
              </div>
            )
          )}
          <li classNameName="icon">
            <i classNameName="fa fa-bars" onClick={handleNavList}></i>
          </li>
          <li></li>
        </ul>
      </nav> */}
      <div>
        <nav className="navbar_wrapper navbar navbar-expand-lg navbar-light">
          <div className="container">
            <div className="navbar_body">
              <div className="navbar_logo">
                <a href="/" className="navbar-brand">
                  <img
                    src="https://fama.b-cdn.net/Yuri/logos/yuri%20logo%202.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  />
                </a>
              </div>
              <div className="navbar_content">
                <button
                  aria-controls="basic-navbar-nav"
                  type="button"
                  aria-label="Toggle navigation"
                  className="navbar-toggler collapsed"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="basic-navbar-nav">
                  <div className="navbar_MobileClose">
                    <span>Close</span>
                    <button
                      aria-controls="basic-navbar-nav"
                      type="button"
                      aria-label="Toggle navigation"
                      className="navbar-toggler collapsed"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
                  </div>
                  <div className="me-auto navbar-nav"></div>
                </div>
              </div>
              <div className="navbar_search">
                <ul>
                  <li>
                    <a href="/events" className="nav-link">
                      <b>Events</b>
                      <i
                        className="icon-fa fa fa-calendar"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://bit.ly/yuricatalogue2023"
                      target="_blank"
                      className="catelog-icon nav-link"
                    >
                      <b>Our Catalog</b>
                      <i className=" icon-fa fa fa-book" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/find-retailer" className="nav-link">
                      <b>Find Us</b>
                      <i
                        className="icon-fa fa fa-map-marker"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </li>
                  <li>
                    <div className="nav-link">
                      <div className="search-product">
                        <input
                          placeholder="Search product..."
                          type="text"
                          readOnly=""
                        />
                        <i className="fa fa-search" aria-hidden="true"></i>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div className="fixed-Enquire">
          <h4>Enquire Now</h4>
        </div>
        <nav className="subNavbar_wrapper navbar navbar-expand-lg navbar-light">
          <div className="container">
            <button className="navbar-toggler toggleButton" type="button">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="navbar-collapse collapse ">
              <div className="navbar_MobileClose">
                <span>Close</span>
                <button className="navbar-toggler toggleButton" type="button">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </div>
              <div className="Brands_navbody">
                <div className="subNavbar_body">
                  {/* {category
                    ? category.map((cat) => {
                        <div
                          className={`sub_nav ${
                            hoveredCategory === cat.category_id ? "show" : ""
                          }`}
                          key={cat.category_id}
                        >
                          <div
                            onMouseEnter={() =>
                              handleMouseEnter(cat.category_id)
                            }
                            onMouseLeave={handleMouseLeave}
                            className={
                              !category.sub_categories
                                ? "sub_navbtn active"
                                : "sub_navbtn"
                            }
                          >
                            <Link
                              href={`${city}/l/${cat.category_name}`}
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
                                {category.name}
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

                          {/* {category.sub_categories && (
                            <div
                              className={`subnav-content ${
                                hoveredCategory === category ? "active" : ""
                              }`}
                            >
                              <ul className="submenu-list">
                                {category.sub_categories.map((subcategory) => (
                                  <li
                                    className="category-sub-title"
                                    key={subcategory.sub_id}
                                  >
                                    <Nav.Link
                                      onClick={toggleClass}
                                      href={`/products${formatUrl(
                                        category.url_name
                                      )}${formatUrl(subcategory.url_name)}`}
                                    >
                                      {subcategory.name}
                                    </Nav.Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )} */}
                  {/* </div>; */}
                  {/* }) */}
                  {/* : ""} */}

                  {category.map((cat, index) => (
                    <div
                      className={`sub_nav ${
                        hoveredCategory === cat.category_name ? "show" : ""
                      }`}
                      key={cat.category_id}
                      // key={index}
                    >
                      <div
                        onMouseEnter={() =>
                          handleMouseEnter(cat.category_name, cat.category_id)
                        }
                        onMouseLeave={handleMouseLeave}
                        // className={
                        //   !category.sub_categories
                        //     ? "sub_navbtn active"
                        //     : "sub_navbtn"
                        // }
                        className="sub_navbtn"
                      >
                        <Link href={`/products`} onClick={toggleClass}>
                          <h4 className="category-title">
                            {cat.category_name}
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
                        // className={
                        //   !category.sub_categories
                        //     ? "MobileSub_navbtn active"
                        //     : "MobileSub_navbtn sub_navbtn"
                        // }
                        className="MobileSub_navbtn sub_navbtn"
                      >
                        <Link href={`/products`} onClick={toggleClass}>
                          <h4 className="category-title">
                            {cat.category_name}
                          </h4>
                        </Link>
                        <span
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleCategoryClick(cat.category_name)}
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

                      {subcategories && (
                        <div
                          className={`subnav-content ${
                            hoveredCategory === cat.category_name
                              ? "active"
                              : ""
                          }`}
                        >
                          <ul className="submenu-list">
                            {subcategories.map((subcategory) => (
                              <li
                                className="category-sub-title"
                                key={subcategory.sub_category_name}
                              >
                                <Nav.Link
                                  onClick={toggleClass}
                                  href={`/products`}
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

                  {/*  */}
                  {/* {category &&
                    category.map((cat, index) => {
                      debugger;
                      // <div>{cat.category_name}</div>;

                      <div
                        className={`sub_nav ${
                          hoveredCategory === cat ? "show" : ""
                        }`}
                        key={index}
                        // key={cat.category_id}
                      >
                        <div
                          onMouseEnter={() => handleMouseEnter(category)}
                          onMouseLeave={handleMouseLeave}
                          // className={
                          //   !category.sub_categories
                          //     ? "sub_navbtn active"
                          //     : "sub_navbtn"
                          // }
                        >
                          <Link
                            href={`/products${formatUrl(cat.category_name)}`}
                            onClick={toggleClass}
                          >
                            <h4 className="category-title">
                              {cat.category_name}
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
                        // className={
                        //   !category.sub_categories
                        //     ? "MobileSub_navbtn active"
                        //     : "MobileSub_navbtn sub_navbtn"
                        // }
                        >
                          <Link
                            href={`/products${formatUrl(cat.category_name)}`}
                            // onClick={toggleClass}
                          >
                            <h4 className="category-title">
                              {cat.category_name}
                            </h4>
                          </Link>
                          <span
                            // onMouseLeave={handleMouseLeave}
                            // onClick={() => handleCategoryClick(category)}
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

                        {/* {category.sub_categories && (
                        <div
                          className={`subnav-content ${
                            hoveredCategory === category ? "active" : ""
                          }`}
                        >
                          <ul className="submenu-list">
                            {category.sub_categories.map((subcategory) => (
                              <li
                                className="category-sub-title"
                                key={subcategory.sub_id}
                              >
                                <Nav.Link
                                  onClick={toggleClass}
                                  href={`/products${formatUrl(
                                    category.url_name
                                  )}${formatUrl(subcategory.url_name)}`}
                                >
                                  {subcategory.name}
                                </Nav.Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )} */}
                  {/* </div>; */}
                  {/* })}} */}

                  {/*  */}

                  {/* <div className="sub_nav ">
                    <div className="sub_navbtn">
                      <a href="/products/Power-tools">
                        <h4 className="category-title">Power tools</h4>
                      </a>
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
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="MobileSub_navbtn sub_navbtn">
                      <a href="/products/Power-tools">
                        <h4 className="category-title">Power tools</h4>
                      </a>
                      <span className="category-dropIcon">
                        <i className="plus_Icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
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
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                          </svg>
                        </i>
                      </span>
                    </div>
                    <div className="subnav-content ">
                      <ul className="submenu-list">
                        <li className="category-sub-title">
                          <a
                            href="/products/Power-tools/Cordless"
                            className="nav-link"
                          >
                            Cordless
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Power-tools/Grinding"
                            className="nav-link"
                          >
                            Grinding
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Power-tools/Cutting"
                            className="nav-link"
                          >
                            Cutting
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Power-tools/Breaker"
                            className="nav-link"
                          >
                            Breaker
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Power-tools/Drilling"
                            className="nav-link"
                          >
                            Drilling
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Power-tools/Sandering"
                            className="nav-link"
                          >
                            Sandering
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Power-tools/Agricultural"
                            className="nav-link"
                          >
                            Agricultural
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Power-tools/Generators"
                            className="nav-link"
                          >
                            Generators
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Power-tools/Vacuum-Cleaner-blower"
                            className="nav-link"
                          >
                            Vacuum Cleaner &amp; blower
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Power-tools/Compressors-pressure-washer"
                            className="nav-link"
                          >
                            Compressors &amp; pressure washer
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Power-tools/Mixers-concrete-vibrators"
                            className="nav-link"
                          >
                            Mixers &amp; concrete vibrators
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Power-tools/Wood-Working"
                            className="nav-link"
                          >
                            Wood Working
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Power-tools/Fastening"
                            className="nav-link"
                          >
                            Fastening
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Power-tools/Others"
                            className="nav-link"
                          >
                            Others
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="sub_nav ">
                    <div className="sub_navbtn">
                      <a href="/products/Saw-blades">
                        <h4 className="category-title">Saw blades</h4>
                      </a>
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
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="MobileSub_navbtn sub_navbtn">
                      <a href="/products/Saw-blades">
                        <h4 className="category-title">Saw blades</h4>
                      </a>
                      <span className="category-dropIcon">
                        <i className="plus_Icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
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
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                          </svg>
                        </i>
                      </span>
                    </div>
                    <div className="subnav-content ">
                      <ul className="submenu-list">
                        <li className="category-sub-title">
                          <a
                            href="/products/Saw-blades/Diamond-Saw-Blades"
                            className="nav-link"
                          >
                            Diamond Saw Blades
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Saw-blades/TCT-Circular-Saw-Blades"
                            className="nav-link"
                          >
                            TCT Circular Saw Blades
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="sub_nav ">
                    <div className="sub_navbtn">
                      <a href="/products/Hand-tools">
                        <h4 className="category-title">Hand tools</h4>
                      </a>
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
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="MobileSub_navbtn sub_navbtn">
                      <a href="/products/Hand-tools">
                        <h4 className="category-title">Hand tools</h4>
                      </a>
                      <span className="category-dropIcon">
                        <i className="plus_Icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
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
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                          </svg>
                        </i>
                      </span>
                    </div>
                    <div className="subnav-content ">
                      <ul className="submenu-list">
                        <li className="category-sub-title">
                          <a
                            href="/products/Hand-tools/Holding-Tools"
                            className="nav-link"
                          >
                            Holding Tools
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Hand-tools/Mechanical-Tools"
                            className="nav-link"
                          >
                            Mechanical Tools
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Hand-tools/Fastening-Tools"
                            className="nav-link"
                          >
                            Fastening Tools
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Hand-tools/Striking-Tools"
                            className="nav-link"
                          >
                            Striking Tools
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Hand-tools/Cutting-Tools"
                            className="nav-link"
                          >
                            Cutting Tools
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Hand-tools/Finishing-Tools"
                            className="nav-link"
                          >
                            Finishing Tools
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Hand-tools/Insulated-Tools"
                            className="nav-link"
                          >
                            Insulated Tools
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Hand-tools/Plumbing-Tools"
                            className="nav-link"
                          >
                            Plumbing Tools
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Hand-tools/Tools-Sets"
                            className="nav-link"
                          >
                            Tools Sets
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Hand-tools/Glass-Tools"
                            className="nav-link"
                          >
                            Glass Tools
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="sub_nav ">
                    <div className="sub_navbtn">
                      <a href="/products/Measuring-tools">
                        <h4 className="category-title">Measuring tools</h4>
                      </a>
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
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="MobileSub_navbtn sub_navbtn">
                      <a href="/products/Measuring-tools">
                        <h4 className="category-title">Measuring tools</h4>
                      </a>
                      <span className="category-dropIcon">
                        <i className="plus_Icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
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
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                          </svg>
                        </i>
                      </span>
                    </div>
                    <div className="subnav-content ">
                      <ul className="submenu-list">
                        <li className="category-sub-title">
                          <a
                            href="/products/Measuring-tools/Calipers"
                            className="nav-link"
                          >
                            Calipers
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Measuring-tools/Micrometers"
                            className="nav-link"
                          >
                            Micrometers
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Measuring-tools/Indicators"
                            className="nav-link"
                          >
                            Indicators
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Measuring-tools/Combination-Set"
                            className="nav-link"
                          >
                            Combination Set
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Measuring-tools/Gauge"
                            className="nav-link"
                          >
                            Gauge
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Measuring-tools/Magnetic-Stands"
                            className="nav-link"
                          >
                            Magnetic Stands
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Measuring-tools/Bevel-Protractor"
                            className="nav-link"
                          >
                            Bevel Protractor
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Measuring-tools/Measure-Tape"
                            className="nav-link"
                          >
                            Measure Tape
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Measuring-tools/Laser-Distance-Measure"
                            className="nav-link"
                          >
                            Laser Distance Measure
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Measuring-tools/Spirit-Level"
                            className="nav-link"
                          >
                            Spirit Level
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Measuring-tools/Ruler"
                            className="nav-link"
                          >
                            Ruler
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="sub_nav ">
                    <div className="sub_navbtn">
                      <a href="/products/Accessories">
                        <h4 className="category-title">Accessories</h4>
                      </a>
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
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="MobileSub_navbtn sub_navbtn">
                      <a href="/products/Accessories">
                        <h4 className="category-title">Accessories</h4>
                      </a>
                      <span className="category-dropIcon">
                        <i className="plus_Icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
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
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                          </svg>
                        </i>
                      </span>
                    </div>
                    <div className="subnav-content ">
                      <ul className="submenu-list">
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Chisel"
                            className="nav-link"
                          >
                            Chisel
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Drill-Chuck"
                            className="nav-link"
                          >
                            Drill Chuck
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Planer-Blade"
                            className="nav-link"
                          >
                            Planer Blade
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Adaptador"
                            className="nav-link"
                          >
                            Adaptador
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Hammer-Drills"
                            className="nav-link"
                          >
                            Hammer Drills
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Drill-Bit"
                            className="nav-link"
                          >
                            Drill Bit
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Diamond-Concrete-Core-Bits"
                            className="nav-link"
                          >
                            Diamond Concrete Core Bits
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Guide-Bars"
                            className="nav-link"
                          >
                            Guide Bars
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/HSS-Drill"
                            className="nav-link"
                          >
                            HSS Drill
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Saw-Chain"
                            className="nav-link"
                          >
                            Saw Chain
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Hole-Saw"
                            className="nav-link"
                          >
                            Hole Saw
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Switch"
                            className="nav-link"
                          >
                            Switch
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Handle"
                            className="nav-link"
                          >
                            Handle
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Housing"
                            className="nav-link"
                          >
                            Housing
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Air-Blow-Gun"
                            className="nav-link"
                          >
                            Air Blow Gun
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Back-Handle"
                            className="nav-link"
                          >
                            Back Handle
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Batteriies-Chargers"
                            className="nav-link"
                          >
                            Batteriies &amp; Chargers
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Base-Plate"
                            className="nav-link"
                          >
                            Base Plate
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Accessories/Cup-Brushes"
                            className="nav-link"
                          >
                            Cup Brushes
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="sub_nav ">
                    <div className="sub_navbtn">
                      <a href="/products/Spares">
                        <h4 className="category-title">Spares</h4>
                      </a>
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
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="MobileSub_navbtn sub_navbtn">
                      <a href="/products/Spares">
                        <h4 className="category-title">Spares</h4>
                      </a>
                      <span className="category-dropIcon">
                        <i className="plus_Icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
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
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                          </svg>
                        </i>
                      </span>
                    </div>
                    <div className="subnav-content ">
                      <ul className="submenu-list">
                        <li className="category-sub-title">
                          <a href="/products/Spares/Armatures" className="nav-link">
                            Armatures
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a href="/products/Spares/Stators" className="nav-link">
                            Stators
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Spares/Carbon-Brush"
                            className="nav-link"
                          >
                            Carbon Brush
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a href="/products/Spares/Gear-Box" className="nav-link">
                            Gear Box
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a href="/products/Spares/Gear" className="nav-link">
                            Gear
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a href="/products/Spares/Bearing" className="nav-link">
                            Bearing
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a href="/products/Spares/AB-Washer" className="nav-link">
                            AB Washer
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Spares/Middle-Cover"
                            className="nav-link"
                          >
                            Middle Cover
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a href="/products/Spares/Spindle" className="nav-link">
                            Spindle
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Spares/Pressure-Washer-Spares"
                            className="nav-link"
                          >
                            Pressure Washer Spares
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Spares/Collect-Set"
                            className="nav-link"
                          >
                            Collect Set
                          </a>
                        </li>
                        <li className="category-sub-title">
                          <a
                            href="/products/Spares/Chainsaw-Spares"
                            className="nav-link"
                          >
                            Chainsaw Spares
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div> */}
                </div>
                <div className="Brands_nav">
                  <div className="sub_nav ">
                    <div className="sub_navbtn">
                      <a href="/OurBrands">
                        <h4 className="category-title">Our Brands</h4>
                      </a>
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
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <div className="MobileSub_navbtn sub_navbtn">
                      <a href="/OurBrands">
                        <h4 className="category-title">Our Brands</h4>
                      </a>
                      <span className="category-dropIcon">
                        <i className="plus_Icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
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
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                          </svg>
                        </i>
                      </span>
                    </div>
                    <div className="subnav-content ">
                      <ul className="submenu-list">
                        <li className="category-sub-title">
                          <a href="/OurBrands#Dayuri">Dayuri</a>
                        </li>
                        <li className="category-sub-title">
                          <a href="/OurBrands#Yuri">Yuri</a>
                        </li>
                        <li className="category-sub-title">
                          <a href="/OurBrands#GAOCHENG">Gaocheng</a>
                        </li>
                        <li className="category-sub-title">
                          <a href="/OurBrands#GCPower">GC Power</a>
                        </li>
                        <li className="category-sub-title">
                          <a href="/OurBrands#YuriSpeed">Yuri Speed</a>
                        </li>
                        <li className="category-sub-title">
                          <a href="/OurBrands#Workpro">Workpro</a>
                        </li>
                      </ul>
                    </div>
                  </div>
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

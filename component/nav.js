import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Facebook from "next-auth/providers/facebook";
import LoginModal from "@/component/loginModal";
const brand = [
  {
    cat_id: 1,
    name: "Home",
    url_name: "mumbai",
    sub_categories: null,
  },
  {
    cat_id: 1,
    name: "About us",
    url_name: "mumbai/about-us",
    sub_categories: null,
  },
  {
    cat_id: 1,
    name: "Occasional Cakes",
    url_name: "OccasionalCakes",
    sub_categories: [
      {
        sub_id: 1,
        name: "Wedding Day",
        url_name: "#WeddingDay",
      },
      {
        sub_id: 2,
        name: "Birthday Bash Cake",
        url_name: "#BirthdayBashCake",
      },
      {
        sub_id: 3,
        name: "Dazzling Collection",
        url_name: "#DazzlingCollection",
      },
      {
        sub_id: 4,
        name: "Customised Cakes",
        url_name: "#CustomisedCakes",
      },
    ],
  },
  {
    cat_id: 1,
    name: "Our Products",
    url_name: "OurProducts",
    sub_categories: [
      {
        sub_id: 1,
        name: "Cheese Cake",
        url_name: "#CheeseCake",
      },
      {
        sub_id: 2,
        name: "Pastries",
        url_name: "#Pastries",
      },
      {
        sub_id: 3,
        name: "Biscuits",
        url_name: "#Biscuits",
      },
      {
        sub_id: 4,
        name: "Savoury",
        url_name: "#Savoury",
      },
      {
        sub_id: 5,
        name: "Donuts",
        url_name: "#Donuts",
      },
      {
        sub_id: 6,
        name: "Desserts",
        url_name: "#Desserts",
      },
      {
        sub_id: 7,
        name: "Chocolates",
        url_name: "#Chocolates",
      },
      {
        sub_id: 8,
        name: "Wafers",
        url_name: "#Wafers",
      },
      {
        sub_id: 9,
        name: "Titbits",
        url_name: "#Titbits",
      },
      {
        sub_id: 10,
        name: "Breads",
        url_name: "#Breads",
      },
      {
        sub_id: 11,
        name: "Tea Time Cakes",
        url_name: "#TeaTimeCakes",
      },
    ],
  },
  {
    cat_id: 1,
    name: "Cakes",
    url_name: `mumbai/l/Cakes`,
    sub_categories: [
      {
        sub_id: 1,
        name: "Mithai Magic Collection",
        url_name: "#MithaiMagicCollection",
      },
      {
        sub_id: 2,
        name: "Ready Regulars ",
        url_name: "#ReadyRegulars ",
      },
      {
        sub_id: 3,
        name: "Sinful Collections",
        url_name: "#SinfulCollections",
      },
      {
        sub_id: 4,
        name: "Photo Cakes",
        url_name: "#PhotoCakes",
      },
      {
        sub_id: 5,
        name: "Signature Cakes",
        url_name: "#SignatureCakes",
      },
      {
        sub_id: 6,
        name: "Fancy Cakes ",
        url_name: "#FancyCakes ",
      },
      {
        sub_id: 7,
        name: "Sensational Cakes",
        url_name: "#SensationalCakes",
      },
      {
        sub_id: 8,
        name: "Cake of The Month",
        url_name: "#CakeofTheMonth",
      },
      {
        sub_id: 9,
        name: "Tall Wonder",
        url_name: "#TallWonder",
      },
      {
        sub_id: 10,
        name: "Tintastic",
        url_name: "#Tintastic",
      },
    ],
  },
  {
    cat_id: 1,
    name: "Get Franchise",
    url_name: "GetFranchise",
    sub_categories: null,
  },
];

export default function Header() {
  const router = useRouter();
  const { city } = router.query;
  const [isLoactionActive, setIsLoactionActive] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { data, status } = useSession();
  const [countCart, setCountCart] = useState(0);

  const loactionToggle = () => {
    setIsLoactionActive(!isLoactionActive);
  };

  const toggleClass = () => {
    setIsActive(!isActive);
  };


  useEffect(()=>{
   console.log("Your data is ", data)
  },[data])
  const handleClick = () => {
    setIsClicked(!isClicked);
    // searchInputRef.current.focus();
  };

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleCategoryClick = (category) => {
    if (hoveredCategory === category) {
      setHoveredCategory(null);
    } else {
      setHoveredCategory(category);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setScrollPosition(scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const Logout = () => {
    sessionStorage.clear();
    signOut("google");
    signOut("facebook");
    setIsLoggedIn(false);
    router.push("/mumbai");
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      role="button"
      className="profileButton"
      aria-label="profilebutton"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <span className="SvgIcons">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          />
        </svg>
      </span>
    </a>
  ));

  useEffect(() => {
    const userObject =
      typeof window !== "undefined"
        ? JSON.parse(sessionStorage.getItem("userData")) || null
        : null;
    if (data || userObject) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [
    data,
    typeof window !== "undefined" ? sessionStorage.getItem("userData") : "",
  ]);

  return (
    <>
      <div>
        <Navbar
          expand="lg"
          className={`navbar_wrapper ${scrollPosition ? "fixed_header" : ""}`}
        >
          <Container>
            <div className="navbar_body">
              <div className="navbar_logo">
                <Navbar.Brand href="/">
                  <div className="flip-container">
                    <div className="flipper">
                      <div className="front">
                        <img
                          src="https://ribbonsandballoons.com/frontassets/images/logo3.png"
                          className="d-inline-block align-top"
                          alt="React Bootstrap logo"
                        />
                      </div>
                      <div className="back">
                        <img
                          src="https://fama.b-cdn.net/RnB/Logo-Golden.png"
                          className="d-inline-block align-top"
                          alt="React Bootstrap logo"
                        />
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>
                </Navbar.Brand>
              </div>
              <nav className="subNavbar_wrapper navbar navbar-expand-lg navbar-light">
                <div className="container">
                  <button
                    className="navbar-toggler toggleButton"
                    type="button"
                    onClick={toggleClass}
                    aria-label="button"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className={`Navbar_content navbar-collapse collapse ${
                      isActive ? "show" : ""
                    }`}
                  >
                    <div className="navbar_MobileClose" onClick={toggleClass}>
                      <span>Close</span>
                      <button
                        className="navbar-toggler toggleButton"
                        type="button"
                        aria-label="closeButton"
                      >
                        <span className="navbar-toggler-icon"></span>
                      </button>
                    </div>
                    <div className="Brands_navbody">
                      <div className="subNavbar_body">
                        {brand.map((category, index) => (
                          <div
                            className={`sub_nav ${
                              hoveredCategory === category ? "show" : ""
                            }`}
                            key={index}
                          >
                            <div
                              onMouseEnter={() => handleMouseEnter(category)}
                              onMouseLeave={handleMouseLeave}
                              className={
                                !category.sub_categories
                                  ? "sub_navbtn active"
                                  : "sub_navbtn"
                              }
                            >
                              <Link
                                href={`/${category.url_name}`}
                                onClick={toggleClass}
                                prefetch={true}
                              >
                                <h4 className="category-title">
                                  {category.name}
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
                                href={`/products${category.url_name}`}
                                onClick={toggleClass}
                                prefetch={true}
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

                            {category.sub_categories && (
                              <div
                                className={`subnav-content ${
                                  hoveredCategory === category ? "active" : ""
                                }`}
                              >
                                <ul className="submenu-list">
                                  {category.sub_categories.map(
                                    (subcategory) => (
                                      <li
                                        className="category-sub-title"
                                        key={subcategory.sub_id}
                                      >
                                        <Link
                                          href={`/products${category.url_name}${subcategory.url_name}`}
                                          prefetch={true}
                                        >
                                          <span onClick={toggleClass}>
                                            {subcategory.name}
                                          </span>
                                        </Link>
                                      </li>
                                    )
                                  )}
                                  <li className="category-sub-title">
                                    <Link
                                      href={`/${city}/l/Cakes`}
                                      prefetch={true}
                                    >
                                      All Cakes
                                    </Link>
                                  </li>
                                </ul>
                                <div className="subnav-img">
                                  <div className="imgdiv">
                                    <img
                                      src={`https://media.bakingo.com/gourmet_cake.jpg`}
                                      alt="No image found"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="navAction">
                    <ul>
                      <li>
                        <div
                          className="selectLocation"
                          onClick={loactionToggle}
                        >
                          <h4>Mumbai</h4>
                          <img
                            src="https://cdn-images.cure.fit/www-curefit-com/image/upload/c_fill,w_26,q_auto:eco,dpr_2,f_auto,fl_progressive/image/test/header/location.png"
                            alt="No image found"
                          />
                        </div>
                        <div
                          className={`selectLocationWrap ${
                            isLoactionActive ? "activeClass" : ""
                          }`}
                        >
                          <div className="selectLocationBody">
                            <div className="selectLocationImg">
                              <img
                                src="https://cdn-images.cure.fit/www-curefit-com/image/upload/e_replace_color:black,o_60//image/cities/mumbai_selected.png"
                                alt="No image found"
                              />
                            </div>
                            <h3>Select location preference</h3>
                            <p>Membership prices vary across these areas</p>
                            <ul className="selectLocationOption">
                              <li>
                                <h4>Mumbai</h4>
                                <img
                                  src="https://static.cure.fit/assets/images/back-arrow-white.svg"
                                  alt="No image found"
                                />
                              </li>
                              <li>
                                <h4>Navi Mumbai & Thane</h4>
                                <img
                                  src="https://static.cure.fit/assets/images/back-arrow-white.svg"
                                  alt="No image found"
                                />
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div
                          className={`backdropLoaction ${
                            isLoactionActive ? "activeClass" : ""
                          }`}
                          onClick={loactionToggle}
                        ></div>
                      </li>
                      <li>
                        <span className="SvgIcons">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-search"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                          </svg>
                        </span>
                      </li>
                      <li className="myProfileItems">
                          <Dropdown>
                            <Dropdown.Toggle
                              as={CustomToggle}
                              id="dropdown-custom-components"
                            >
                              Dropdown Button
                            </Dropdown.Toggle>

                            <Dropdown.Menu align={{ lg: "end" }}>
                              {isLoggedIn && (
                                <>
                                <Dropdown.Item href={`/${city}/profile`}>
                                  My Account
                                </Dropdown.Item>
                                <Dropdown.Item href={`/${city}/orders/orderHistory`}>Order History</Dropdown.Item>
                                <Dropdown.Divider />
                                </>
                              )}
                              {!isLoggedIn && (
                                <Dropdown.Item
                                  onClick={() => setIsLoginModalOpen(true)}
                                >
                                  Sign In
                                </Dropdown.Item>
                              )}
                              {isLoggedIn && (
                                <Dropdown.Item onClick={Logout}>
                                  Sign Out
                                </Dropdown.Item>
                               )}
                              
                            </Dropdown.Menu>
                          </Dropdown>
                        </li>
                      <li>
                        <Link
                          href={`/${city}/cart`}
                          className="cartButton"
                          prefetch={true}
                        >
                          <span className="SvgIcons">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-cart"
                              viewBox="0 0 16 16"
                            >
                              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                          </span>
                          {countCart === 0 ? (
                            ""
                          ) : (
                            <span className="cartCountNotification">
                              {countCart}
                            </span>
                          )}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </Container>
        </Navbar>

        <div className="mob_backdrop">
          <div
            className={`  ${isActive ? "modal-backdrop fade show" : ""}`}
            onClick={toggleClass}
          ></div>
        </div>

        {!isLoggedIn && (
          <LoginModal
            isOpen={isLoginModalOpen}
            onRequestClose={() => setIsLoginModalOpen(false)}
            closeLoginModal={() => setIsLoginModalOpen(false)}
          />
        )}
      </div>
    </>
  );
}

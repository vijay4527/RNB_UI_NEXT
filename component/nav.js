import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import "@/styles/Home.module.css";
import Link from "next/link";
import { getCookie } from "@/cookieUtils";
import { useSession, signIn, signOut } from "next-auth/react";
import Modal from "react-modal";
import LoginModal from "@/component/loginModal";
const Header = () => {
  const { data, status } = useSession();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const router = useRouter();
  const api_url = process.env.API_URL;

  const city = getCookie("userCity");

  const closeLoginModal = () => {
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
                      .join("-");
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
            {data?.user?.name || (isLoggedIn && userInfo) ? (
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
            )}
          </ul>
        </div>
      </nav>
      {!data ? (
        <LoginModal
          isOpen={isLoginModalOpen}
          onRequestClose={closeLoginModal}
          closeLoginModal={closeLoginModal}
          contentLabel="Login"
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Header;

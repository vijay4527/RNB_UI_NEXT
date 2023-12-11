import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AppConfig from '../AppConfig';
import Link from 'next/link';

const brand = [
  {
    "cat_id": 1,
    "name": "Home",
    "url_name": "/Home",
    "sub_categories": null
  },
  {
    "cat_id": 1,
    "name": "About us",
    "url_name": "/Aboutus",
    "sub_categories": null
  },
  {
    "cat_id": 1,
    "name": "Occasional Cakes",
    "url_name": "/OccasionalCakes",
    "sub_categories": [
      {
        "sub_id": 1,
        "name": "Wedding Day",
        "url_name": "#WeddingDay"
      },
      {
        "sub_id": 2,
        "name": "Birthday Bash Cake",
        "url_name": "#BirthdayBashCake"
      },
      {
        "sub_id": 3,
        "name": "Dazzling Collection",
        "url_name": "#DazzlingCollection"
      },
      {
        "sub_id": 4,
        "name": "Customised Cakes",
        "url_name": "#CustomisedCakes"
      },
    ]
  },
  {
    "cat_id": 1,
    "name": "Our Products",
    "url_name": "/OurProducts",
    "sub_categories": [
      {
        "sub_id": 1,
        "name": "Cheese Cake",
        "url_name": "#CheeseCake"
      },
      {
        "sub_id": 2,
        "name": "Pastries",
        "url_name": "#Pastries"
      },
      {
        "sub_id": 3,
        "name": "Biscuits",
        "url_name": "#Biscuits"
      },
      {
        "sub_id": 4,
        "name": "Savoury",
        "url_name": "#Savoury"
      },
      {
        "sub_id": 5,
        "name": "Donuts",
        "url_name": "#Donuts"
      },
      {
        "sub_id": 6,
        "name": "Desserts",
        "url_name": "#Desserts"
      },
      {
        "sub_id": 7,
        "name": "Chocolates",
        "url_name": "#Chocolates"
      },
      {
        "sub_id": 8,
        "name": "Wafers",
        "url_name": "#Wafers"
      },
      {
        "sub_id": 9,
        "name": "Titbits",
        "url_name": "#Titbits"
      },
      {
        "sub_id": 10,
        "name": "Breads",
        "url_name": "#Breads"
      },
      {
        "sub_id": 11,
        "name": "Tea Time Cakes",
        "url_name": "#TeaTimeCakes"
      }
    ]
  },
  {
    "cat_id": 1,
    "name": "Cakes",
    "url_name": "/Cakes",
    "sub_categories": [
      {
        "sub_id": 1,
        "name": "Mithai Magic Collection",
        "url_name": "#MithaiMagicCollection"
      },
      {
        "sub_id": 2,
        "name": "Ready Regulars ",
        "url_name": "#ReadyRegulars "
      },
      {
        "sub_id": 3,
        "name": "Sinful Collections",
        "url_name": "#SinfulCollections"
      },
      {
        "sub_id": 4,
        "name": "Photo Cakes",
        "url_name": "#PhotoCakes"
      },
      {
        "sub_id": 5,
        "name": "Signature Cakes",
        "url_name": "#SignatureCakes"
      },
      {
        "sub_id": 6,
        "name": "Fancy Cakes ",
        "url_name": "#FancyCakes "
      },
      {
        "sub_id": 7,
        "name": "Sensational Cakes",
        "url_name": "#SensationalCakes"
      },
      {
        "sub_id": 8,
        "name": "Cake of The Month",
        "url_name": "#CakeofTheMonth"
      },
      {
        "sub_id": 9,
        "name": "Tall Wonder",
        "url_name": "#TallWonder"
      },
      {
        "sub_id": 10,
        "name": "Tintastic",
        "url_name": "#Tintastic"
      }
    ]
  },
  {
    "cat_id": 1,
    "name": "Get Franchise",
    "url_name": "/GetFranchise",
    "sub_categories": null
  },
]

export default function Header() {

  const [isActive, setIsActive] = useState(false);

  const toggleClass = () => {
    setIsActive(!isActive);
  };

  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
    // searchInputRef.current.focus();
  };
  // hover
  const [hoveredCategory, setHoveredCategory] = useState(null);

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

  const formatUrl = (url) => {
    return `/${encodeURIComponent(url).replace(/%20/g, '-')}`;
  };
  
  
  return (
    <>
      <div>
        <Navbar expand="lg" className="navbar_wrapper">
          <Container>
            <div className='navbar_body'>
              <div className='navbar_logo'>
                <Navbar.Brand href="/">
                  <img
                    src="https://fama.b-cdn.net/RnB/Logo-Golden.png"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                  />
                </Navbar.Brand>
              </div>
              <nav className="subNavbar_wrapper navbar navbar-expand-lg navbar-light">
                <div className="container">
                  <button className="navbar-toggler toggleButton" type="button" onClick={toggleClass}>
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className={`Navbar_content navbar-collapse collapse ${isActive ? 'show' : ''}`}>
                    <div className='navbar_MobileClose' onClick={toggleClass}>
                      <span>Close</span>
                      <button className="navbar-toggler toggleButton" type="button">
                        <span className="navbar-toggler-icon"></span>
                      </button>
                    </div>
                    <div className='Brands_navbody'>
                      <div className='subNavbar_body'>
                        {brand.map((category) => (
                          <div
                            className={`sub_nav ${hoveredCategory === category ? 'show' : ''}`}
                            key={category.cat_id}
                          >
                            <div
                              onMouseEnter={() => handleMouseEnter(category)}
                              onMouseLeave={handleMouseLeave}
                              className={(!category.sub_categories) ? "sub_navbtn active" : "sub_navbtn"}>
                              <Link href={`/products${formatUrl(category.url_name)}`} onClick={toggleClass}>
                                <h4 className="category-title">{category.name}</h4>
                              </Link>
                              <span className="category-dropIcon" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="7" fill="none" viewBox="0 0 9 7">
                                  <path stroke="#000" d="M8.177 1.25 4.355 5.663a.1.1 0 0 1-.15 0L.382 1.25" />
                                </svg>
                              </span>
                            </div>

                            <div
                              className={(!category.sub_categories) ? "MobileSub_navbtn active" : "MobileSub_navbtn sub_navbtn"}>
                              <Link href={`/products${formatUrl(category.url_name)}`} onClick={toggleClass}>
                                <h4 className="category-title">{category.name}</h4>
                              </Link>
                              <span
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleCategoryClick(category)}
                                className="category-dropIcon" >
                                <i className='plus_Icon'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                  </svg>
                                </i>
                                <i className='mins_Icon'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                  </svg>
                                </i>
                              </span>
                            </div>

                            {category.sub_categories && (
                              <div className={`subnav-content ${hoveredCategory === category ? 'active' : ''}`}>
                                <ul className="submenu-list">
                                  {category.sub_categories.map((subcategory) => (
                                    <li className="category-sub-title" key={subcategory.sub_id}>
                                      <Nav.Link onClick={toggleClass}
                                        href={`/products${formatUrl(category.url_name)}${formatUrl(subcategory.url_name)}`}>
                                        {subcategory.name}
                                      </Nav.Link>
                                    </li>
                                  ))}
                                </ul>
                                <div className='subnav-img'>
                                  <img src={`https://media.bakingo.com/gourmet_cake.jpg`} />
                                </div>
                              </div>

                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='navAction'>
                    <ul>
                      <li>
                        <a>
                          <span class="material-icons">
                            search
                          </span>
                        </a>
                      </li>
                      <li>
                        <a> 
                        <span class="material-icons">
shopping_bag
</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>

            </div>
          </Container>
        </Navbar>

        <div className='mob_backdrop'>
          <div className={`  ${isActive ? 'modal-backdrop fade show' : ''}`} onClick={toggleClass}></div>
        </div>

        
        
      </div >
    </>
  );
}

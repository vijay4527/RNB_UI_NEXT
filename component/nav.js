import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AppConfig from '../AppConfig';
import Link from 'next/link';

const brand = [
  {
    "cat_id": 1,
    "name": "Our Brands",
    "url_name": "/OurBrands",
    "sub_categories": [
      {
        "sub_id": 1,
        "name": "Dayuri",
        "url_name": "#Dayuri"
      },
      {
        "sub_id": 2,
        "name": "Yuri",
        "url_name": "#Yuri"
      },
      {
        "sub_id": 3,
        "name": "Gaocheng",
        "url_name": "#GAOCHENG"
      },
      {
        "sub_id": 4,
        "name": "GC Power",
        "url_name": "#GCPower"
      },
      // {
      //   "sub_id": 5,
      //   "name": "EMTEX POWER TOOLS",
      //   "url_name": "#EmtexPowerTools"
      // },
      {
        "sub_id": 6,
        "name": "Yuri Speed",
        "url_name": "#YuriSpeed"
      },
      {
        "sub_id": 7,
        "name": "Workpro",
        "url_name": "#Workpro"
      }
    ]
  },
  {
    "cat_id": 1,
    "name": "Our Brands",
    "url_name": "/OurBrands",
    "sub_categories": [
      {
        "sub_id": 1,
        "name": "Dayuri",
        "url_name": "#Dayuri"
      },
      {
        "sub_id": 2,
        "name": "Yuri",
        "url_name": "#Yuri"
      },
      {
        "sub_id": 3,
        "name": "Gaocheng",
        "url_name": "#GAOCHENG"
      },
      {
        "sub_id": 4,
        "name": "GC Power",
        "url_name": "#GCPower"
      },
      // {
      //   "sub_id": 5,
      //   "name": "EMTEX POWER TOOLS",
      //   "url_name": "#EmtexPowerTools"
      // },
      {
        "sub_id": 6,
        "name": "Yuri Speed",
        "url_name": "#YuriSpeed"
      },
      {
        "sub_id": 7,
        "name": "Workpro",
        "url_name": "#Workpro"
      }
    ]
  },
  {
    "cat_id": 1,
    "name": "Our Brands",
    "url_name": "/OurBrands",
    "sub_categories": [
      {
        "sub_id": 1,
        "name": "Dayuri",
        "url_name": "#Dayuri"
      },
      {
        "sub_id": 2,
        "name": "Yuri",
        "url_name": "#Yuri"
      },
      {
        "sub_id": 3,
        "name": "Gaocheng",
        "url_name": "#GAOCHENG"
      },
      {
        "sub_id": 4,
        "name": "GC Power",
        "url_name": "#GCPower"
      },
      // {
      //   "sub_id": 5,
      //   "name": "EMTEX POWER TOOLS",
      //   "url_name": "#EmtexPowerTools"
      // },
      {
        "sub_id": 6,
        "name": "Yuri Speed",
        "url_name": "#YuriSpeed"
      },
      {
        "sub_id": 7,
        "name": "Workpro",
        "url_name": "#Workpro"
      }
    ]
  },
  {
    "cat_id": 1,
    "name": "Our Brands",
    "url_name": "/OurBrands",
    "sub_categories": [
      {
        "sub_id": 1,
        "name": "Dayuri",
        "url_name": "#Dayuri"
      },
      {
        "sub_id": 2,
        "name": "Yuri",
        "url_name": "#Yuri"
      },
      {
        "sub_id": 3,
        "name": "Gaocheng",
        "url_name": "#GAOCHENG"
      },
      {
        "sub_id": 4,
        "name": "GC Power",
        "url_name": "#GCPower"
      },
      // {
      //   "sub_id": 5,
      //   "name": "EMTEX POWER TOOLS",
      //   "url_name": "#EmtexPowerTools"
      // },
      {
        "sub_id": 6,
        "name": "Yuri Speed",
        "url_name": "#YuriSpeed"
      },
      {
        "sub_id": 7,
        "name": "Workpro",
        "url_name": "#Workpro"
      }
    ]
  },
  {
    "cat_id": 1,
    "name": "Our Brands",
    "url_name": "/OurBrands",
    "sub_categories": [
      {
        "sub_id": 1,
        "name": "Dayuri",
        "url_name": "#Dayuri"
      },
      {
        "sub_id": 2,
        "name": "Yuri",
        "url_name": "#Yuri"
      },
      {
        "sub_id": 3,
        "name": "Gaocheng",
        "url_name": "#GAOCHENG"
      },
      {
        "sub_id": 4,
        "name": "GC Power",
        "url_name": "#GCPower"
      },
      // {
      //   "sub_id": 5,
      //   "name": "EMTEX POWER TOOLS",
      //   "url_name": "#EmtexPowerTools"
      // },
      {
        "sub_id": 6,
        "name": "Yuri Speed",
        "url_name": "#YuriSpeed"
      },
      {
        "sub_id": 7,
        "name": "Workpro",
        "url_name": "#Workpro"
      }
    ]
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
                    src="https://ribbonsandballoons.com/frontassets/images/logo2.jpg"
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
                  <div className={`navbar-collapse collapse ${isActive ? 'show' : ''}`}>
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
                                  <div className='imgdiv'>
                                  <img src={`https://media.bakingo.com/gourmet_cake.jpg`} />

                                  </div>
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
                          <img src='search.svg' />
                        </a>
                      </li>
                      <li>
                        <a> 
                          <img src='search.svg' />
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

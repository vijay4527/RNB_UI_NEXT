import React, { useEffect, useState } from 'react';
import { getCookie, setCookie, removeCookie } from "@/cookieUtils";
import Container from 'react-bootstrap/Container';
import Head from "next/head";
import dynamic from 'next/dynamic';
import initAOS from '../../component/initAOS'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// Import OwlCarousel dynamically to prevent SSR issues
const OwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false
});
// Import Owl Carousel CSS
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const options = {
  items: 1,
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  nav: true, // Enable navigation arrows
  dots: true, // Enable navigation dots
  navText: ['<span className="arrow-prev-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>', '<span className="arrow-next-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>'], // Custom text for navigation arrows
};

const optionsNewLunched = {
  items: 4,
  loop: true,
  margin: 10,
  autoplay: false,
  nav: false, // Enable navigation arrows
  dots: false, // Enable navigation dots
  navText: ['<span className="arrow-prev-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>', '<span className="arrow-next-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>'], // Custom text for navigation arrows
};

const optionsMedia = {
  items: 5,
  loop: true,
  margin: 10,
  autoplay: true,
  autoplayTimeout: 3000,
  autoplayHoverPause: true,
  nav: true, // Enable navigation arrows
  dots: false, // Enable navigation dots
  navText: ['<span className="arrow-prev-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>', '<span className="arrow-next-icon"><span className="arrow-top-part"></span><span className="arrow-bottom-part"></span></span>'], // Custom text for navigation arrows
}

const Index = ({ city }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMountedChk, setIsMountedChk] = useState(false);

  useEffect(() => {
    initAOS();
  }, []); // Run the initialization only once when the component mounts


  useEffect(() => {
    setIsMounted(true); 
  }, []);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setScrollPosition(scrollY);
    };

    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <Head>
      <meta charset="utf-8"></meta>
      <title>Online Cake Delivery in Mumbai, Pune and Mangalore</title>
      <meta name="description" content="Online Cakes Shop in Mumbai, Pune and Mangalore . Online Cakes Delivery . Buy,Order &amp; Send Birthday, Wedding Anniversary &amp; Chocolate Cakes anywhere in Mumbai from best Cake Shop Ribbons &amp; Balloons."></meta>
      <meta name="keywords" content="Ribbons and Balloons, Buy Cakes Online, Online Cake delivery, Cakes Mumbai, Cakes to Mumbai, order cakes online, cake delivery in mumbai, Send Cakes to Mumbai, Mumbai Cake Shop, Online Cakes to Mumbai, Cakes Mumbai, Cake delivery to Mumbai, Chocolate Cakes Mumbai, Heart Shape Cakes, Eggless Cakes, Occasion Cakes, birthday cakes online delivery, Send Birthday Cakes, Congratulations Cakes, Missing You Cakes, Baby and Kids Cakes, Anniversary Cakes Online, Thank You Cakes, House Warming Cakes, Wedding Cakes Mumbai, customised cakes in mumbai, cup cakes mumbai, Online Cakes Shop Mumbai, valentine special cakes mumbai, plum cakes mumbai, fresh fruit cakes online"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"></meta>
      <link rel="icon" href="https://ribbonsandballoons.com/frontassets/images/fav.png" type="image/x-icon" />
      <meta name="google-site-verification" content="hj44_Ud2995b4jkL3My7hTX96_sALd3yQ7tlf0El0IE"></meta>
      <meta name="p:domain_verify" content="e35c0804c87b42f9187c00fa30ff64f9"></meta>
      <meta name="facebook-domain-verification" content="1cpqqtudq8imtqkiwxpq0vd20x3b69"></meta>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js"></script>

        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
      </Head>


      <div className="banner-wrap">
        <Container fluid>
          <div className="banner-body">
            <div className="banner-sec1">
              <div className="banner-img banner-img1" 
              id="animatedImage" style={{ transform: `translateY(-${scrollPosition * 1}px)` }}>
                <img src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-7.jpg" 
                                alt="No image found"/>
              </div>
              <div className="banner-img banner-img2"
              id="animatedImage" style={{ transform: `translateY(-${scrollPosition * 1}px)` }}>
                <img src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-1-729x1024.png" 
                                alt="No image found"/>
              </div>
            </div>
            <div className="banner-sec1 banner-sec-center">
              <div className="banner-img banner-img-center"
              id="animatedImage" style={{ transform: `translateY(-${scrollPosition * 0.5}px)` }}>
                <img src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-8.jpg" 
                                alt="No image found"/>
              </div>
            </div>
            <div className="banner-sec1">
              <div className="banner-img banner-img3" 
              id="animatedImage" style={{ transform: `translateY(-${scrollPosition * 1}px)` }}>
                <img src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-10.jpg" 
                                alt="No image found"/>
              </div>
              <div className="banner-img banner-img4"
              id="animatedImage" style={{ transform: `translateY(-${scrollPosition * 1}px)` }}>
                <img src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-9.jpg" 
                                alt="No image found"/>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="testimonialsWrap">
        <Container fluid>
          <div className="testimonialsBody">
            <div className='headerTitle'>
              <p className=''> you said about us </p>
              <h2>Testimonials</h2>
              <div className="testimonialUnderLine">
                <div className='testimonialUnder'>
                  <div className="underLine"></div>
                  <div className="shapLine"></div>
                </div>
              </div>
            </div>
            {isMounted && (
              <OwlCarousel className="owl-theme" {...options}>
                <div className="item">
                  <div className="headerTitle">
                    <h6>An vis civibus albucius. Eu mea augue menandri consequat, his graeco discere consequat ei. An autem nostrum signiferumque mea, id ullum antiopam qui. Has eu timeam utroque dissentiunt, eos te iriure verterem suis san.</h6>
                    <h5>Roland Brown</h5>
                    <div>Chef</div>
                  </div>
                </div>
                <div className="item">
                  <div className="headerTitle">
                    <h6>An vis civibus albucius. Eu mea augue menandri consequat, his graeco discere consequat ei. An autem nostrum signiferumque mea, id ullum antiopam qui. Has eu timeam utroque dissentiunt, eos te iriure verterem suis san.</h6>
                    <h5>Roland Brown</h5>
                    <div>Chef</div>
                  </div>
                </div>
                <div className="item">
                  <div className="headerTitle">
                    <h6>An vis civibus albucius. Eu mea augue menandri consequat, his graeco discere consequat ei. An autem nostrum signiferumque mea, id ullum antiopam qui. Has eu timeam utroque dissentiunt, eos te iriure verterem suis san.</h6>
                    <h5>Roland Brown</h5>
                    <div>Chef</div>
                  </div>
                </div>
              </OwlCarousel>
            )}

          </div>
        </Container>
      </div>

      <div className='advInstaWrap'>
        <Container fluid>
          <div className='headerTitle'>
            <h2>INSTAGRAM</h2>
            <div className="testimonialUnderLine">
              <div className='testimonialUnder'>
                <div className="underLine"></div>
                <div className="shapLine"></div>
              </div>
            </div>
          </div>
          <div className='advInstaBody'>
            <div className='advInstaContent'>
              <div className='advInstaContentBox'>
                <div className='advInstaContentBoxImg'>
                  <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/port-1-img-6-650x650.jpg" 
                                alt="No image found"/>
                </div>
                <div className='advInstaContentBoxHover'>
                  <div className='advInstaContentBoxTrap'>
                    <div className='advInstaContentBoxborder'>
                      <div className="advInstaContentInfo">
                        <img src='' 
                                alt="No image found"/>
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='advInstaContent2'>
              <div className='advInstaContentBox'>
                <div className='advInstaContentBoxImg'>
                  <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/port-1-img-2-650x650.jpg" 
                                alt="No image found"/>
                </div>
                <div className='advInstaContentBoxHover'>
                  <div className='advInstaContentBoxTrap'>
                    <div className='advInstaContentBoxborder'>
                      <div className="advInstaContentInfo">
                        <img src='' 
                                alt="No image found"/>
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='advInstaContentBox'>
                <div className='advInstaContentBoxImg'>
                  <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/port-1-img-5-650x650.jpg" 
                                alt="No image found"/>
                </div>
                <div className='advInstaContentBoxHover'>
                  <div className='advInstaContentBoxTrap'>
                    <div className='advInstaContentBoxborder'>
                      <div className="advInstaContentInfo">
                        <img src='' 
                                alt="No image found"/>
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='advInstaContentBox'>
                <div className='advInstaContentBoxImg'>
                  <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/port-1-img-7-650x650.jpg" 
                                alt="No image found"/>
                </div>
                <div className='advInstaContentBoxHover'>
                  <div className='advInstaContentBoxTrap'>
                    <div className='advInstaContentBoxborder'>
                      <div className="advInstaContentInfo">
                        <img src='' 
                                alt="No image found"/>
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='advInstaContentBox'>
                <div className='advInstaContentBoxImg'>
                  <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/port-1-img-4-650x650.jpg" 
                                alt="No image found"/>
                </div>
                <div className='advInstaContentBoxHover'>
                  <div className='advInstaContentBoxTrap'>
                    <div className='advInstaContentBoxborder'>
                      <div className="advInstaContentInfo">
                        <img src='' 
                                alt="No image found"/>
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className='advInstaContent2'>
              <div className='advInstaContentBox'>
                <div className='advInstaContentBoxImg'>
                  <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/port-1-img-2-650x650.jpg" 
                                alt="No image found"/>
                </div>
                <div className='advInstaContentBoxHover'>
                  <div className='advInstaContentBoxTrap'>
                    <div className='advInstaContentBoxborder'>
                      <div className="advInstaContentInfo">
                        <img src='' 
                                alt="No image found"/>
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='advInstaContentBox'>
                <div className='advInstaContentBoxImg'>
                  <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/port-1-img-5-650x650.jpg" 
                                alt="No image found"/>
                </div>
                <div className='advInstaContentBoxHover'>
                  <div className='advInstaContentBoxTrap'>
                    <div className='advInstaContentBoxborder'>
                      <div className="advInstaContentInfo">
                        <img src='' 
                                alt="No image found"/>
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='advInstaContentBox'>
                <div className='advInstaContentBoxImg'>
                  <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/port-1-img-7-650x650.jpg" 
                                alt="No image found"/>
                </div>
                <div className='advInstaContentBoxHover'>
                  <div className='advInstaContentBoxTrap'>
                    <div className='advInstaContentBoxborder'>
                      <div className="advInstaContentInfo">
                        <img src='' 
                                alt="No image found"/>
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='advInstaContentBox'>
                <div className='advInstaContentBoxImg'>
                  <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/port-1-img-4-650x650.jpg" 
                                alt="No image found"/>
                </div>
                <div className='advInstaContentBoxHover'>
                  <div className='advInstaContentBoxTrap'>
                    <div className='advInstaContentBoxborder'>
                      <div className="advInstaContentInfo">
                        <img src='' 
                                alt="No image found"/>
                        <h3>Calisson</h3>
                        <p>$15</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='advInstaContent3'>
              <div className=''><h3>Where there is cake, there is hope. And there is always cake.</h3></div>
            </div> */}
          </div>
        </Container>
      </div>

      <div className="newLaunchWrap">
        <div className='lte-background-overlay'></div>
        <Container fluid>
          <div className='headerTitle'>
            <h2>New Launches</h2>
            <div className="testimonialUnderLine">
              <div className='testimonialUnder'>
                <div className="underLine"></div>
                <div className="shapLine"></div>
              </div>
            </div>
            {isMounted && (
              <OwlCarousel className="owl-theme" {...optionsNewLunched}>
                <div className="item">
                  <div className='itemNewLunch'>
                    <div className='itemNewLunchImg'>
                      <img src="https://fama.b-cdn.net/RnB/Ln1.jpg" 
                                alt="No image found"/>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className='itemNewLunch'>
                    <div className='itemNewLunchImg'>
                      <img src="https://fama.b-cdn.net/RnB/Ln2.jpg" 
                                alt="No image found"/>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className='itemNewLunch'>
                    <div className='itemNewLunchImg'>
                      <img src="https://fama.b-cdn.net/RnB/Ln3.jpg" 
                                alt="No image found"/>
                    </div>
                  </div>
                </div>
                <div className="item">
                  <div className='itemNewLunch'>
                    <div className='itemNewLunchImg'>
                      <img src="https://fama.b-cdn.net/RnB/Ln4.jpg" 
                                alt="No image found"/>
                    </div>
                  </div>
                </div>
              </OwlCarousel>
            )}

          </div>
        </Container>
      </div>

      <div className='cakeOfMonthWrap'>
        <div className='headerTitle'>
          <h2>Cake of the month</h2>
          <div className="testimonialUnderLine">
            <div className='testimonialUnder'>
              <div className="underLine"></div>
              <div className="shapLine"></div>
            </div>
          </div>
        </div>
        <div className='cakeOfMonthBody'>
          <div className="wrapper">
            <div className="backdrop"></div>
            <div className="stage_floor"></div>
            <div className="stage_highlight"></div>
            <div className="spotlight_swivel">
              <div className="lamp"></div>
              <div className="spotlight"></div>
            </div>
            {/* <div className='cakeOfMonthConent'>
            <img src='https://fama.b-cdn.net/RnB/combg.png' />
          </div> */}
          </div>
        </div>
      </div>

      <div className="enquiryWrap">
          <Container fluid>
            <div className="enquiryBody">
              <div className='headerTitle'>
                <h2>Enquiry Now</h2>
                <div className="testimonialUnderLine">
                  <div className='testimonialUnder'>
                    <div className="underLine"></div>
                    <div className="shapLine"></div>
                  </div>
                </div>
              </div>
              <div className='enquiryContent'>
                <div className='enquiryContact'>
                  <ul>
                    <li>
                      <a href="/">
                        <span className="">
                        <img src="icons-01.png" alt="" className='icon-image'/>
                        </span>
                        <h4>1234567890</h4>
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <span className="">
                        <img src="icons-02.png" alt="" className='icon-image'/>
                        </span>

                        <h4>abc@gmail.com</h4>
                      </a>
                    </li>
                    <li>
                      <a href="/">
                        <span className="">
                        <img src="icons-03.png" alt="" className='icon-image'/>
                        </span>
                        <h4>60+ Stores Pan India</h4>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className='enquiryForm'>
                  <div className='enquiryFormData'>
                    <Form>
                      <Form.Group controlId="formfirstname">
                        <Form.Control type="text" placeholder="Enter firstname"/>
                      </Form.Group>
                      <Form.Group controlId="formlastname">
                        <Form.Control type="text" placeholder="Enter lastname"/>
                      </Form.Group>
                      <Form.Group controlId="formemail">
                        <Form.Control type="email" placeholder="Enter email"/>
                      </Form.Group>
                      <Form.Group controlId="formmessage" >
                      <Form.Control
                            as="textarea"
                            placeholder="Enter message"
                            style={{ height: '100px' }}
                            htmlFor="message on"
                          />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </Container>
      </div>

      <div className="mediaCollabWrap">
        <Container fluid>
          <div className="testimonialsBody">
            <div className='headerTitle'>
              <h2>MEDIA COLLABORATIONS</h2>
              <div className="testimonialUnderLine">
                <div className='testimonialUnder'>
                  <div className="underLine"></div>
                  <div className="shapLine"></div>
                </div>
              </div>
            </div>
            {isMounted && (
              <OwlCarousel className="owl-theme" {...optionsMedia}>
                <div className="item">
                  <div className='MediaContentImg'>
                    <img src='https://fama.b-cdn.net/RnB/media2.png' 
                                alt="No image found"/>
                  </div>
                </div>
                <div className="item">
                  <div className='MediaContentImg'>
                    <img src='https://fama.b-cdn.net/RnB/media1.png' 
                                alt="No image found"/>
                  </div>
                </div>
                <div className="item">
                  <div className='MediaContentImg'>
                    <img src='https://fama.b-cdn.net/RnB/media3.png' 
                                alt="No image found"/>
                  </div>
                </div>
                <div className="item">
                  <div className='MediaContentImg'>
                    <img src='https://fama.b-cdn.net/RnB/media4.png' alt="mediaImage" />
                  </div>
                </div>
              </OwlCarousel>
            )}

          </div>
        </Container>
      </div>

    </>
  );
};

export async function getServerSideProps(context) {
  const city = context.query.city;
  removeCookie("userCity");
  if (city) {
    setCookie("userCity", city);
    console.log("Cookie set with value: " + getCookie("userCity"));
  }

  return {
    props: {
      city,
    },
  };
}

export default Index;

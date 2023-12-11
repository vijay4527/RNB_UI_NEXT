import React, { useEffect, useState } from 'react';
import { getCookie, setCookie, removeCookie } from "@/cookieUtils";
import Container from 'react-bootstrap/Container';
import Head from "next/head";
import dynamic from 'next/dynamic';
// 
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
  navText: ['<span class="arrow-prev-icon"><span class="arrow-top-part"></span><span class="arrow-bottom-part"></span></span>', '<span class="arrow-next-icon"><span class="arrow-top-part"></span><span class="arrow-bottom-part"></span></span>'], // Custom text for navigation arrows
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

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true when component is mounted on the client-side
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
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js"></script>
        
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
      </Head>
      
      <div className="banner-wrap">
        <Container>
          <div className="banner-body">
            <div className="banner-sec1">
                <div className="banner-img" id="animatedImage" style={{ transform: `translateY(-${scrollPosition * 1}px)` }}>
                  <img src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-7.jpg" />
                </div>
                <div className="banner-img" id="animatedImage" style={{ transform: `translateY(-${scrollPosition * 1}px)` }}>
                  <img src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-8.jpg" />
                </div>
            </div>
            <div className="banner-sec1">
                <div className="banner-img banner-img-center" id="animatedImage" style={{ transform: `translateY(-${scrollPosition * -2}px)` }}>
                  <img src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-1-729x1024.png" />
                </div>
            </div>
            <div className="banner-sec1">
                <div className="banner-img" id="animatedImage" style={{ transform: `translateY(-${scrollPosition * 1}px)` }}>
                  <img src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-10.jpg" />
                </div>
                <div className="banner-img" id="animatedImage" style={{ transform: `translateY(-${scrollPosition * 1}px)` }}>
                  <img src="https://swissdelight.qodeinteractive.com/wp-content/uploads/2021/02/h2-img-9.jpg" />
                </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="testimonialsWrap">
        <Container fluid>
          <div className="testimonialsBody">
            <div className='testimonialsContent'>
              <p className='pb-4'> you said about us </p>
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
                <div className="testimonialsContent">
                  <h6>An vis civibus albucius. Eu mea augue menandri consequat, his graeco discere consequat ei. An autem nostrum signiferumque mea, id ullum antiopam qui. Has eu timeam utroque dissentiunt, eos te iriure verterem suis san.</h6>
                  <h5>Roland Brown</h5>
                  <div>Chef</div>
                </div>
              </div>
              <div className="item">
                <div className="testimonialsContent">
                  <h6>An vis civibus albucius. Eu mea augue menandri consequat, his graeco discere consequat ei. An autem nostrum signiferumque mea, id ullum antiopam qui. Has eu timeam utroque dissentiunt, eos te iriure verterem suis san.</h6>
                  <h5>Roland Brown</h5>
                  <div>Chef</div>
                </div>
              </div>
              <div className="item">
                <div className="testimonialsContent">
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
          <div className='testimonialsContent'>
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
                    <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/port-1-img-6-650x650.jpg" />
                  </div>
                  <div className='advInstaContentBoxHover'>
                      <div className='advInstaContentBoxTrap'>
                        <div className='advInstaContentBoxborder'>
                          <div className="advInstaContentInfo">
                            <img src='' />
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
                    <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/port-1-img-2-650x650.jpg" />
                  </div>
                  <div className='advInstaContentBoxHover'>
                      <div className='advInstaContentBoxTrap'>
                        <div className='advInstaContentBoxborder'>
                          <div className="advInstaContentInfo">
                            <img src='' />
                            <h3>Calisson</h3>
                            <p>$15</p>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div className='advInstaContentBox'>
                  <div className='advInstaContentBoxImg'>
                    <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/port-1-img-5-650x650.jpg" />
                  </div>
                  <div className='advInstaContentBoxHover'>
                      <div className='advInstaContentBoxTrap'>
                        <div className='advInstaContentBoxborder'>
                          <div className="advInstaContentInfo">
                            <img src='' />
                            <h3>Calisson</h3>
                            <p>$15</p>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div className='advInstaContentBox'>
                  <div className='advInstaContentBoxImg'>
                    <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/port-1-img-7-650x650.jpg" />
                  </div>
                  <div className='advInstaContentBoxHover'>
                      <div className='advInstaContentBoxTrap'>
                        <div className='advInstaContentBoxborder'>
                          <div className="advInstaContentInfo">
                            <img src='' />
                            <h3>Calisson</h3>
                            <p>$15</p>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
                <div className='advInstaContentBox'>
                  <div className='advInstaContentBoxImg'>
                    <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/port-1-img-4-650x650.jpg" />
                  </div>
                  <div className='advInstaContentBoxHover'>
                      <div className='advInstaContentBoxTrap'>
                        <div className='advInstaContentBoxborder'>
                          <div className="advInstaContentInfo">
                            <img src='' />
                            <h3>Calisson</h3>
                            <p>$15</p>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
               </div>
               <div className='advInstaContent3'>
                <div className=''><h3>Where there is cake, there is hope. And there is always cake.</h3></div>
               </div>
            </div>
          </Container>
      </div>

      <div className="testimonialsWrap">
        <Container fluid>
          <div className="testimonialsBody">
            <div className='testimonialsContent'>
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
                  <img src='https://eatnoto.com/cdn/shop/files/6_200x.png?v=1644062617' />
                </div>
              </div>
              <div className="item">
                <div className='MediaContentImg'>
                  <img src='https://eatnoto.com/cdn/shop/files/7_200x.png?v=1644062616' />
                </div>
              </div>
              <div className="item">
                <div className='MediaContentImg'>
                  <img src='https://eatnoto.com/cdn/shop/files/5_200x.png?v=1644062616' />
                </div>
              </div>
              <div className="item">
                <div className='MediaContentImg'>
                  <img src='https://eatnoto.com/cdn/shop/files/4_09344e61-a756-4134-8cc9-012052aa7e03_200x.png?v=1644062616' />
                </div>
              </div>
            </OwlCarousel>
          )}
            
          </div>
        </Container>
      </div>

      <div>

      </div>

      <div className='cakeOfMonthWrap'>
        <div className="wrapper">
          <div className="backdrop"></div>
          <div className="stage_floor"></div>
          <div className="stage_highlight"></div>
          <div className="spotlight_swivel">
            <div className="lamp"></div>
            <div className="spotlight"></div>
          </div>
          <div className='cakeOfMonthConent'>
            <img src='https://fama.b-cdn.net/RnB/cakeMonth.png' />
          </div>
        </div>
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

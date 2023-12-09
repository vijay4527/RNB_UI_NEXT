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
  dots: false, // Enable navigation dots
  navText: ['<span class="mkdf-prev-icon"><span class="mkdf-top-part"></span><span class="mkdf-bottom-part"></span></span>', '<span class="mkdf-next-icon"><span class="mkdf-top-part"></span><span class="mkdf-bottom-part"></span></span>'], // Custom text for navigation arrows
};

const Index = ({ city }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set isMounted to true when component is mounted on the client-side
  }, []);
  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha2/dist/js/bootstrap.bundle.min.js"></script>
      </Head>
      
      <div className="banner-wrap">
        <Container>
          <div className="banner-body">
            <div className="banner-sec1">
                <div className="banner-img">
                  <img src="http://127.0.0.1:5501/Albama/cake-img2.jpg" />
                </div>
                <div className="banner-img">
                  <img src="http://127.0.0.1:5501/Albama/cake-img2.jpg" />
                </div>
            </div>
            <div className="banner-sec1">
                <div className="banner-img">
                  <img src="http://127.0.0.1:5501/Albama/cake-img2.jpg" />
                </div>
            </div>
            <div className="banner-sec1">
                <div className="banner-img">
                  <img src="http://127.0.0.1:5501/Albama/cake-img2.jpg" />
                </div>
                <div className="banner-img">
                  <img src="http://127.0.0.1:5501/Albama/cake-img2.jpg" />
                </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="testimonialsWrap">
        <Container fluid>
          <div className="testimonialsBody">
            <div className='testimonialsContent'>
              <p> you said about us </p>
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
            <div className='advInstaBody'>
              <div className='advInstaContent'>
                <div className='advInstaContentBox'>
                  <div className='advInstaContentBoxImg'>
                    <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/shop-img-26.jpg" />
                  </div>
                  <div className='advInstaContentBoxHover'>
                      <div className='advInstaContentBoxTrap'>
                        <div className='advInstaContentBoxborder'>
                          <div lang='advInstaContentInfo'>
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
                    <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/shop-img-26.jpg" />
                  </div>
                  <div className='advInstaContentBoxHover'>
                      <div className='advInstaContentBoxTrap'>
                        <div className='advInstaContentBoxborder'>
                          <div lang='advInstaContentInfo'>
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
                    <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/shop-img-26.jpg" />
                  </div>
                  <div className='advInstaContentBoxHover'>
                      <div className='advInstaContentBoxTrap'>
                        <div className='advInstaContentBoxborder'>
                          <div lang='advInstaContentInfo'>
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
                    <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/shop-img-26.jpg" />
                  </div>
                  <div className='advInstaContentBoxHover'>
                      <div className='advInstaContentBoxTrap'>
                        <div className='advInstaContentBoxborder'>
                          <div lang='advInstaContentInfo'>
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
                    <img src="https://dolcino.qodeinteractive.com/wp-content/uploads/2018/10/shop-img-26.jpg" />
                  </div>
                  <div className='advInstaContentBoxHover'>
                      <div className='advInstaContentBoxTrap'>
                        <div className='advInstaContentBoxborder'>
                          <div lang='advInstaContentInfo'>
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
                <h3>Where there is cake, there is hope. And there is always cake.</h3>
               </div>
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

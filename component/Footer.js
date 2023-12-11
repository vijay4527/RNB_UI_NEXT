import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AppConfig from '../AppConfig';
import Link from 'next/link';


export default function Footer() {
  return (
    <>
      <div className='footerWap'>
        <Container>
            <div className='footerBody'>
                <Row>
                    <Col md={3}>
                        <div className='footerLogos'>
                            <img src="https://fama.b-cdn.net/RnB/Logo-Golden.png" />
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className='footerLinks'>
                            <h2>Useful Links</h2>
                            <ul>
                                <li><a>Signature Cakes</a></li>
                                <li><a>Ready Regulars</a></li>
                                <li><a>Fancy Cakes</a></li>
                                <li><a>Sinful Collections</a></li>
                                <li><a>Photo Cakes</a></li>
                                <li><a>Sensational Cakes</a></li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className='footerLinks'>
                            <h2>Favourite</h2>
                            <ul>
                                <li><a>Get Franchise</a></li>
                                <li><a>Store Location</a></li>
                                <li><a>Privacy policy</a></li>
                                <li><a>Disclaimer</a></li>
                                <li><a>Delivery Policy</a></li> 
                                <li><a>Terms & Conditions </a></li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className='footerLinks'>
                            <h2>Newsletter</h2>
                            <p>Subscribe to get special offers, free gifts and once-in-a-lifetime deals.</p>
                            <div className='NewsletterInput'>
                                <input placeholder='Enter your email' />
                            </div>
                            <ul className='footerSocial'>
                                <li><a></a></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
        <Container>
            <div className='footerCopyRight'>
                © 2023 <a href="#">ABC</a>, All Rights Reserved 
            </div>
        </Container>
      </div>
    </>
  );
}

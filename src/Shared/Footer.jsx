import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin,  FaWhatsappSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const Footer = () => {
    return (
      <div className="justify-content-between align-items-center py-4">
        <Row>
          <Col xs={12} md={6} className="text-center text-md-start">
            <Image src={logo} width="200px" height="30px" />
            <h4 className="p-0 m-0 mt-2">A User Base Company. </h4>
            <p className="p-0 m-0">
              You can add or get fake user data from here.
            </p>
          </Col>
          <Col xs={12} md={6} className="text-center text-md-end py-2 py-md-0">
            <h5 className="mb-0">Also Follow Us</h5>
            <Link className="text-primary fs-2">
              <FaLinkedin className="me-2" />
              <FaWhatsappSquare className="me-2" />
              <FaFacebookSquare className="me-2" />
              <FaInstagramSquare />
            </Link>
          </Col>
        </Row>
      </div>
    );
};

export default Footer;
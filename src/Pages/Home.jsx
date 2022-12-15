import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import LeftSide from './Left/LeftSide';


const Home = () => {
    return (
      <>
        <Helmet>
          <title>Home | Random</title>
        </Helmet>
        <Row>
          <Col xs={12} md={5} lg={4}>
            <LeftSide></LeftSide>
          </Col>
          <Col xs={12} md={7} lg={8}>
            <Outlet></Outlet>
          </Col>
        </Row>
      </>
    );
};

export default Home;
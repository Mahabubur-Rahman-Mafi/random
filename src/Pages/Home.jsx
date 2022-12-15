import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { Outlet } from 'react-router-dom';
import LeftSide from './Left/LeftSide';


const Home = () => {


 const { isLoading, error, data:users=[] } = useQuery({
   queryKey: ["users"],
   queryFn: () =>
     fetch("http://localhost:5000/users")
       .then((res) => res.json()),
 });
  if (isLoading) {
    return <Spinner className="text-center" animation="grow"></Spinner>;
  }

    return (
      <>
        <Helmet>
          <title>Home | Random</title>
        </Helmet>

        <Row>
          <Col xs={12} md={5} lg={3}>
            {users.map((u) => (
              <LeftSide u={u} key={u._id}></LeftSide>
            ))}
          </Col>
          <Col xs={12} md={7} lg={9} className='d-none d-md-block'>
            <Outlet></Outlet>
          </Col>
        </Row>
      </>
    );
};

export default Home;
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import useAdmin from "../Hook/useAdmin";
import LeftSide from "./Left/LeftSide";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);

  const {
    isLoading,
    error,
    data: users = [],
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://random-server-one.vercel.app/users").then((res) =>
        res.json()
      ),
  });
  if (isLoading) {
    return (
      <div className="text-center py-3">
        <Spinner className="text-center" animation="grow"></Spinner>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Home | Random</title>
      </Helmet>

      <Row>
        <Col xs={12} md={5} lg={3}>
          <h1 className="text-center text-success mb-3"> Users List</h1>
          {users?.map((u) => (
            <LeftSide u={u} key={u._id}></LeftSide>
          ))}
        </Col>
        <Col xs={12} md={7} lg={9} className="d-none d-md-block">
          <Outlet></Outlet>
        </Col>
      </Row>
      {user?.uid && isAdmin && (
        <>
          <Button className=" w-50 my-3 " variant="outline-primary">
            {" "}
            Add A New User
          </Button>
          <Link to="/users">
            <Button className=" w-50 my-3 " variant="outline-primary">
              {" "}
              See All user
            </Button>
          </Link>
        </>
      )}
      {user?.uid && !isAdmin && (
        <>
          <Button className=" w-100 my-3 " variant="outline-primary">
            {" "}
            Add A New User
          </Button>
        </>
      )}
    </>
  );
};

export default Home;

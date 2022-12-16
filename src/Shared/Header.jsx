import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import {
  Alert,
  Button,
  Container,
  Form,
  Image,
  Modal,
  Nav,
  Navbar,
  NavLink,
  Toast,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../Auth/AuthProvider";
import useAdmin from "../Hook/useAdmin";
import { FaUserCircle, IconName } from "react-icons/fa";
import userPhoto from "../assets/user.png";

const Header = () => {
  const { user, googleAuthProvider, logOutUser, userLogIn, createUser } =
    useContext(AuthContext);
  const [Logshow, setLogShow] = useState(false);
  const [e, setE] = useState("");
  const [signInShow, setSignInShow] = useState(false);
  const handleLogClose = () => setLogShow(false);
  const handleLogShow = () => setLogShow(true);
  const handleSingInClose = () => setSignInShow(false);
  const handleSingInShow = () => setSignInShow(true);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [isAdmin] = useAdmin(user?.email);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  // log in submit
  const onLogSubmit = (d) => {
     setE("");
    userLogIn(d.email, d.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Sign In Successfully");
        handleLogClose();
        reset();
         setE("");
      })
      .catch((e) => setE(e.message));
  };

  // sign up here
  const onSignUpSubmit = (d) => {
     setE("");
    createUser(d.email, d.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Sign Up Successfully");
        handleSingInClose();
        reset();
         setE("");
      })
      .catch((e) => setE(e.message));
  };

  // switch log in
  const switchLog = () => {
    handleLogClose();
    handleSingInShow();
  };
  // swith Sign In
  const switchSigIn = () => {
    handleSingInClose();
    handleLogShow();
  };

  // log out
  const handleSignOut = () => {
    logOutUser();
    navigate("/")
      .then()
      .catch((e) => setE(e.message));
  };

  // log in google
  const handleGoogle = () => {
    setE("");
    googleAuthProvider(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log("user", user);
        toast.success("Log In success");
        handleSingInClose();
        handleLogClose();
      })
      .catch((e) => setE(e.message));
  };
  return (
    <>
      <Navbar expand="lg" className="my-2">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              {" "}
              <img
                src={logo}
                width="220"
                height="40"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto"></Nav>
            <Nav>
              {user?.uid ? (
                <>
                  {user?.photoURL ? (
                    <Image
                      src={user?.photoURL}
                      width="40px"
                      height="40px"
                      className="me-2"
                      roundedCircle
                      alt=""
                    />
                  ) : (
                    <Image
                      src={userPhoto}
                      width="40px"
                      height="40px"
                      className="me-2"
                      roundedCircle
                      alt=""
                    />
                  )}
                  <Button
                    variant="outline-dark"
                    className="fw-semibold fs-5 px-3"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline-success"
                    className="fw-semibold fs-5 px-3"
                    onClick={handleLogShow}
                  >
                    Sign In
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* signup here */}
      <Modal
        show={signInShow}
        onHide={handleSingInClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={handleSubmit(onSignUpSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Please Sing Up Here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter You Name"
                {...register("name")}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password")}
                autoFocus
              />
            </Form.Group>
            <p className="text-danger">{e}</p>

            <p>
              Already Have an account?{" "}
              <Button
                variant="transparent p-0 m-0 text-primary fw-semibold"
                onClick={switchSigIn}
              >
                {" "}
                Sign In
              </Button>
            </p>
            <Button
              variant="success"
              type="submit"
              className="w-100 fs-5  my-3"
            >
              Sing up
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-info w-100 fs-5" onClick={handleGoogle}>
              Go with Google
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* login modal start */}
      <Modal
        show={Logshow}
        onHide={handleLogClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Form onSubmit={handleSubmit(onLogSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Please Sing In Here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password")}
                autoFocus
              />
            </Form.Group>
            <p className="text-danger">{e}</p>
            <p>
              Don't Have an account?{" "}
              <Button
                variant="transparent p-0 m-0 text-primary fw-semibold"
                onClick={switchLog}
              >
                {" "}
                Sing Up
              </Button>
            </p>
            <Button
              variant="success"
              type="submit"
              className="w-100 fs-5  my-3"
            >
              Sing In
            </Button>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-info w-100 fs-5" onClick={handleGoogle}>
              Go with Google
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Header;

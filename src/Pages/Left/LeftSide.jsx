import React, { useEffect, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import img from "../../assets/user.png";

const LeftSide = ({ u }) => {
  const { _id, avatar, Bio, jobTitle, username, firstName, lastName, email, verify } =
    u;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [modal, SetModal] = useState(null);
  const showModal = (id) => {
    handleShow();
    if (u._id === id) {
      SetModal(u);
    }
  };

  return (
      <>
      <Link to={`/users/${u._id}`}>
        <Button
          className="w-100"
          variant="outline-success my-1"
          onClick={() => showModal(_id)}
        >
          <div className="d-flex align-items-center">
            {avatar ? (
              <Image
                src={avatar}
                alt=""
                width="40px"
                height="40px"
                roundedCircle
                className="me-2"
              />
            ) : (
              <Image
                src={img}
                width="40px"
                height="40px"
                roundedCircle
                className="me-2"
              />
            )}
            <h6 className="fw-semibold p-0 m-0 me-3">{`${firstName} ${lastName}`}</h6>
            {verify && (
              <FaCheck className="fw-bold fs-5"/>
            )}
          </div>
        </Button>
      </Link>

      {/* modal start */}
      {window.innerWidth <= 768 && (
        <Modal
          show={show}
          onHide={handleClose}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          className="d-block d-md-none"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <Image
              src={avatar}
              alt=""
              width="120px"
              height="120px"
              roundedCircle
              className="me-2"
            />
            <h3> {username}</h3>
            <p>Bio: {Bio}</p>
            <h2>Name: {`${firstName} ${lastName}`}</h2>
            <h5>Email: {email}</h5>
            <h6>Job Title: {jobTitle}</h6>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default LeftSide;

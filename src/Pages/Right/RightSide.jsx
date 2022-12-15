import React from 'react';
import { Image } from 'react-bootstrap';
import { FaClipboardCheck, FaQuoteLeft } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import img from "../../assets/user.png";

const RightSide = () => {
  const user = useLoaderData();
const { _id, avatar, Bio, jobTitle, username, firstName, lastName, email, verify } = user
  return (
    <div className="text-center shadow p-3 py-5 mb-5 bg-white rounded">
      <h1 className="py-3 text-success">User Details</h1>
      {avatar ? (
        <Image
          src={avatar}
          alt=""
          width="240px"
          height="240px"
          roundedCircle
          className="me-2"
        />
      ) : (
        <Image
          src={img}
          width="240px"
          height="240px"
          roundedCircle
          className="me-2"
        />
      )}
      <h2 className="my-3 text-dark"> {username}</h2>
      <h5>
        <span className="fw-bold text-dark mb-3">Bio:</span> {Bio}
      </h5>
      <h2 className="mb-2">
        <span className="fw-bold text-dark">Name:</span>{" "}
        {`${firstName} ${lastName}`}
      </h2>
      <h4>
        <span className="fw-bold text-dark">Email:</span> {email}
      </h4>
      <h5>
        <span className="fw-bold text-dark">Job Title:</span> {jobTitle}
      </h5>
      {verify && (
        <h2>
          <span className="fw-bold text-dark">Verify:</span> {jobTitle}{" "}
        </h2>
      )}
    </div>
  );
};

export default RightSide;
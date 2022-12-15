import React from 'react';
import { Button, Image, Placeholder } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import img from '../../assets/user.png'

const LeftSide = ({ u }) => {
    console.log(u);
    return (
      <>
        <Link to={`/users/${u._id}`}>
          <Button className="w-100" variant="outline-success my-1">
            <div className="d-flex align-items-center">
              {u?.avater ? (
                <Image
                  src={u.avatar}
                  alt="userImage"
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
              <h6 className="fw-semibold p-0 m-0">{`${u?.firstName} ${u?.lastName}`}</h6>
            </div>
          </Button>
        </Link>
      </>
    );
};

export default LeftSide;
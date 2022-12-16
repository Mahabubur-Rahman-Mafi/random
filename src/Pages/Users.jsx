import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";

const Users = () => {
  const { data: users = [], refetch ,isLoading} = useQuery({
    querykey: ["users"],
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
  // handleVerify
  const handleVerify = (id) => {
    const verify = {
      text: "yes",
    };
    fetch(`https://random-server-one.vercel.app/users/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(verify),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("User Verified");
        refetch();
      });
  };

  // remove user
  const handleDelete = (id) => {
    fetch(`https://random-server-one.vercel.app/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("User Removed");
        refetch();
      })
      .catch((e) => {
        toast.error("Failed");
      });
  };

  return (
    <>
      <Helmet>
        <title>Admin | Random</title>
      </Helmet>
      <div className="text-success py-3 text-center">
        <p>
          {users.length} {users.length <= 1 ? "person" : "people"} are using
          this site
        </p>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Name</th>
              <th>Verify Data</th>
              <th>Remove Data</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr>
                <td>{idx + 1}</td>
                <td>{`${u.firstName} ${u.lastName}`}</td>
                <td>
                  {!u.verify && (
                    <Button
                      className="w-100"
                      onClick={() => handleVerify(u._id)}
                      variant="success"
                    >
                      Verify
                    </Button>
                  )}
                </td>
                <td>
                  <Button
                    className=" w-100"
                    variant="outline-danger"
                    onClick={() => handleDelete(u._id)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Users;

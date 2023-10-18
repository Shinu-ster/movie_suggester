import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../components/NavBar";
import { Button, Container, Modal, Stack } from "react-bootstrap";

function Profile() {
  const [userData, setuserData] = useState({});
  const [modelShow, setModelShow] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    const getAccessToken = localStorage.getItem("AccessToken");

    try {
      const response = await axios.get(
        "https://api.dynoacademy.com/test-api/v1/me",

        {
          timeout: 10000,
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      );
      setuserData(response.data.data);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors[0].message);
      } else {
        alert("Unknow error occured");
      }
    }
  };
  const history = useHistory();
  const onLogout = () => {
    setModelShow(true);
  };
  return (
    <>
      <NavBar />
      <Container className=" mt-5">
        <h3> Profile</h3>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <h5> Name: </h5>{" "}
          </div>
          <div className="p-2"> {userData.name}</div>
        </Stack>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            <h5>Email:</h5>{" "}
          </div>
          <div className="p-2">{userData.email}</div>
        </Stack>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2">
            {" "}
            <h5>Country:</h5>
          </div>
          <div className="p-2">{userData.country}</div>
        </Stack>
        <br />
        <Button variant="danger" onClick={onLogout}>
          Logout
        </Button>
      </Container>
      <Modal show={modelShow} onHide={() => {setModelShow(false)}}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModelShow(false);
            }}
          >
            Close
          </Button>

          <Button
            variant="danger"
            onClick={() => {
              localStorage.removeItem("AccessToken");
              history.push("/");
            }}
          >
           Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Profile;

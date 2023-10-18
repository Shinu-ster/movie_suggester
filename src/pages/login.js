import axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../components/NavBar";
import { Button, Container, Form, Modal } from "react-bootstrap";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const [modelShow, setModelShow] = useState(false);
  const [modelText, setModelText] = useState("");
  const loginHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/login",
        loginData,
        {
          timeout: 10000,
        }
      );

      if (response.data.status === "success") {
        setModelText("Logged in Successfull");
        setModelShow(true);
      }
      const getAccessToken = response.data.accessToken;
      localStorage.setItem("AccessToken", getAccessToken);
      setTimeout(()=>{
      history.replace("/");

      },2000)
    } catch (error) {
      if (error.response) {
        setModelShow(true);
        setModelText(error.response.data.errors[0].message)
        // alert();
      } else {
        setModelShow(true);
        setModelText("Unknow error occured")
        // alert("Unknow error occured");
      }
    }
  };
  return (
    <>
      <NavBar />
      <Container>
        <h3 className="mt-3">Login</h3>
        <form onSubmit={loginHandler}>
          {/* Email: <br />
        <input type="text" ref={emailRef}/>
        <br />
        <br /> */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              ref={emailRef}
              autoComplete={false}
            />
          </Form.Group>
          {/* Password: <br />
          <input type="password" ref={passwordRef} />
          <br /> */}
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Login
          </Button>
        </form>
      </Container>

      <Modal show={modelShow} onHide={() => {modelShow(false)}}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{modelText}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModelShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

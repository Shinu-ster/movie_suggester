import axios from "axios";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

import NavBar from "../components/NavBar";
import { Button, Container, Form, Modal } from "react-bootstrap";

export default function AddMovie() {
  const history = useHistory();
  const [modelShow, setModelShow] = useState(false);
  const [modelText, setModelText] = useState("");
  const movie_name_ref = useRef();
  const rating_ref = useRef();
  const des_ref = useRef();
  const addMovieHandler = async (e) => {
    e.preventDefault();

    const movieData = {
      movie_name: movie_name_ref.current.value,
      rating: rating_ref.current.value,
      description: des_ref.current.value,
    };

    try {
      const response = await axios.post(
        "https://api.dynoacademy.com/test-api/v1/movies",
        movieData,
        {
          timeout: 10000,
        }
      );
      setModelShow(true);
      setModelText(response.data.message)
      // alert();
      setTimeout(()=>{
        history.replace("/");
  
        },2000)
    } catch (error) {
      if (error.response) {
        setModelShow(true);
        setModelText(error.response.data.errors[0].message);
        // alert();
      } else {
        setModelShow(true);
        setModelText("Unknow error occured")
        
      }
    }
  };

  return (
    <>
      <NavBar/>
      <br />
      <br />
      <Container>
      <form onSubmit={addMovieHandler}>
        {/* Movie Name:{" "}
        <input type="text" placeholder="Movie Name" ref={movie_name_ref} />
        <br />
        <br /> */}
         <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Movie Name</Form.Label>
        <Form.Control type="text" placeholder="Movie Name" ref={movie_name_ref}/>
      </Form.Group>
        {/* Movie Rating:{" "}
        <input type="text" placeholder="Rate from 1-10" ref={rating_ref} />
        <br />
        <br /> */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Movie Rating</Form.Label>
        <Form.Control type="number" placeholder="Rate from 1-10" ref={rating_ref}/>
      </Form.Group>
        {/* Movie Description:
        <br />
        <br /> <textarea placeholder="Description" ref={des_ref}></textarea>
        <br /> */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Movie Description</Form.Label>
        <Form.Control as="textarea" rows={3} ref={des_ref} />
      </Form.Group>
      <Button variant="dark" type="submit">Add a Movie</Button>
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

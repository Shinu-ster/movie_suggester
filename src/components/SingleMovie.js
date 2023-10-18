import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SingleMovie(props) {
  return (
    <>
      <Col key={props.data.id}>
        
          <Card style={{ width: "18rem" , minHeight: "570px"}}>
            <Card.Img variant="top"  src={props.data.image}
            alt="Movie Image" style={{ height: "270px"} }/>
            <Card.Body>
              <Card.Title>
                <Link to={`/view_movies/${props.data.id}`} className="text-decoration-none">
                  <span style={{ fontWeight: "bold" }}>{props.data.name}</span>
                </Link>
              </Card.Title>
              <Card.Text>
              Info: {props.data.info}
              </Card.Text>
              <Card.Text>
              Rating: {props.data.rating}
              </Card.Text>
              
            </Card.Body>
          </Card>
          {/* <br />
          <img
            src={props.data.image}
            alt="Movie Image"
            style={{ height: "100px" }}
          />
          <br />
          Info: {props.data.info} <br />
          Rating: {props.data.rating} */}
        
      </Col>
    </>
  );
}

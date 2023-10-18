import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function NavBar() {
  return (
    <Navbar className="bg-dark">
      <Container>
        <Navbar.Brand href="#home" className=" text-white">
        <Link to="/" className="text-decoration-none text-white">
          Movie Suggestor
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end gap-3">
          <Navbar.Text>
            <Link to="/add" className="text-decoration-none text-white">
              Add a Movie
            </Link>
          </Navbar.Text>

          <Navbar.Text className="text-decoration-none ">
            {localStorage.getItem("AccessToken") ? (
              <>
                <Link to="/profile" className="text-decoration-none text-white">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="text-decoration-none text-white">
                  Login
                </Link>
              </>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

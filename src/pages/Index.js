import React from "react";
import axios from "axios";
import { useState } from "react";

import reactRouterDom from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import SingleMovie from "../components/SingleMovie";
import { Container, Row, Spinner } from "react-bootstrap";
export default function Index() {
  const [movies, setMovies] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [searchErrorText, setSearchErrorText] = useState(false);
  const [searchmovieText, setSearchMovieText] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstrun, setFirstRun] = useState(true);
  useEffect(() => {
    fetchMovies();
  }, []);
  useEffect(() => {
    if (!firstrun) {
      const fetchTimer = setTimeout(() => {
        if (searchmovieText && searchmovieText.length > 2) {
          fetchMovies();
        } else if (searchmovieText.length < 1) {
          fetchMovies();
        } else {
          setSearchErrorText("Please enter characher more than 2");
        }
      }, 800);

      //cleanup function..
      return () => {
        clearTimeout(fetchTimer);
      };
    }
  }, [searchmovieText]);

  const fetchMovies = async () => {
    setLoading(true);
    //fetch resource
    setSearchErrorText("");
    //error handling
    try {
      //using await async
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movies?search=${searchmovieText}`
      );
      setMovies(response.data.moviesData);
      setIsError(false);
      setLoading(false);
      setFirstRun(false);
    } catch (error) {
      // alert("Error!");
      setIsError(true);
      setLoading(false);
      setFirstRun(false);
      setErrorText("Cannot get movie data!");
    }
  };
  return (
    <>
    <NavBar/>
     
      <div>
        <Container className="mt-3">
        <input
          className="form-control"
          type="text"
          name=""
          value={searchmovieText}
          placeholder="Search Movies"
          onChange={(e) => setSearchMovieText(e.target.value)}
        />
        </Container>

        <span style={{ color: "red" }}>{searchErrorText}</span>
      </div>
      {/* <button onClick={fetchMovies}>Get All Movies</button> */}
      <br />
      {isError ? (
        <>
          <div
            style={{
              background: "red",
              color: "#fff",
              padding: "10px",
              margin: "10px",
            }}
          >
            {errorText}
          </div>
        </>
      ) : (
        <>
          <div
            style={{ background: "#e7e7e7", padding: "10px", margin: "5px" }}
          >
            <div>{loading ? <>
            <Container className="text-center">
              <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </Container>
            </> : <></>}</div>
            {!loading && movies.length < 1 ? (
              <>No such movies found</>
            ) : (
              <>
                {/*Movies are dynamically rendered */}
                <Row>
                {movies.map((el) => (
                  //maping array of movies
                  //using id to represent it with distinct key
                 
                <SingleMovie data={el}/>
                
                ))}
                </Row>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

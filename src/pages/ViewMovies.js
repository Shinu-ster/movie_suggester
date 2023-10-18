import axios from "axios";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "../components/NavBar";
import { Button, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function ViewMovies() {
  const getParams = useParams();
  const [movieData, setMovieData] = useState({});
  useEffect(() => {
    getSingleMovieInfo();
  }, []);

  console.log(getParams);
  const getID = getParams.id;
  const getSingleMovieInfo = async () => {
    try {
      const response = await axios.get(
        `https://api.dynoacademy.com/test-api/v1/movie/${getID}`
      );
      setMovieData(response.data.singleMovieData);
    } catch (error) {
      alert("Error Occured!");
    }
  };
  return (
    <>
      <NavBar />
      {/* <button onClick={getSingleMovieInfo}>View This MOvie Details</button><br/> */}
      <Container>
        <h3> Movie Detail </h3>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2 ">
            <Container className="text-center">
            <img
              src={movieData.image}
              alt="Movie Image"
             
              style={{ height: "100px" }}
            /></Container>
          </div>
        </Stack>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2"><h6>Movie Name:</h6></div>
          <div className="p-2">{movieData.name} </div>
        </Stack>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2"><h6>Info:</h6></div>
          <div className="p-2"> {movieData.info} </div>
        </Stack>
        <Stack direction="horizontal" gap={3}>
          <div className="p-2"> <h6>Desc:</h6></div>
          <div className="p-2">  {movieData.desc} </div>
        </Stack>
           <Stack direction="horizontal" gap={3}>
          <div className="p-2"> <h6>Rating:</h6></div>
          <div className="p-2"> {movieData.rating} </div>
        </Stack>
       <Link to="/"><Button variant="dark">Go Back</Button></Link>
         
      </Container>
    </>
  );
}

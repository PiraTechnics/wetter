import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Dashboard from "./Dashboard";
import CurrentDateTime from "./CurrentDateTime,";
import iconUrl from "./assets/wetter-icon.png";

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  const apiData = {
    apiKey: import.meta.env.VITE_WETTER_API_KEY,
    apiUrl: import.meta.env.VITE_WETTER_API_URL,
  };

  useEffect(() => {
    //Fetch Weather Data from API
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      const response = await fetch(
        `${apiData.apiUrl}/forecast.json?key=${apiData.apiKey}&q=${lat},${long}`
      );
      const weatherData = await response.json();
      console.log(weatherData);
      setData(weatherData);
    };
    fetchData();
  }, [apiData.apiKey, apiData.apiUrl, lat, long]);

  return (
    <>
      <div className="App">
        <Navbar className="bg-info-subtle border rounded mb-2" sticky="top">
          <Container>
            <Row>
              <Col
                sm={6}
                className="bg-info border rounded-5 border-dark-subtle border-2 p-1"
                style={{ maxWidth: "200px" }}
              >
                <Image src={iconUrl} alt="cloud with"></Image>
                {"  "}
                <span className="fw-semibold fs-3 align-middle">Wetter</span>
              </Col>
              <Col className="align-self-center">
                <CurrentDateTime />
              </Col>
            </Row>
          </Container>
        </Navbar>
        <Container fluid id="dashboard" style={{ padding: "0px" }}>
          <Dashboard data={data} />
        </Container>
      </div>
    </>
  );
}

export default App;

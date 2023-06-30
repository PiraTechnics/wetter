import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Dashboard from "./Dashboard";
import CurrentDateTime from "./CurrentDateTime,";
import iconUrl from "./assets/wetter-icon.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  const apiData = {
    apiKey: import.meta.env.VITE_WETTER_API_KEY,
    apiUrl: import.meta.env.VITE_WETTER_API_URL,
  };

  useEffect(() => {
    //Fetch Weather Data from API for browser location
    //Note: how would we override this/change the default for a user entering a location?
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      const response = await fetch(
        `${apiData.apiUrl}/forecast.json?key=${apiData.apiKey}&q=${lat},${long}&days=10`
      );
      const weatherData = await response.json();
      console.log(weatherData);
      setData(weatherData);
    };
    fetchData();
  }, [apiData.apiKey, apiData.apiUrl, lat, long]);

  return (
    <>
      <div className="App" style={{ minWidth: "350px" }}>
        <Navbar className="bg-info-subtle border rounded mb-2" sticky="top">
          <Container fluid>
            <Row className="header-row" style={{ width: "100vw" }}>
              <Col
                xs={12}
                className="header-col bg-info border rounded-5 border-dark-subtle border-2 p-1 mx-2"
              >
                <Image src={iconUrl} alt="wetter cloud icon"></Image>
                {"  "}
                <span className="fw-semibold fs-3 align-middle">Wetter</span>
              </Col>
              <Col className="header-col align-self-center">
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

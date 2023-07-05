import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { FaSearchLocation } from "react-icons/fa";
import Dashboard from "./Dashboard";
import CurrentDateTime from "./CurrentDateTime,";
import iconUrl from "./assets/wetter-icon.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [location, setLocation] = useState([]);
  const [data, setData] = useState([]);
  const [tempUnits, setTempUnits] = useState("f");

  const apiData = {
    apiKey: import.meta.env.VITE_WETTER_API_KEY,
    apiUrl: import.meta.env.VITE_WETTER_API_URL,
  };

  const handleTempToggle = (val) => setTempUnits(val);
  const handleLocationChange = (e) => setLocation(e.target.value);
  function handleLocationSubmit(e) {
    e.preventDefault();

    const fetchData = async () => {
      const response = await fetch(
        `${apiData.apiUrl}/forecast.json?key=${apiData.apiKey}&q=${location}&days=10`
      );
      const weatherData = await response.json();
      setData(weatherData);
    };
    fetchData();
  }

  useEffect(() => {
    //Default Behavior: Fetch Weather Data from API from browser location
    //NOTE: will this override our manual if updated? How to ensure this only happens on load?
    // I BELIEVE it only happens when lat and long changes (which is fine for now as the search doesnt touch it)
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      const response = await fetch(
        `${apiData.apiUrl}/forecast.json?key=${apiData.apiKey}&q=${lat},${long}&days=10`
      );
      const weatherData = await response.json();
      //console.log(weatherData);
      setData(weatherData);
    };
    fetchData();
    //console.log(location);
  }, [apiData.apiKey, apiData.apiUrl, lat, long]);

  return (
    <>
      <div className="App" style={{ minWidth: "250px" }}>
        <Navbar className="bg-info-subtle border rounded mb-2">
          <Container fluid>
            <Row className="header-row" style={{ width: "100vw", gap: "10px" }}>
              <Col
                lg={3}
                md={6}
                className="header-col bg-info border rounded-5 border-dark-subtle border-2 p-1 mx-2"
              >
                <Image src={iconUrl} alt="wetter cloud icon"></Image>
                {"  "}
                <span className="fw-semibold fs-3 align-middle">Wetter</span>
              </Col>
              <Col lg={3} md={5} className="align-self-center d-flex justify-content-center">
                <Form onSubmit={handleLocationSubmit}>
                  <InputGroup size="lg">
                    <Form.Control type="text" placeholder="Location" className="bg-info border border-info bg-opacity-10" style={{ maxWidth: "350px" }} onChange={handleLocationChange} />
                    <Button variant="info" type="submit"><FaSearchLocation /></Button>
                  </InputGroup>
                </Form>
              </Col>
              <Col lg={2} md={6} sm={6} className="align-self-center">
                <ToggleButtonGroup
                  type="radio"
                  name="tempTypes"
                  value={tempUnits}
                  onChange={handleTempToggle}
                >
                  <ToggleButton
                    size="lg"
                    variant="outline-info"
                    id="tempType1"
                    value={"f"}
                  >
                    °F
                  </ToggleButton>
                  <ToggleButton
                    size="lg"
                    variant="outline-info"
                    id="tempType2"
                    value={"c"}
                  >
                    °C
                  </ToggleButton>
                </ToggleButtonGroup>
              </Col>
              <Col lg={2} md={5} sm={3} className="align-self-center">
                <CurrentDateTime />
              </Col>
            </Row>
          </Container>
        </Navbar>
        <Container fluid id="dashboard" style={{ padding: "0px" }}>
          <Dashboard data={data} units={tempUnits} />
        </Container>
      </div>
    </>
  );
}

export default App;

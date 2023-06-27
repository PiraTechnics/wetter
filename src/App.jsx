import { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import Container from "react-bootstrap/Container";
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
        <Container fluid id="dashboard" style={{ padding: "0px" }}>
          <Dashboard data={data} />
        </Container>
      </div>
    </>
  );
}

export default App;

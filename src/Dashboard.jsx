import { Container, Row, Col } from "react-bootstrap";
import CurrentWeather from "./CurrentWeather";
import DayWeather from "./DayWeather";
import HourWeather from "./HourWeather";

/* eslint-disable react/prop-types */
function Dashboard({ data }) {
  return (
    <Container fluid className="px-0">
      {data.location ? (
        <>
          <Row className="g-2 mb-2" style={{ minWidth: "250px" }}>
            <Col xs={12} sm={6}>
              <CurrentWeather data={data} />
            </Col>
            <Col xs={12} sm={6}>
              <DayWeather data={data} />
            </Col>
          </Row>
          <Row className="mb-2">
            <Col>
              <HourWeather data={data} />
            </Col>
          </Row>
        </>
      ) : (
        <Row></Row>
      )}
    </Container>
  );
}

export default Dashboard;

import { Container, Row, Col } from "react-bootstrap";
import CurrentWeather from "./CurrentWeather";
import DayWeather from "./DayWeather";

/* eslint-disable react/prop-types */
function Dashboard({ data }) {
  if (typeof data.location != "undefined") {
    return (
      <>
        <Container fluid style={{ padding: "0px" }}>
          <Row className="g-2" style={{ minWidth: "250px" }}>
            <Col xs={12} sm={6}>
              <CurrentWeather data={data} />
            </Col>
            <Col xs={12} sm={6}>
              <DayWeather data={data} />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
  return (
    <>
      <Container fluid style={{ padding: "0px" }}>
        <Row>
          <Col xs={6}></Col>
          <Col xs={6}></Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;

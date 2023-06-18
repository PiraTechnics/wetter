/* eslint-disable react/prop-types */

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Weather({ data }) {
  return (
    <>
      <Container>
        <Row>
          <Col xs={3}>
            <img
              src={data.current.condition.icon}
              alt={data.current.condition.text}
            />
          </Col>
          <Col xs={9}>
            {data.current.temp_f} °F
          </Col>
        </Row>
        <Row>
            <p>{data.location.name}</p>
            <p>{data.location.region}</p>
            <p>{data.location.country}</p>
        </Row>
      </Container>
    </>
  );
}

export default Weather;

/* eslint-disable react/prop-types */
import { Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";

function CurrentWeather({ data, units }) {
  return (
    <>
      <Container className="bg-info-subtle border rounded py-2">
        <Row className="">
          <Col xs={12}>
            <div className="d-flex justify-content-center align-items-center fs-3 fw-semibold">
              <Image
                fluid
                src={data.current.condition.icon}
                alt={data.current.condition.text}
                style={{ minWidth: "64px" }}
              />
              {data.current["temp_" + units]}°
            </div>
          </Col>
        </Row>
        <hr className="mt-0 mb-2" />
        <Row>
          <Col>
            <span className="fs-5">
              {data.location.name}, {data.location.region}
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="fs-6">{data.location.country}</span>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CurrentWeather;

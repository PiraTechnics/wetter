/* eslint-disable react/prop-types */
import { useState } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import './weather.css';

function Weather({ data }) {
  const [tempType, setTempType] = useState(data.current.temp_f);
  const handleChange = (val) => setTempType(val);

  return (
    <>
      <Container style={{ width: '35vw' }} className="position-absolute top-50 start-50 justify-content-center translate-middle bg-info-subtle border border-light border-3 rounded py-2">
        <Row className="align-items-center justify-items-center">
          <Col xs={3}>
            <Image
              src={data.current.condition.icon}
              alt={data.current.condition.text}
            />
          </Col>
          <Col xs={4}><span className="fs-3 fw-medium">{tempType}</span></Col>
          <Col>
            <ToggleButtonGroup type="radio" name="tempTypes" defaultValue={data.current.temp_f} onChange={handleChange}>
              <ToggleButton size="sm" variant="outline-info" id="tempType1" value={data.current.temp_f}>°F</ToggleButton>
              <ToggleButton size="sm" variant="outline-info" id="tempType2" value={data.current.temp_c}>°C</ToggleButton>
            </ToggleButtonGroup>
          </Col>
        </Row>
        <hr className="mt-0 mb-2" />
        <Row>
          <Col><span className="fs-5">{data.location.name}, {data.location.region}</span></Col>
        </Row>
        <Row>
          <Col><span className="fs-6">{data.location.country}</span></Col>
        </Row>
      </Container>
    </>
  );
}

export default Weather;

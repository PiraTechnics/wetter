import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const CurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update the currentDateTime every second (1000ms)

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>{currentDateTime.toDateString()}</Col>
        <Col xs={12}>{currentDateTime.toLocaleTimeString()}</Col>
      </Row>
    </Container>
  );
};

export default CurrentDateTime;

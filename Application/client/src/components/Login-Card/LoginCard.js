import React, { useState, useContext } from "react";
import { Button, Card, Form, Row, Col, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SessionContext } from "../../services/sessionContext";
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import MemberFrontEndService from "../../services/account/memberFrontEndService";
import EmployeeFrontEndService from "../../services/account/employeeFrontEndService";

function LoginCard({ onLoginSuccess }) {
  const memberFrontEndService = new MemberFrontEndService();
  const employeeFrontEndService = new EmployeeFrontEndService();
  const [inputEmail, setEmail] = useState("");
  const [inputPassword, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user, setUser, employee, setEmployee } = useContext(SessionContext);
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!inputEmail || !inputPassword) {
        setErrorMessage("Please enter both email and password");
        return;
      }

      let response;

      const location = useLocation();
      console.log("Current location:", location.pathname);

      if (location.pathname === "/employee") {
        response = await employeeFrontEndService.get("/readRecords", {
          Email: inputEmail,
          Password: inputPassword,
        });
      } else {
        response = await memberFrontEndService.get("/readRecords", {
          Email: inputEmail,
          Password: inputPassword,
        });
      }

      if (response === null) {
        setErrorMessage("Invalid email or password. Please try again.");
        if (onLoginSuccess) onLoginSuccess(false);
      } else {
        setErrorMessage("");
        if (location.pathname === "/employee") {
          setEmployee(response.data[0]);
        } else {
          setUser(response.data[0]);
        }
        if (onLoginSuccess) onLoginSuccess(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(
        "An error occurred during login. Please try again later."
      );
      if (onLoginSuccess) onLoginSuccess(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEmployee(null);
  };

  return (
    (!user || !employee) && (
      <Card className="content-panel-no-padding" style={{ width: "600px" }}>
        <Card.Body>
          <Row>
            {/* Logo */}
            <Col
              xs={4}
              className="d-flex flex-column justify-content-center align-items-center text-center"
            >
              <CardImg
                src="/AML-logo.png"
                alt="Advanced Media Library Logo"
                style={{ height: "8rem", width: "auto" }}
              />
              <h2 style={{ color: "var(--primary)", fontWeight: "600" }}>
                AML
              </h2>
            </Col>

            {/* Input Form */}
            <Col className="left-border-primary justify-content-center align-items-center text-center">
              <h4 className="py-4">Login to your account</h4>
              <div
                className="d-flex justify-content-center"
                style={{ width: "100%" }}
              >
                <Form onSubmit={handleLogin} style={{ width: "80%" }}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      className="form-primary"
                      type="email"
                      placeholder="Email"
                      value={inputEmail}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                      className="form-primary"
                      type="password"
                      placeholder="Password"
                      value={inputPassword}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  {errorMessage && (
                    <p style={{ color: "red" }}>{errorMessage}</p>
                  )}
                  <Button className="button-primary" type="submit">
                    Login
                  </Button>
                </Form>
              </div>
              <p className="py-4">
                New here? <Link to="/account#register">Sign up</Link>
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    )
  );
}

export default LoginCard;

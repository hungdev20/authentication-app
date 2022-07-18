import * as React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { login } from "../../state/actions";
import { useNavigate } from "react-router-dom";
import secure_login from "../../images/secure_login.svg";
export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [usernameError, setusernameError] = useState("");
  const handleValidation = () => {
    let formIsValid = true;
    if (!username.match(/^[A-Za-z][A-Za-z0-9_]{7,29}$/)) {
      formIsValid = false;
      setusernameError(
        "Username must be from 8 to 30 characters, and starts with an anphalbet"
      );
      return false;
    } else {
      setusernameError("");
      formIsValid = true;
    }

    if (!password.match(/^[A-Za-z0-9_]{8,22}$/)) {
      formIsValid = false;
      setpasswordError(
        "Only Letters and length must best min 8 Chracters and Max 22 Chracters"
      );
      return false;
    } else {
      setpasswordError("");
      formIsValid = true;
    }
    return formIsValid;
  };

  const handleLogin = () => {
    const validate = handleValidation();
    if (validate) {
      const userInfo = {
        username,
        password,
      };
      dispatch(login(userInfo, navigate));
    }
  };

  return (
    <div className="login">
      <Container className="mt-5">
        <Row>
          <Col lg={4} md={6} sm={12}>
            <Form className="form_login">
              <h1>Sign In</h1>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={(event) => setUsername(event.target.value)}
                />
                <small id="usernameerror" className="text-danger form-text">
                  {usernameError}
                </small>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </Form.Group>
              <Button
                className="btn_login"
                variant="primary"
                size="lg"
                type="button"
                onClick={handleLogin}
              >
                Login
              </Button>
            </Form>
          </Col>
          <Col lg={8} md={6} sm={12}>
            <img className="w-100" src={secure_login} alt="" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

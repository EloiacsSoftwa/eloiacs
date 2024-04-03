import React, { useState, useEffect } from "react";
import { Alert, Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Logo from "../../Assets/images/H&T.png";
import { Link } from "react-router-dom";
import "../../index.css";
import axios from "axios";
import { AxiosConfig } from "../../Networking/AxiosConfig";
import { connect, useDispatch, useSelector } from "react-redux";
import { REGISTER_API_CALL, CLEAR_ERROR_MESSAGE } from "../../utils/Constant";
import { useNavigate } from "react-router-dom";

function Signup(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [error, seterror] = useState("");
  const [err, seterr] = useState("");
  const [passwordMatch, setPasswordMatch] = useState("");
  const [emailError, setEmailError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(props);

  /**
   *
   * show an error message while registering
   * @param {
   *
   * } e
   */

  const isEmailValid = (email1) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email1);
  };

  const handleChanges = (e) => {
    dispatch({ type: CLEAR_ERROR_MESSAGE });
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "email") {
      setEmail(e.target.value);
      setEmailError(
        isEmailValid(e.target.value) ? "" : "Invalid email format."
      );
      
    
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "cpassword") {
      setcPassword(value);
      if (password === value) {
        setPasswordMatch(true);
      } else {
        setPasswordMatch(false);
      }
    }
  };

  function handlesubmit(e) {
    e.preventDefault();
    const nameerror = "Invalid username";
    // const emailerror = "Invalid email";
    const passworderror = "Invalid password";
    const cpassworderror = "Invalid confirm";
    seterror("");
    if (username.length === 0) {
      seterror(nameerror);
      return;
    }
    if (email.length === 0) {
      seterror('Invalid email');
      return;
    }
    if (password.length === 0) {
      seterror(passworderror);
      return;
    }
    if (cpassword.length === 0 || !passwordMatch) {
      seterror(cpassworderror);
      return;
    }
    // api data's sending
    const args = {
      name: username,
      email: email,
      password: password,
    };

    dispatch({ type: REGISTER_API_CALL, data: args });
    console.log("the props error", props.users.status);
    console.log("payload message", props.users.status);
  }
  useEffect(() => {
    if (err) {
      const timeoutId = setTimeout(() => {
        seterr(null);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [err]);

  // useEffect(() => {
  //     if (props.users.status === 200) {

  //     }
  // }, [props.users.status])

  return (
    <div className="full-background">
      <Container fluid className="f-14 d-flex pt-5 justify-content-center">
        <div className="f-14 border w-40 p-5 pt-0 shadow rounded h-max bg-white">
          <div className="f-14 text-center">
            <img
              src={Logo}
              alt=" HandT holidays company Logo"
              className="f-14 w-30 h-40"
            />
          </div>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              className="f-14 border inputfocus border-secondary border-1"
              type="email"
              name="email"
              placeholder="name@example.com"
              onChange={(e) => handleChanges(e)}
            />
            {error && !email && (
              <p className="error f-16 " style={{ color: "red" }}>
                Please enter your email
              </p>
            )}
             {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput2">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="f-14 border inputfocus border-secondary border-1"
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => handleChanges(e)}
            />
            {error && !username && (
              <p className="error f-14" style={{ color: "red" }}>
                Please enter a username
              </p>
            )}
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="f-14 border inputfocus border-secondary border-1"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => handleChanges(e)}
            />
            {error && !password && (
              <p className="error f-14 " style={{ color: "red" }}>
                Please enter a password
              </p>
            )}
          </Form.Group>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className="f-14 border inputfocus border-secondary border-1"
              type="password"
              name="cpassword"
              placeholder="Confirm Password"
              onChange={(e) => handleChanges(e)}
            />
            {error && !cpassword ? (
              <p className="error f-14" style={{ color: "red" }}>
                Enter the confirm password
              </p>
            ) : error && !passwordMatch ? (
              <p className="error f-14" style={{ color: "red" }}>
                Passwords do not match
              </p>
            ) : null}

        
          </Form.Group>
          {/* <Form.Check type="checkbox" className="rounded d-flex mt-2">
            <Form.Check.Input className="border border-secondary border-1" />
            <Form.Check className="f-14 ms-2 mb-2">
              I agreed to the terms and conditions
            </Form.Check>
          </Form.Check> */}
          <div id="error" className="">
            {err && (
              <div className="error f-14 w-100 text-center">
                {err === "Success" ? (
                  <Alert variant="success">{err}</Alert>
                ) : (
                  <Alert variant="danger">{err}</Alert>
                )}
              </div>
            )}
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              variant=""
              className="f-16 m-2 p-2 btn-blue"
              type="submit"
              style={{
                backgroundColor: "#25316f",
                color: "white",
                textTransform: "uppercase",
              }}
              onClick={handlesubmit}
            >
              Signup
            </Button>
          </div>

          {props.users.error && (
            <Alert variant="danger">{props.users.error}</Alert>
          )}

          <p className="f-14 text-center mt-3 mb-1 f-14">
            Don't Have an account?{" "}
            <span className="txt-trans_up">
              <Link to="/">Login Here</Link>
            </span>
          </p>
        </div>
      </Container>
    </div>
  );
}
const mapsToProps = (state) => {
  return {
    users: state.users,
  };
};
export default connect(mapsToProps)(Signup);

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import axios from "axios";

export const Register = () => {
  let [error, setError] = useState();
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const registerUser = async () => {
    try {
      await axios.post("https://challenge.broobe.net/api/v1/users", user);
      window.location.replace("/");
    } catch (error) {
      setError(
        `Api error. Please check that all fields are properly filled and try again.`
      );
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          flexDirection: "column",
          marginBottom: "5px",
          width: "25rem",
        }}
      >
        {error ? (
          <Alert className="text-wrap" transition variant="danger">
            {error}
          </Alert>
        ) : null}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name..."
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email..."
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password..."
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Form.Group>
        </Form>
        <Button onClick={registerUser} type="button" variant="primary">
          Register
        </Button>
      </div>
    </div>
  );
};

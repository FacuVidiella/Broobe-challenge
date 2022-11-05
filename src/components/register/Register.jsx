import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import axios from "axios";

export const Register = () => {
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
      console.log(error);
      throw new Error(error);
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginBottom: "5px",
        }}
      >
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
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Button onClick={registerUser} type="button" variant="primary">
          Register
        </Button>
      </div>
    </div>
  );
};

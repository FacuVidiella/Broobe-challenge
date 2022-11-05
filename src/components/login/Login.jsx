import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { setLocalStorage } from "../utility-funcs";
export const Login = ({ isLoggedIn }) => {
  let history = useHistory();
  let [token, setToken] = useState();
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  let [error, setError] = useState();

  if (isLoggedIn) return history.replace("/issues");
  const handleUser = async () => {
    try {
      if (!user.email || !user.password) throw new Error("fill all inputs");
      let token = await axios
        .post("https://challenge.broobe.net/api/v1/login", user)
        .then((res) => res.data);
      setToken(token);
      setLocalStorage("token", token);
      return history.go("/issues");
    } catch (err) {
      setError(
        `Api response: '${err.response.data.message}'. Please check your email and password and try again`
      );
      throw new Error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {error ? (
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Alert className="w-25" transition variant="danger">
            {error}
          </Alert>
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginBottom: "5px",
        }}
      >
        <h3>Login First!</h3>
      </div>
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
        <Button variant="primary" type="button" onClick={handleUser}>
          Log in
        </Button>
        <Button href="/register" variant="primary">
          Register
        </Button>
      </div>
    </div>
  );
};

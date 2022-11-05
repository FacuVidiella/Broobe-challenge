import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

export const Navigation = ({ createIssue }) => {
  return (
    <Navbar bg="dark" style={{ marginBottom: "15px" }}>
      <Container>
        <Navbar.Brand href="/" style={{ color: "white" }}>
          Broobe
        </Navbar.Brand>
      </Container>
      {createIssue ? (
        <div className="p-3">
          <Navbar.Brand href="/create-issue" style={{ color: "white" }}>
            Create Issue
          </Navbar.Brand>
          <Navbar.Brand
            href="/"
            onClick={() => localStorage.removeItem("token")}
            style={{ color: "white" }}
          >
            Log out
          </Navbar.Brand>
        </div>
      ) : null}
    </Navbar>
  );
};

import Navbar from "react-bootstrap/Navbar";

export const Footer = () => {
  return (
    <Navbar
      fixed="bottom"
      bg="dark"
      className="d-flex justify-content-center align-self-center"
    >
      <Navbar.Text style={{ color: "white" }}>Broobe challenge</Navbar.Text>
    </Navbar>
  );
};

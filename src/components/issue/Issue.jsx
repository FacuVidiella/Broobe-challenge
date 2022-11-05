import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteIssue } from "../utility-funcs";
import axios from "axios";
export const Issue = ({ issue, token, priorities }) => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const resolveIssue = async () => {
    try {
      await deleteIssue(token, issue.id);
      window.location.reload();
      setShow(false);
    } catch (error) {
      throw new Error(error);
    }
  };
  const redirect = () => {
    history.replace(`/issue-edit/${issue.id}`);
    history.go(`/issue-edit/${issue.id}`);
  };
  return (
    <div>
      <Card style={{ width: "18rem" }} border="danger" bg="dark" text="light">
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            onClick={() => setShow(true)}
            className=" m-1 "
            variant="danger"
            size="sm"
            style={{ width: "15%", borderRadius: "5px" }}
          >
            X
          </Button>
        </div>
        <Card.Body>
          <Card.Title>{issue.name}</Card.Title>
          <Card.Text>{issue.description}</Card.Text>

          <Card.Text>
            {priorities?.forEach((priority) => {
              if (priority.id === issue.priority_id) {
                return priority.type;
              }
            })}
          </Card.Text>
          <Card.Text>
            {priorities?.map((priority, key) => {
              if (priority.id === issue.priority_id)
                return `Current Priority: ${priority.type}`;
              else return null;
            })}
          </Card.Text>

          <Button onClick={redirect} variant="outline-light">
            Change status
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Issue? </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={resolveIssue}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

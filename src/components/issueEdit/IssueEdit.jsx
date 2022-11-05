import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

export const IssueEdit = ({ token }) => {
  let history = useHistory();
  let { id } = useParams();
  let [issue, setIssue] = useState();
  let [show, setShow] = useState(false);
  const [priorities, setPriorities] = useState();
  const [newPriority, setNewPriority] = useState();

  useEffect(() => {
    return async () => {
      await axios({
        method: "get",
        url: `https://challenge.broobe.net/api/v1/issues/${id}`,
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
        .then((res) => setIssue(res.data))
        .catch((err) => console.log(err));
      await axios({
        method: "get",
        url: "https://challenge.broobe.net/api/v1/priorities",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }).then((res) => setPriorities(res.data));
    };
  }, []);
  const handleConfirm = async () => {
    try {
      await axios({
        method: "patch",
        url: `https://challenge.broobe.net/api/v1/issues/${id}`,
        data: {
          priority_id: newPriority,
        },
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      setShow(false);
      history.go("/");
    } catch (error) {
      setShow(false);
      console.log(error);
      throw new Error(error);
    }
  };
  return (
    <div className="d-flex justify-content-center align-center">
      <Card
        className="d-flex justify-content-center align-center"
        style={{ width: "18rem" }}
        border="danger"
        bg="dark"
        text="light"
      >
        <Card.Body>
          <Card.Title>{issue?.name}</Card.Title>
          <Card.Text>{issue?.description}</Card.Text>

          <Card.Text>
            {priorities?.map((priority, key) => {
              if (priority.id === issue?.priority_id)
                return `Current Priority: ${priority.type}`;
              else return null;
            })}
          </Card.Text>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Change Priority</Form.Label>
            <Form.Select
              placeholder="Priority"
              onChange={(e) => setNewPriority(e.target.value)}
            >
              {priorities?.map((priority) => {
                if (priority.id !== issue.priority_id) {
                  return (
                    <option value={priority.id} key={priority.id}>
                      {priority.type}
                    </option>
                  );
                } else return null;
              })}
            </Form.Select>
          </Form.Group>

          <Button variant="outline-danger" onClick={() => setShow(true)}>
            Confirm
          </Button>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change Issue Priority</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to change the priority of this Issue?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

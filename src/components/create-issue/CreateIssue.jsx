import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Badge from "react-bootstrap/Badge";
import { useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utility-funcs";
import axios from "axios";

export const CreateIssue = ({ token }) => {
  let [show, setShow] = useState(false);
  let [priorities, setPriorities] = useState(getLocalStorage("priorities"));
  let [error, setError] = useState();
  let [issue, setIssue] = useState({
    name: "",
    description: "",
    priority_id: 1,
  });

  const createIssue = async () => {
    try {
      await axios({
        method: "post",
        url: "https://challenge.broobe.net/api/v1/issues",
        data: {
          name: issue.name,
          description: issue.description,
          priority_id: Number(issue.priority_id),
        },
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      }).then((res) => setLocalStorage("issue", res.data));
      setShow(true);
    } catch (error) {
      console.log(error);
      setShow(true);
      setError(
        `Ups...Looks like something went wrong. Api response: '${error.response.data.message}'`
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignContent: "center",
        marginBottom: "5px",
      }}
    >
      <div className="d-flex justify-content-center align-self-center pb-3 ">
        <Badge
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "250px",
            height: "3rem",
          }}
          bg="info"
        >
          Click on the Broobe logo to go back
        </Badge>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h3>Create Issue</h3>
      </div>
      <div
        className="mt-2 container"
        style={{
          display: "flex",
          justifyContent: "center",
          border: "solid",
          borderRadius: "10px",
          width: "23rem",
          height: "20rem",
        }}
      >
        <Form className="mt-2" style={{ width: "13rem" }}>
          <Form.Group className="mb-3">
            <Form.Label>Issue name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Issue..."
              onChange={(e) => setIssue({ ...issue, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description..."
              onChange={(e) =>
                setIssue({ ...issue, description: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Priority order</Form.Label>
            <Form.Select
              onChange={(e) =>
                setIssue({ ...issue, priority_id: e.target.value })
              }
            >
              {priorities?.map((priority) => (
                <option value={priority.id} key={priority.id}>
                  {priority.type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="button" onClick={createIssue}>
            Create
          </Button>
        </Form>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <p>{error ? error : "Succesfully created!"}</p>
          <Button onClick={() => setShow(false)} variant="primary">
            Close
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

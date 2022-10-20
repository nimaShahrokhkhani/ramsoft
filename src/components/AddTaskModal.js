import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'underscore';

export default function AddTaskModal({isShow, onSaveTaskClick, onEditTaskClick, onDeleteTaskClick, card}) {
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(isShow);
    const [task, setTask] = useState(card);
    const [name, setName] = useState(!_.isEmpty(task.name) ? task.name : "");
    const [description, setDescription] = useState(!_.isEmpty(task.description) ? task.description : "");
    const [deadline, setDeadline] = useState(!_.isEmpty(task.deadline) ? task.deadline : "");
    const [image, setImage] = useState(!_.isEmpty(task.image) ? task.image : "");
    useEffect(() => {
        setShow(isShow);
        setTask(card);
        setName(card.name)
        setDescription(card.description)
        setDeadline(card.deadline)
    }, [isShow, card])
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Task...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Task Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={e => {
                                    setImage(e.target.files[0])
                                }}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Task Deadline</Form.Label>
                            <Form.Control
                                type="date"
                                value={deadline}
                                onChange={e => setDeadline(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Task Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                rows={3}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        if (!_.isEmpty(task)) {
                            onEditTaskClick && onEditTaskClick(card, {
                                name,
                                description,
                                deadline,
                                image
                            });
                        } else {
                            onSaveTaskClick && onSaveTaskClick({
                                name,
                                description,
                                deadline,
                                image
                            });
                        }
                        handleClose();
                    }}>
                        {!_.isEmpty(task) ? "Update Changes" : "Save Changes"}
                    </Button>
                    {!_.isEmpty(task) &&
                        <Button variant="danger" onClick={() => {
                            onDeleteTaskClick && onDeleteTaskClick(card)
                            handleClose();
                        }}>
                            Delete
                        </Button>}
                </Modal.Footer>
            </Modal>
        </>
    );
}

import { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Modal } from 'react-bootstrap';

class UpdateBookFormModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
        }
    }

    handleBookSubmit = (event) => {
        event.preventDefault();

        let bookObj = {
            title: event.target.title.value,
            author: event.target.author.value,
            description: event.target.description.value,
            url: event.target.url.value,
            status: event.target.status.checked,
            _id: this.props.book._id,
            __v: this.props.book.__v,
        }
        console.dir(`UpdateBookObj: ${bookObj}`);
        this.props.updateBooks(bookObj);
    }

    render() {
        return (
            <Modal
                {...this.props}
                show={this.props.show}
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Book Entry
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleBookSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>
                                Book Title
                            </Form.Label>
                            <Form.Control type="text" defaultValue={this.props.book.title}/>
                        </Form.Group>

                        <Form.Group controlId="author">
                            <Form.Label>
                                Author
                            </Form.Label>
                            <Form.Control type="text" defaultValue={this.props.book.author}/>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>
                                Book Description
                            </Form.Label>
                            <Form.Control type="text" defaultValue={this.props.book.description}/>
                        </Form.Group>

                        <Form.Group controlId="url">
                            <Form.Label>
                                Book Cover URL
                            </Form.Label>
                            <Form.Control type="text" defaultValue={this.props.book.url}/>
                        </Form.Group>

                        <Form.Group controlId="status">
                            <Form.Check type="checkbox" label="Read?" />
                        </Form.Group>
                        <Button variant='secondary' type='submit'>Update</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div>{this.state.errorMessage.length > 0 ? this.state.errorMessage : <br />}</div>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default UpdateBookFormModal;
import { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Modal} from 'react-bootstrap';

class BookFormModal extends Component {

    handleBookSubmit = (event) => {
        event.preventDefault();

        let bookObj = {
            title: event.target.title.value,
            author: event.target.author.value,
            description: event.target.description.value,
            url: event.target.url.value,
            status: event.target.status.checked,
        }

        this.postBook(bookObj);
        this.props.onClose();
        this.props.fetchBooks();
    }
    postBook = async (obj) => {
        try {
            let url = `${process.env.REACT_APP_SERVER}/books`;
            let postBook = await axios.post(url, obj);
        } catch (error) {
            console.error(error);
        }
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
                    Testing...
                </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleBookSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>
                                Book Title
                            </Form.Label>
                            <Form.Control type="text" placeholder="To Kill a Mockingbird" />
                        </Form.Group>

                        <Form.Group controlId="author">
                            <Form.Label>
                                Author
                            </Form.Label>
                            <Form.Control type="text" placeholder="Harper Lee" />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>
                                Book Description
                            </Form.Label>
                            <Form.Control type="text" placeholder="Description goes here..." />
                        </Form.Group>

                        <Form.Group controlId="url">
                            <Form.Label>
                                Book Cover URL
                            </Form.Label>
                            <Form.Control type="text" placeholder="http://amazon.com" />
                        </Form.Group>

                        <Form.Group controlId="status">
                            <Form.Check type="checkbox" label="Read?" />
                        </Form.Group>
                        <Button variant='secondary' type='submit'>Submit</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default BookFormModal;
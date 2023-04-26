import { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Modal } from 'react-bootstrap';

class BookFormModal extends Component {
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
        }

        this.postBook(bookObj);
        // TODO: Rerender data from database callball.
        // https://github.com/codefellows/seattle-code-301d98/blob/main/class-12/inclass-demo/frontend/src/App.js#L63
        // this.props.fetchBooks();
    }
    postBook = async (obj) => {
        try {
            let url = `${process.env.REACT_APP_SERVER}/books`;
            let postBook = await axios.post(url, obj);
            this.props.setStateFunc(postBook.data);
            this.props.onClose();
        } catch (error) {
            console.error(error);
            this.setState({
                errorMessage: error.message,
            })
        }
    }

    render() {
        return (
            // TODO: Add validation styling with form.checkValidity() if statement
            //       https://react-bootstrap.github.io/forms/validation/
            <Modal
                {...this.props}
                show={this.props.show}
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        New Book Entry
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleBookSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>
                                Book Title
                            </Form.Label>
                            <Form.Control type="text" placeholder="To Kill a Mockingbird" required />
                        </Form.Group>

                        <Form.Group controlId="author">
                            <Form.Label>
                                Author
                            </Form.Label>
                            <Form.Control type="text" placeholder="Harper Lee" required />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>
                                Book Description
                            </Form.Label>
                            <Form.Control type="text" placeholder="Description goes here..." required />
                        </Form.Group>

                        <Form.Group controlId="url">
                            <Form.Label>
                                Book Cover URL
                            </Form.Label>
                            <Form.Control type="text" placeholder="http://amazon.com" required />
                        </Form.Group>

                        <Form.Group controlId="status">
                            <Form.Check type="checkbox" label="Read?" />
                        </Form.Group>
                        <Button variant='secondary' type='submit'>Submit</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div>{ this.state.errorMessage.length > 0 ? this.state.errorMessage : <br /> }</div>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default BookFormModal;
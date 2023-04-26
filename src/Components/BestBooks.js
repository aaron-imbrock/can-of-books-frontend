import { Component } from "react";
import { Carousel, Button } from "react-bootstrap";


class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
        }
    }
    handleOpenForm = () => {
        this.setState({
            showForm: true
        })
    }
    render() {
        const { info, ...rest } = this.props;
        return (
            <Carousel.Item {...rest}>
                <img
                    className="d-block w-100"
                    src={info.url}
                    alt={"Cover image for the book " + info.title}
                />
                <Carousel.Caption>
                    <h3>{info.title}</h3>
                    <p>{info.author}</p>
                    <Button
                        variant="secondary"
                        onClick={() => this.props.deleteBook(info._id)}
                    >
                        Delete
                    </Button>
                    <Button
                        variant="secondary"
                        onClick={() => this.props.updateBook(info)}
                    >
                        Update
                    </Button>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }
}

export default Books;
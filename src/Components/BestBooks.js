import { Component } from "react";
import { Carousel, Button } from "react-bootstrap";


class Books extends Component {
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
                    <Button variant="secondary">
                        Delete
                    </Button>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }
} 

export default Books;
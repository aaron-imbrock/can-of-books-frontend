import { Component } from "react";
import { Carousel, Button } from "react-bootstrap";


class Books extends Component {
    
    deleteHandler = () => {
        this.props.onDelete(this.props.info._id)
        console.log(this.props.bookIndexPosition === this.props.idx, this.props.bookIndexPosition , this.props.idx)
        if(this.props.bookIndexPosition === this.props.idx){ // This will refresh the page if 
            window.location.reload();
            // this.forceUpdate();
        }
    }
    
    render() {
        const {info, idx, ...rest } = this.props;
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
                    id = {idx}
                    onClick={this.deleteHandler}
                    >
                        Delete
                    </Button>
                </Carousel.Caption>
            </Carousel.Item>
        )
    }
} 

export default Books;
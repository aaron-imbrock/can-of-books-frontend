import React from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import BestBooks from './BestBooks';
import BookFormModal from './BookFormModal';

const SERVER = process.env.REACT_APP_SERVER;


class BestBooksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      show: false,
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount() {
    this.fetchBooks();
  }

  closeHandler = () => {
    this.setState({
      show: false,
    })
  }

  openHandler = () => {
    this.setState({
      show: true,
    })
  }

  setStateFunc = (obj) => {
    this.setState({
      books: [...this.state.books, obj]
    })
  }

  async fetchBooks(id = null) {
    let apiUrl = `${SERVER}/books`;

    if (id) {
      apiUrl += `?id=${id}`;
    }
    try {
      const response = await axios.get(apiUrl);
      this.setState({ books: response.data });
      console.dir(`Response.data: ${response.data}`);
      console.log("Request to: ", apiUrl);
    } catch (error) {
      console.log("error Request to: ", apiUrl);
      console.log("error", error);
    }
  }

  deleteBook = async (id) => {
    
    try {
      let apiUrl = `${SERVER}/books/${id}`;
      console.log(apiUrl);
      const response = await axios.delete(apiUrl);
      let updatedBooks = this.state.books.filter(book => {
        return book._id !== id
      });
      console.log(updatedBooks);
      console.dir(`Response.data: ${response.data}`);
      this.setState({
        books: updatedBooks,
      })
    } catch (error) {
      console.error("error request to: ", error.message);
    }
  } 
  render() {

    /* TODO: render all the books in a Carousel */
    let CarouselList = this.state.books.map((book, idx) => {
      return (
        <BestBooks onDelete={this.deleteBook} key={idx} info={book}></BestBooks>
      )
    });

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Button variant="secondary" onClick={this.openHandler}>Add Book</Button>
        {this.state.books.length > 0 ? (
          <Carousel>
            {CarouselList}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
        <BookFormModal
          show={this.state.show}
          onClose={this.closeHandler}
          fetchBooks={this.fetchBooks}
          setStateFunc={this.setStateFunc}
        />
      </>
    )
  }
}

export default BestBooksList;

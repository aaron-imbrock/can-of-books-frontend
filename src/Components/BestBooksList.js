import React from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import BestBooks from './BestBooks';
import CreateBookFormModal from './createBookFormModal';
import UpdateBookFormModal from './updateBookFormModal';

const SERVER = process.env.REACT_APP_SERVER;


class BestBooksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showCreateModal: false,
      showUpdateModal: false,
      targetBook: {},
    }
  }

  componentDidMount() {
    this.fetchBooks();
  }

  closeHandler = () => {
    this.setState({
      showCreateModal: false,
      showUpdateModal: false,
    })
  }

  openHandlerCreateModal = () => {
    this.setState({
      showCreateModal: true,
    })
  }

  getBookAndShowModal = (bookObj) => {
    this.setState({
      targetBook: bookObj,
      showUpdateModal: true,
    })
  }

  setStateFunc = (obj) => {
    this.setState({
      books: [...this.state.books, obj]
    })
  }
// TODO: rename to fetchBooksHandler
  fetchBooks = async (id = null) => {
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

  updateBookHandler = async (bookObjToUpdate) => {
    console.log(`BookobjToUpdate is ${bookObjToUpdate}`);
    try {
      let apiUrl = `${SERVER}/books/${bookObjToUpdate._id}`;
      const response = await axios.put(apiUrl, bookObjToUpdate);
      let updatedBooks = this.state.books.map((existingBook) => {
          return existingBook._id === bookObjToUpdate._id 
          ? response.data
          : existingBook
      })
      this.setState({
        books: updatedBooks,
        showUpdateModal: false,
      })
    } catch (error) {
      console.error(error.message);
    }
  }
  
  deleteBookHandler = async (id) => {
    
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
        <BestBooks 
        deleteBook={this.deleteBookHandler} 
        updateBook={this.getBookAndShowModal} 
        key={idx} info={book} 
          
        />
      )
    });

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Button variant="secondary" onClick={this.openHandlerCreateModal}>Add Book</Button>
        {this.state.books.length > 0 ? (
          <Carousel>
            {CarouselList}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}

        <CreateBookFormModal 
        // TODO: change updateBooks to updateLibrary
        show={this.state.showCreateModal} 
        onClose={this.closeHandler} 
        setStateFunc={this.setStateFunc} 
        />
        <UpdateBookFormModal 
        show={this.state.showUpdateModal} 
        onClose={this.closeHandler} 
        updateBooks={this.updateBookHandler} 
        book={this.state.targetBook} 
        setStateFunc={this.setStateFunc} />
      </>
    )
  }
}

export default BestBooksList;

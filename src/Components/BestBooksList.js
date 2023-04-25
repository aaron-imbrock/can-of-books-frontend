import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import BestBooks from './BestBooks';

const SERVER = process.env.REACT_APP_SERVER;


class BestBooksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount(){
    this.fetchBooks();
  }

  async fetchBooks (id = null){
    let apiUrl = `${SERVER}/books`;
    
    if(id){
      apiUrl += `?id=${id}`;
    }
    try {
      const response = await axios.get(apiUrl);
      this.setState({books: response.data});
    } catch (error) {
      console.log(error);
    }
  }

  handle

  render() {

    /* TODO: render all the books in a Carousel */
    let CarouselList = this.state.books.map((book, idx) => {
      return (
        <BestBooks key={idx} info={book}></BestBooks>
      )
    });

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        
        {this.state.books.length > 0 ? (
          <Carousel>
            {CarouselList}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooksList;

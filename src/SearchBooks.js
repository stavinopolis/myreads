import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookView from './BookView'


class SearchBooks extends Component {
  state= {
    query : '',
    results : []
  };


  updateQuery= (query) => {
    this.setState({ query:query});
    this.search(query)
  };

  search(query) {
     if (query.length < 1) {
      return true;
    }
    BooksAPI.search(query, 25).then(response => {
          console.log(response);
          if (response && response.error) {
          this.setState({
            results: []
          });
        } else {
          this.setState({results:response});
        }
        }
    );
  }

	render () {
	return (
		<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
                {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"
                  onChange={(event) => this.updateQuery(event.target.value)}
                  value= {this.state.query}
                />
                
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {this.state.results.map(book=>(
                <li key={book.id}>
                  <BookView book={book} reshelf={this.props.reshelf}/>
                </li>))
                }
              </ol>
            </div>
          </div>
	)
	}
}

export default SearchBooks
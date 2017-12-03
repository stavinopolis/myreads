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



  
  merge = (mine,results) => {
    return results.map((item)=>{
      item.shelf="none";
      for (var i = 0; i < mine.length; i++) {
        // console.log(mine[i].id);
        // console.log(item.id);
        // console.log(mine[i].id==item.id);
        if(mine[i].id==item.id){
          item.shelf=mine[i].shelf
          console.log("match!!!")
        }
      }
      console.log(item)
      return item;
    })
  }  

  search(query) {
     if (query.length < 1) {
      return true;
    }
    BooksAPI.search(query, 25).then(response => {
          // console.log(response);
          if (response && response.error) {
          this.setState({
            results: []
          });
        } else {
          this.setState({results:this.merge(this.props.shelved, response)});
        }
        }
    );
  } 


	render () {
    let existing = this.props.shelved;    
    let marge = this.merge(existing, this.state.results);
    // console.log(marge);
	return (
		<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <div className="search-books-input-wrapper">
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
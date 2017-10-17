import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import BookView from './BookView'


class ListBooks extends Component {
	static propTypes = {
		books : PropTypes.array.isRequired,
		reshelf : PropTypes.func.isRequired
	};

	render () {
		let current= this.props.books.filter( b=> b.shelf=='currentlyReading');
		let want = this.props.books.filter( b=> b.shelf=='wantToRead');
		let read = this.props.books.filter( b=> b.shelf=='read');

	return (
	          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
						{current.map(book=>(
						<li key={book.id}>
							<BookView book={book} reshelf={this.props.reshelf}/>
						</li>))
						}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
    					{want.map(book=>(
						<li key={book.id}>
							<BookView book={book} reshelf={this.props.reshelf}/>
						</li>))
						}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {read.map(book=>(
						<li key={book.id}>
							<BookView book={book} reshelf={this.props.reshelf}/>
						</li>))
					}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>

	)
	}
}

export default ListBooks
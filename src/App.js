import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books : []
  }
  
  updateBook = (b,e) => { BooksAPI.update(b, e.target.value).then(data => { this.getBooks() })}
    
  getBooks() {
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    })
   }

  componentDidMount(){
      this.getBooks()
  }



  render() {
    return (
      <div className="app">
      <Route path="/" exact render={ () => (
       <ListBooks books={this.state.books} reshelf={this.updateBook}/>
      )}/>      
      <Route path="/search" render={ () => (
       <SearchBooks getResults={this.searchBook} shelved={this.state.books} reshelf={this.updateBook}/>
      )}/>
          
      </div>
    )
  }
}

export default BooksApp

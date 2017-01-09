import React from 'react'
import ReactDOM from 'react-dom'

class Crud extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [],
    };
  }
  render() {
    const bookRows = this.state.books.map((book) => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.name}</td>
        </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {bookRows}
        </tbody>
      </table>
    );
  }
  componentDidMount() {
    fetch('/books')
      .then((response) => response.json())
      .then((json) => this.setState({books: json}));
  }
}

document.addEventListener("DOMContentLoaded", e => {
  ReactDOM.render(<Crud name="React" />, document.getElementById('content'))
})


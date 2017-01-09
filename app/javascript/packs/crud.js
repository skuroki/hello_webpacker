import React from 'react'
import ReactDOM from 'react-dom'

class Crud extends React.Component {
  render() {
    return (
      <div>
        <Table />
        <Form />
      </div>
    );
  }
}

class Table extends React.Component {
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

class Form extends React.Component {
  constructor() {
    super();
    this.state = {name: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    let formData = new FormData();
    formData.append('book[name]', this.state.name);
    fetch('/books', { method: 'POST', body: formData });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

document.addEventListener("DOMContentLoaded", e => {
  ReactDOM.render(<Crud />, document.getElementById('content'))
})


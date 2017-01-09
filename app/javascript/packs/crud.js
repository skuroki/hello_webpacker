import React from 'react'
import ReactDOM from 'react-dom'

class Crud extends React.Component {
  constructor() {
    super();
    this.state = {
      phase: 'index',
      books: [],
    };
  }
  render() {
    switch (this.state.phase) {
      case 'index':
        return (
          <div>
            <Table books={this.state.books} onDelete={(id) => this.deleteBook(id)} />
            <button onClick={() => this.changePhase('new')}>
              add new book
            </button>
          </div>
        );
        break;
      case 'new':
        return (
          <Form onSubmit={(form) => this.createBook(form)} />
        );
        break;
    }
  }
  componentDidMount() {
    this.openIndex();
  }
  changePhase(newPhase) {
    this.setState({phase: newPhase});
  }
  reload() {
    fetch('/books')
      .then((response) => response.json())
      .then((json) => this.setState({books: json}));
  }
  openIndex() {
    this.reload();
    this.changePhase('index');
  }
  deleteBook(id) {
    fetch('/books/' + id, { method: 'DELETE' })
      .then(() => this.reload());
  }
  createBook(form) {
    let formData = new FormData();
    formData.append('book[name]', form.name);
    fetch('/books', { method: 'POST', body: formData })
      .then(() => this.openIndex());
  }
}

class Table extends React.Component {
  render() {
    const bookRows = this.props.books.map((book) => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.name}</td>
          <td>
            <button onClick={() => this.props.onDelete(book.id)}>
              delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {bookRows}
        </tbody>
      </table>
    );
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
    this.props.onSubmit(this.state);
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


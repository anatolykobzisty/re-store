import React, { Component } from 'react';
import BookListItem from '../book-list-item';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { withBookstoreService } from '../hoc';
import { booksLoaded } from '../../actions';
import compose from '../../utils';
import './book-list.css';

class BookList extends Component {
  componentDidMount() {
    const { bookstoreService } = this.props;
    const data = bookstoreService.getBooks();
    this.props.booksLoaded(data);
  }
  render() {
    const { books } = this.props;
    return (
      <ul className="book-list">
        {books.map(book => {
          return (
            <li key={book.id}>
              <BookListItem book={book} />
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = ({ books }) => ({
  books,
});

// ----------------------------- 1 Форма ---------------------------
// const mapDispatchToProps = dispatch => {
//   return {
//     booksLoaded: newBooks => {
//       dispatch({
//         type: 'BOOKS_LOADED',
//         payload: newBooks,
//       });
//     },
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     booksLoaded: newBooks => {
//       dispatch(booksLoaded(newBooks));
//     },
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({ booksLoaded }, dispatch);
// };

// ----------------------------- 2 Форма ---------------------------
const mapDispatchToProps = {
  booksLoaded,
};

export default compose(
  withBookstoreService(),
  connect(mapStateToProps, mapDispatchToProps)
)(BookList);

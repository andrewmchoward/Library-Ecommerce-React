import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Book from "../components/ui/Book";
import Price from "../components/ui/Price";
import Rating from "../components/ui/Rating";

const Bookinfo = ({ books, addToCart, cart }) => {
  const { id } = useParams();
  const book = books.find((book) => +book.id === +id);

  function addBookToCart(book) {
    addToCart(book);
  }

  function bookExistsInCart() {
    return cart.find((book) => +book.id === +id);
  }

  return (
    <div id="books__body">
      <main id="books__main">
        <div className="books__container">
          <div className="row">
            <div className="book__selected--top">
              <Link to="/books" className="book__link">
                <FontAwesomeIcon icon="arrow-left" />
              </Link>
              <Link to="/books">
                <h2 className="book__selected--title--top">Books</h2>
              </Link>
            </div>
            <div className="book__selected">
              <figure className="book__selected--figure">
                <img src={book.url} alt="" className="book__selected--img" />
              </figure>
              <div className="book__selected--description">
                <h2 className="book__selected--title">{book.title}</h2>
                <Rating rating={book.rating} />
                <div className="book__selected--price">
                  <Price
                    originalPrice={book.originalPrice}
                    salePrice={book.salePrice}
                  />
                </div>
                <div className="book__summary">
                  <h3 className="book__summary--title">Summary</h3>
                  <p className="book__summary--para">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Eveniet autem ipsa officiis aperiam architecto sed voluptate
                    ex natus, qui odio at enim veritatis provident debitis.
                    Natus perferendis voluptas aperiam nam.
                  </p>
                  <p className="book__summary--para">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Eveniet autem ipsa officiis aperiam architecto sed voluptate
                    ex natus, qui odio at enim veritatis provident debitis.
                    Natus perferendis voluptas aperiam nam.
                  </p>
                </div>
                {bookExistsInCart() ? (
                  <Link to={`/cart`}><button className="btn">Checkout</button></Link>
                ) : (
                  <button className="btn" onClick={() => addBookToCart(book)}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="books__container">
          <div className="book__selected--top">
            <h2 className="book__selected--title--top">Recommended Books</h2>
          </div>
          <div className="books">
            {books
              .filter((book) => book.rating === 5 && +book.id !== +id)
              .slice(0, 4)
              .map((book) => (
                <Book book={book} key={book.id} />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bookinfo;

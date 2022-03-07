import React from "react";
import { useEffect, useState } from "react";
import booksApi from "../api/books";
const Carousal = () => {
  const [books, setBooks] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        let res = await booksApi.getRecommendations();
        setBooks(res.data.books);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      {books.length > 0 && (
        <div>
          <p
            className="absolute text-3xl left-0 top-[40%]"
            onClick={() => {
              if (current > 0) {
                setCurrent(current - 1);
              } else {
                setCurrent(books.length - 1);
              }
            }}
          >
            &lt;
          </p>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center text-5xl ">
            <p className="m-auto">
              {books[current].title} by {books[current].author}
            </p>
          </div>
          <p
            className="absolute text-3xl right-0 top-[40%]"
            onClick={() => {
              if (current < books.length - 1) {
                setCurrent(current + 1);
              } else {
                setCurrent(0);
              }
            }}
          >
            &gt;
          </p>
        </div>
      )}
    </>
  );
};

export default Carousal;

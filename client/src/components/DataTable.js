import React from "react";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetchBooks";
import booksApi from "../api/books";
import { useLocation } from "react-router-dom";
const DataTable = () => {
  const location = useLocation();
  const [filter, setFilter] = useState({
    title: "",
    author: "",
    startYear: 0,
    endYear: 0,
  });
  const [searchToggler, setSearchToggler] = useState(false);
  const [isLoading, data, setData, err] = useFetch(
    location.pathname,
    searchToggler
  );
  const handleChange = (e) => {
    console.log(e.target.name,e.target.value);
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <>
      <p className="text-center text-2xl w-[100%]">Search the database</p>
      <div className="h-[20%] m-auto w-[100%] ">

        <input
          type="text"
          placeholder="search by author"
          name="author"
          onChange={handleChange}
          value={filter.author}
        />
        <input
          type="text"
          placeholder="search by name"
          name="title"
          onChange={handleChange}
          value={filter.title}
        />
        <input
          type="number"
          placeholder="startYear"
          name="startYear"
          onChange={handleChange}
          value={filter.startYear}
        />
        <input
          type="number"
          placeholder="endYear"
          name="endYear"
          onChange={handleChange}
          value={filter.endYear}
        />
        <div className="flex w-[100%] justify-around  m-2 ">
          <button
            onClick={() => {
              setSearchToggler(!searchToggler);
            }}
          >
            reset filter
          </button>
          <button
            onClick={async () => {
              let res = await booksApi.getSearchResults(filter);
              console.log(res);
              setData(res.data.books);
            }}
          >
            search
          </button>
        </div>
      </div>
      <div className="p-2 h-[80%] text-center">
        <p className="text-2xl">list of books</p>
        <div className="border-2 h-[90%]">
          {isLoading && <p>loading...</p>}
          {err && <p className="text-red-500">{err.msg}</p>}
          <div className="flex w-[80%] m-auto border-2 justify-around font-bold">
            <h2>author</h2>
            <h2>title</h2>
            <h2>year of publication</h2>
            <h2>total count</h2>
            <h2>available</h2>
            {location.pathname === "/admin" && <h2>del</h2>}
            {location.pathname === "/user" && <h2>issue book</h2>}
          </div>
          {data.map((book) => {
            return (
              <div
                className="flex w-[80%] border-2 m-auto justify-around"
                key={book._id}
              >
                <p>{book.author}</p>
                <p>{book.title}</p>
                <p>{book.yearOfPublication}</p>
                <div className="flex  cursor-pointer text-3xl">
                  {location.pathname === "/admin" && (
                    <p
                      onClick={async () => {
                        try {
                          let res = await booksApi.decrementBookCount(book._id);
                          setData((data) =>
                            data.map((b) =>
                              b._id === book._id
                                ? { ...b, noOfCopies: res.data.count }
                                : b
                            )
                          );
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    >
                      -
                    </p>
                  )}
                  <p>{book.noOfCopies}</p>
                  {console.log(location)}
                  {location.pathname === "/admin" && (
                    <p
                      onClick={async () => {
                        try {
                          let res = await booksApi.incrementBookCount(book._id);
                          setData((data) =>
                            data.map((b) =>
                              b._id === book._id
                                ? { ...b, noOfCopies: res.data.count }
                                : b
                            )
                          );
                        } catch (err) {
                          console.log(err.response.data.msg);
                        }
                      }}
                    >
                      +
                    </p>
                  )}
                </div>
                <div>
                  <p>{book.noOfCopies - book.issueCount}</p>
                </div>
                <div className="cursor-pointer">
                  {location.pathname === "/admin" && (
                    <p
                      onClick={async () => {
                        try {
                          let res = await booksApi.deleteBook(book._id);
                          setData((data) =>
                            data.filter((b) => b._id !== book._id)
                          );
                        } catch (err) {
                          console.log(err);
                        }
                      }}
                    >
                      delete
                    </p>
                  )}
                  {location.pathname === "/user" && (
                    <p
                      onClick={async () => {
                        try {
                          let res = await booksApi.issueBook(book._id);
                          setData((data) =>
                            data.map((b) =>
                              b._id === book._id
                                ? { ...b, issueCount: res.data.book.issueCount }
                                : b
                            )
                          );
                        } catch (err) {
                          alert(err);
                        }
                      }}
                    >
                      issue
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DataTable;

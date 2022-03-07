import { useState, useEffect } from "react";
import booksApi from "../api/books";
const useFetch = (path, searchToggler) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [err, setErr] = useState("");
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        let res;
        if (path === "/admin") {
          res = await booksApi.getAllBooks();
        } else {
          res = await booksApi.getAvailableBooks();
        }
        setData(res.data.books);
        console.log(res.data.books);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setErr(err.response.data);
        setIsLoading(false);
      }
    })();
  }, [searchToggler]);

  return [isLoading, data, setData, err];
};

export default useFetch;

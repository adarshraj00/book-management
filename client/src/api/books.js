import axios from "axios";
export default {
  saveNewBook: (book) => {
    return axios.post("/api/books/add-new-book", book, {
      withCredentials: true,
    });
  },
  getAllBooks: () => {
    return axios.get("/api/books/all", { withCredentials: true });
  },
  getAvailableBooks: () => {
    return axios.get("/api/books/available", { withCredentials: true });
  },
  incrementBookCount: (id) => {
    return axios.put(`/api/books/increment-book-count/${id}`, {
      withCredentials: true,
    });
  },
  decrementBookCount: (id) => {
    return axios.put(`/api/books/decrement-book-count/${id}`, {
      withCredentials: true,
    });
  },
  deleteBook: (id) => {
    return axios.delete(`/api/books/${id}`, { withCredentials: true });
  },
  getRecommendations: (id) => {
    return axios.get("/api/books/recommendations", { withCredentials: true });
  },
  getSearchResults: ({author, title, startYear, endYear}) => {
    let str = "";
    if (author.length > 0) {
      str += "author=" + author + "&";
    }
    if (title.length > 0) {
      str += "title=" + title + "&";
    }
    if (startYear > 0) {
      str += "startYear=" + startYear + "&";
    }
    if (endYear > 0) {
      str += "endYear=" + endYear;
    }
    console.log(str)
    return axios.get(`/api/books/search?${str}`, { withCredentials: true });
  },
  issueBook:(id)=>{
    return axios.post(`api/books/issue/${id}`,{widthCredentials:true})
  }
};

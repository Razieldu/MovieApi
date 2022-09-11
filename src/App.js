import "./App.css";
import { Routes, Route } from "react-router";
import MoviePage from "./pages/MoviePage";
import MovieCommentPage from "./pages/MovieCommentPage";
import TvCommentPage from "./pages/TvCommentPage";
import TvPage from "./pages/TvPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MoviePage />}></Route>
      <Route path="/tv" element={<TvPage />}></Route>
      <Route path="/tv/:movieId" element={<TvCommentPage />}></Route>
      <Route path="/:movieId" element={<MovieCommentPage />}></Route>
      {/* <Route path="*" element={<MoviePage />}></Route> */}
    </Routes>
  );
}

export default App;

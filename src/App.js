import "./App.css";
import { Routes, Route } from "react-router";
import MainPage from "./pages/MainPage";
import CommentPage from "./pages/CommentPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="/:movieId" element={<CommentPage />}></Route>
    </Routes>
  );
}

export default App;

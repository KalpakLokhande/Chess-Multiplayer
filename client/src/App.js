import Board from "./Components/Board";
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./Components/Home";
import Puzzles from "./Components/Puzzles";
import ReviewGame from "./Components/ReviewGame";
import PlayComputer from "./Components/PlayComputer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home></Home>} path="/" ></Route>
        <Route element={<Puzzles></Puzzles>} path="/puzzles" ></Route>
        <Route element={<ReviewGame></ReviewGame>} path="/review" ></Route>
        <Route element={<PlayComputer></PlayComputer>} path="/playComputer" ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

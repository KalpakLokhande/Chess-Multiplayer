import Board from "./Components/Board";
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter>
    {/* <div className="App">

      <Board></Board>
    </div> */}
    <Routes>
        <Route element={<Home></Home>} path="/" ></Route>
        {/* <Route element={<Play></Home>} path="/home" ></Route> */}

    </Routes>
    </BrowserRouter>
  );
}

export default App;

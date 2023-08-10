import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css"
import Home from "./Home";
import Board from "./Board";
import BoardDetail from "./BoardDetail";
import BoardCreate from "./BoardCreate";
import BoardModify from "./BoardModify";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>

      <div className="container my-3">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/board" element={<Board/>}/>
        <Route path="/board/:id" element={<BoardDetail/>}/>
        <Route path="/question-create" element={<BoardCreate />}/>
        <Route path="/question-modify/:id" element={<BoardModify />}/>


      </Routes>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainCard from "./components/MainCard.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainCard />} />
      </Routes>
    </Router>
  );
};

export default App;
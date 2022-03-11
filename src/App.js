import Login from "./components/login.js";
import Header from "./components/header.js";
import Chat from "./components/users.js";
import Text from "./components/chat.js";
import NotFound from "./components/notFound.js";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const isLogged = useSelector((state) => state.isLogged);
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Login act={1} />} />
          <Route path="/signup" element={<Login act={0} />} />
          <Route path="/login" element={<Login act={1} />} />
          {isLogged && <Route path="/users" element={<Chat />} />}
          {isLogged && <Route path="/messages" element={<Text />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

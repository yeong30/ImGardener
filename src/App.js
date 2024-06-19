import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Main from "./pages/Main";
import Search from "./pages/Search";
import ErrorBoundary from "./component/ErrorBoundary/ErrorBoundary";

import "./App.css";

function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <Router>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/search" exact>
          <Search />
        </Route>
      </Router>
    </div>
  );
}

export default App;

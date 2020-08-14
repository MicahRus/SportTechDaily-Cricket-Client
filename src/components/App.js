import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import DataPage from "./DataPage";
import MainNav from "./MainNav";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckOdds from "./CheckOdds";
import TabNav from "./TabNav";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <MainNav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/checkodds" component={CheckOdds} />
      </Switch>
    </BrowserRouter>
    // <Home />
    // return <DataPage />;
  );
}

export default App;

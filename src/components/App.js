import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import DataPage from "./DataPage";
import MainNav from "./MainNav";
import SportsBetting from "./SportsBetting";
import TabNav from "./TabNav";
import FantasySport from "./FantasySport";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <BrowserRouter>
      <MainNav />
      <TabNav />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sportsbetting" component={SportsBetting} />
        <Route exact path="/fantasysport" component={FantasySport} />
      </Switch>
    </BrowserRouter>
    // <Home />
    // return <DataPage />;
  );
}

export default App;

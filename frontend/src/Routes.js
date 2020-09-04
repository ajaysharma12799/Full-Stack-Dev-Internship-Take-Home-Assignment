import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signup from './Components/signup';
import Signin from "./Components/signin";

import ImageA from './Components/ImageA';
import ImageB from './Components/ImageB';
import ImageC from './Components/ImageC';
import Home from './Components/Home';


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>

        <Route path='/' exact component={ Home } />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />

        <Route path="/user/ImageOne" exact component={ImageA} />
        <Route path="/user/ImageTwo" exact component={ImageB} />
        <Route path="/user/ImageThree" exact component={ImageC} />

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
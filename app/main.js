import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './style.scss';
import Panel from './components/panel/panel';
import Items from './routes/items';
import Enchanters from './routes/enchanters';
import Profile from './routes/profile';
import Navigation from './components/navigation/navigation';
import Loader from './components/loader/container';

const Application = props =>
  <BrowserRouter>
    <div className="application">
      <Navigation />
      <Switch>
        <Route path="/" exact component={Items} />
        <Route path="/items" exact component={Items} />
        <Route path="/enchanters" exact component={Enchanters} />
        <Route path="/profile" exact component={Profile} />
        <Route render={() => <div className="404">Page Not Found: 404</div>} />
      </Switch>
      <Loader />
    </div>
  </BrowserRouter>;

export default Application;

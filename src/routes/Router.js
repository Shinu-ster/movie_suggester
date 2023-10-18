import React from 'react'
import { Switch } from 'react-router-dom/cjs/react-router-dom'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { Route } from 'react-router-dom/cjs/react-router-dom'
import Index from '../pages/Index'
import ViewMovies from '../pages/ViewMovies'
import AddMovie from '../pages/AddMovie'
import Login from '../pages/login'
import Profile from '../pages/Profile'

const Router =()=> {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Index} exact/>
        <Route path="/view_movies/:id" component={ViewMovies} exact/>
        <Route path="/add" component={AddMovie} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/profile" component={Profile} exact/>

      </Switch>
    </BrowserRouter>
  );
};

export default Router;

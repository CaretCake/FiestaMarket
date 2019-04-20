import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './assets/styles/index.scss';
import App from './App';
import { Role } from './helpers/export';
import { Header, Footer, PrivateRoute } from './components/export';
import { NotFoundError, SignInForm, ContactForm, UserProfile, AdminPage } from './scenes/export';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.defaults.withCredentials = true

const routing = (
  <Router>
    <div>
      <Route path="/" component={Header} />

      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/profile/:userId" component={UserProfile} />
        <Route path="/login" component={SignInForm} />
        <Route path="/contact" component={ContactForm} />
        <PrivateRoute path="/admin" roles={[Role.Admin]} component={AdminPage} />
        <Route path='*' exact={true} component={NotFoundError} />
      </Switch>

      <Route path="/" component={Footer} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

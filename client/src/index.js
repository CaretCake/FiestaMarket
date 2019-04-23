import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';
import history from './helpers/history';
import { Role } from './helpers/export';
import { Header, Footer, PrivateRoute } from './components/export';
import {NotFoundError, MainApp, SignInForm, ContactForm, UserProfile, AdminPage, SellOrderForm, Item } from './scenes/export';
import './assets/styles/index.scss';

axios.defaults.withCredentials = true;

const routing = (
  <Router history={history}>
    <div>
      <Route path='/' component={Header} />

      <Switch>
        <Route exact path={['/', '/items/:itemId']} component={MainApp} />
        <PrivateRoute path='/admin' roles={[Role.Admin]} component={AdminPage} />
        <Route path='/contact' component={ContactForm} />
        <Route path='/login' component={SignInForm} />
        <Route path='/order' component={SellOrderForm} />
        <Route path='/profile/:userId' component={UserProfile} />
        <Route path='*' exact={true} component={NotFoundError} />
      </Switch>

      <Route path='/items/:itemId' component={Item} />

      <Route path='/' component={Footer} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

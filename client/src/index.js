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
import { PrivateRoute, ErrorBoundary } from './components/export';
import { NotFoundError, Header, Footer, MainApp, MainOrderView, SignInForm, ContactForm, UserProfile, AdminPage, SellOrderForm, Item } from './scenes/export';
import './assets/styles/index.scss';
import { authenticationService } from './services/export';

axios.defaults.withCredentials = true;

const routing = (
  <Router history={history}>
    <div>
      <Route path='/' render={(props) => (
        <ErrorBoundary>
          <Header/>
        </ErrorBoundary>
      )} />
      <Route path='/' render={() => {
        authenticationService.isSessionValid(); }}/>

      <Switch>
        <Route exact path={['/', '/items/:itemId']} render={(props) => (
          <ErrorBoundary>
            <MainApp/>
          </ErrorBoundary>
        )} />
        <PrivateRoute path='/admin' roles={[Role.Admin]} render={(props) => (
          <ErrorBoundary>
            <AdminPage/>
          </ErrorBoundary>
        )} />
        <Route path='/contact' render={(props) => (
          <ErrorBoundary>
            <ContactForm/>
          </ErrorBoundary>
        )} />
        <Route path='/login' render={(props) => (
          <ErrorBoundary>
            <SignInForm/>
          </ErrorBoundary>
        )} />
        <Route path='/order' render={(props) => (
          <ErrorBoundary>
            <SellOrderForm/>
          </ErrorBoundary>
        )} />
        <Route path='/profile/:userId' render={(props) => (
          <ErrorBoundary>
            <UserProfile key={props.match.params.userId} userId={props.match.params.userId} />
          </ErrorBoundary>
        )} />
        <Route path='*' exact={true} render={(props) => (
          <ErrorBoundary>
            <NotFoundError/>
          </ErrorBoundary>
        )} />
      </Switch>

      <Route exact path='/'  render={(props) => (
        <ErrorBoundary>
          <MainOrderView/>
        </ErrorBoundary>
      )} />
      <Route path='/items/:itemId' render={(props) => (
        <ErrorBoundary>
          <Item itemId={props.match.params.itemId} />
        </ErrorBoundary>
      )} />

      <Route path='/' render={(props) => (
        <ErrorBoundary>
          <Footer/>
        </ErrorBoundary>
      )} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

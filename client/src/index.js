import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  browserHistory,
  Switch
} from 'react-router-dom';
import './assets/styles/index.scss';
import App from './App';
import HeaderNav from './Header/HeaderNav/HeaderNav';
import PageFooter from './Footer/PageFooter';
import NotFound from './Error404/NotFound';
import SignInForm from './Forms/SignInForm';
import ContactForm from './Forms/ContactForm';
import UserProfile from './Profile/UserProfile';
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      <Route path="/" component={HeaderNav} />

      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/profile/:userId" component={UserProfile} />
        <Route path="/login" component={SignInForm} />
        <Route path="/contact" component={ContactForm} />
        <Route path='*' exact={true} component={NotFound} />
      </Switch>

      <Route path="/" component={PageFooter} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

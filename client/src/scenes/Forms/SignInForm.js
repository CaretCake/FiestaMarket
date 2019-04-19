import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { authenticationService, registrationService } from '../../services/export';
import axios from 'axios';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";


export class SignInForm extends React.Component {

  constructor(props) {
    super(props);

    if (authenticationService.currentUserValue) {
      this.props.history.push('/');
    }
  }

  handleSignInSubmit = (values, {
      props = this.props,
      setSubmitting
    }) => {

    console.log('vals: ' + JSON.stringify(values.email));
    authenticationService.login(values.email, values.password)
      .then(
        user => {
          const { from } = this.props.location.state || { from: { pathname: "/" } };
          this.props.history.push(from);
        },
        error => {
          console.log(error);
        }
      );

    //done submitting, set submitting to false
    setSubmitting(false);
    return;
  }

  handleRegisterSubmit = (values, {
      props = this.props,
      setSubmitting
    }) => {

    registrationService.register(values.username, values.email, values.password)
      .then(
        result => {
          console.log('result: ' + result);
          this.props.history.push('/');
        },
        error => {
          console.log(error);
        }
      )

    //done submitting, set submitting to false
    setSubmitting(false);
    return;
  }

  render() {

    const signInSchema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email')
        .lowercase()
        .required('*'),
      password: Yup.string()
        .min(2, '')
        .required('*')
    });

    const registerSchema = Yup.object().shape({
      username: Yup.string()
        .matches(/^.[a-zA-Z0-9_]+$/, 'Only alphanumeric & underscores allowed')
        .min(5, 'Must be > 4 characters long')
        .max(12, 'Must be < 13 characters long')
        .lowercase()
        .required('*'),
      email: Yup.string()
        .email('Invalid email')
        .lowercase()
        .required('*'),
      password: Yup.string()
        .min(6, 'Must be > 6 characters long')
        .required('*'),
      confirmPassword: Yup.string()
        .required('*')
        .oneOf([Yup.ref('password')], "Passwords do not match")
    });

    return (
      <div className='form-container'>
        <Tabs>
          <TabList>
            <Tab>Sign In</Tab>
            <Tab>Register</Tab>
          </TabList>

          <TabPanel>
            <Formik
              initialValues={{
                email: '',
                password: ''
              }}
              validationSchema={signInSchema}
              onSubmit={this.handleSignInSubmit}
              render={formProps => {
                return(
                  <Form>
                    <div class='field-container'>
                      <div className='field-label-container'>
                        <label>Email Address</label>
                        <span><ErrorMessage name='email' /></span>
                      </div>
                      <Field
                        type='text'
                        name='email'
                        placeholder='Email Address'
                        className='textbox'
                      />
                    </div>
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Password</label>
                        <span><ErrorMessage name='password' /></span>
                      </div>
                      <Field
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='textbox'
                      />
                    </div>
                    <button
                      type='submit'
                      disabled={formProps.isSubmitting}>
                      Sign In
                    </button>
                  </Form>
                );
              }}
            />
          </TabPanel>
          <TabPanel>
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
              }}
              validationSchema={registerSchema}
              onSubmit={this.handleRegisterSubmit}
              render={formProps => {
                return(
                  <Form>
                    <div class='field-container'>
                      <div className='field-label-container'>
                        <label>Username</label>
                        <span><ErrorMessage name='username' /></span>
                      </div>
                      <Field
                        type='text'
                        name='username'
                        placeholder='Username'
                        className='textbox'
                      />
                    </div>
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Email Address</label>
                        <span><ErrorMessage name='email'/></span>
                      </div>
                      <Field
                        type='text'
                        name='email'
                        placeholder='Email Address'
                        className='textbox'
                      />
                    </div>
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Password</label>
                        <span><ErrorMessage name='password' /></span>
                      </div>
                      <Field
                        type='password'
                        name='password'
                        placeholder='Password'
                        className='textbox'
                      />
                    </div>
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Confirm Password</label>
                        <span><ErrorMessage name='confirmPassword' /></span>
                      </div>
                      <Field
                        type='password'
                        name='confirmPassword'
                        placeholder='Password'
                        className='textbox'
                      />
                    </div>
                    <button
                      type='submit'
                      disabled={formProps.isSubmitting}>
                      Sign In
                    </button>
                  </Form>
                );
              }}
            />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}
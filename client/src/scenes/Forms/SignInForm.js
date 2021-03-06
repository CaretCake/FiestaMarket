import React from 'react';
import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { authenticationService, registrationService } from '../../services/export';
import { signInSchema, registerSchema } from './_FormSchema';
import history from '../../helpers/history';


export class SignInForm extends React.Component {

  constructor(props) {
    super(props);

    if (authenticationService.currentUserValue) {
      history.push('/');
    }
  }

  handleSignInSubmit = (values, {
      props = this.props,
      setSubmitting,
      setFieldError
    }) => {

    authenticationService.login(values.email, values.password)
      .then(
        user => {
          if (user.message !== 'success') {
            setFieldError('email', user.message);
          } else {
            history.goBack();
          }
        })
      .catch( err => {});

    setSubmitting(false);
  };

  handleRegisterSubmit = (values, {
      props = this.props,
      setSubmitting,
      setFieldError
    }) => {

    registrationService.register(values.username, values.email, values.password)
      .then(
        result => {
          history.push('/');
        },
        error => {
          setFieldError(error.field.toLowerCase(), error.message);
        }
      );

    setSubmitting(false);
  };

  render() {
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
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Email Address</label>
                        <span><ErrorMessage name='email' /></span>
                      </div>
                      <Field
                        type='text'
                        name='email'
                        placeholder='Email Address'
                        className='text-box'
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
                        className='text-box'
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
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Username</label>
                        <span><ErrorMessage name='username' /></span>
                      </div>
                      <Field
                        type='text'
                        name='username'
                        placeholder='Username'
                        className='text-box'
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
                        className='text-box'
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
                        className='text-box'
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
                        className='text-box'
                      />
                    </div>
                    <button
                      type='submit'
                      disabled={formProps.isSubmitting}>
                      Register
                    </button>
                  </Form>
                );
              }}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}
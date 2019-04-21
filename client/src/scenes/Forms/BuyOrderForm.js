import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { ErrorMessage, Field, Form, Formik, FieldArray, getIn } from "formik";
import { orderService, authenticationService } from '../../services/export';
import { sellOrderSchema, buyOrderSchema } from "./formSchema";
import "react-tabs/style/react-tabs.css";


export class BuyOrderForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      serverValidationErrorMessage: null
    }

    if (!authenticationService.currentUserValue) {
      this.props.history.push('/');
    }
  }

  handleBuyOrderSubmit = (values, {
    props = this.props,
    setSubmitting,
    setFieldError
  }) => {

    registrationService.register(values.username, values.email, values.password)
      .then(
        result => {
          this.props.history.push('/');
        },
        error => {
          setFieldError(error.field.toLowerCase(), error.message);
          //console.log(error);
        }
      );

    setSubmitting(false);
  };

  render() {


    return (
      <div className='form-container'>
            <Formik
              initialValues={{
                openOffers: '',
                server: '',
                gemPrice: '',
                goldPrice: '',
                enhancement: '',
                stats: stats
              }}
              validationSchema={sellOrderSchema}
              onSubmit={this.handleSellOrderSubmit}
              render={formProps => {
                return(
                  <Form>
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Open to Offers</label>
                        <span><ErrorMessage name='openOffers'/></span>
                      </div>
                      <Field
                        type='checkbox'
                        name='openOffers'
                        className='checkbox'
                      />
                    </div>
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Server</label>
                        <span><ErrorMessage name='server'/></span>
                      </div>
                      <Field
                        component='select'
                        name='server'
                        className='selection'
                      >
                        <option value='Isya'>Isya</option>
                        <option value='Pagel'>Pagel</option>
                        <option value='Jenira'>Jenira</option>
                        <option value='Enid'>Enid</option>
                      </Field>
                    </div>
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Gems</label>
                        <span><ErrorMessage name='gemPrice'/></span>
                      </div>
                      <Field
                        type='number'
                        name='gemPrice'
                        className='textbox'
                      />
                    </div>
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Gold</label>
                        <span><ErrorMessage name='goldPrice'/></span>
                      </div>
                      <Field
                        type='number'
                        name='goldPrice'
                        className='textbox'
                      />
                    </div>
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Enhancement</label>
                        <span><ErrorMessage name='enhancement'/></span>
                      </div>
                      <Field
                        type='number'
                        name='enhancement'
                        className='textbox'
                      />
                    </div>
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Stats</label>
                        <span><ErrorMessage name='stats'/></span>
                      </div>

                      {/*<FieldArray
                        name='stats'
                        render={arrayHelpers => (

                          //const StatArrayErrors = errors => typeof errors.stats === 'string' ? <div>{errors.stats}</div> : null};


                          //loop through myList / any object to define our form.
                          <div>
                            {formProps.values.stats.map((stat, index) => (
                              <div key={index} className='stat-list-item field-label-container'>
                                <label>{  stat.stat }</label>
                                <span><ErrorMessage name={`stats.${index}.value`} />;</span>
                                <Field
                                  name={`stats.${index}.value`}
                                  type='number'
                                  className='textbox'
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      />*/}
                    </div>

                    <button
                      type='submit'
                      disabled={formProps.isSubmitting}>
                      Post Item
                    </button>
                  </Form>
                );
              }}
            />
          {/* <TabPanel>
            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
              }}
              validationSchema={buyOrderSchema}
              onSubmit={this.handleBuyOrderSubmit}
              render={formProps => {
                return(
                  <Form>
                    { this.state.serverValidationErrorMessage  && <ErrorMessage name='server'></ErrorMessage>}
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
                      Register
                    </button>
                  </Form>
                );
              }}
            />
          </TabPanel> */}
      </div>
    )
  }
}
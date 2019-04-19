import React from 'react';
import { Formik, FormikProps, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export class ContactForm extends React.Component {

  handleSubmit = (values, {
      props = this.props,
      setSubmitting
    }) => {

    //process form submission here


    //done submitting, set submitting to false
    setSubmitting(false);
    return;
  }

  handleChange = (e) => {

  }

  render() {
    const contactSchema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email')
        .required('*'),
      message: Yup.string()
        .min(2, '')
        .max(250, '250 character limit hit')
        .required('*')
    });

    return (
      <div class='form-container'>
        <Formik
          initialValues={{
            first_name: '',
            email: '',
            gender: ''
          }}
          validationSchema={contactSchema}
          onSubmit={this.handleSubmit}
          render={formProps => {
            return(
              <Form>
                <div className='field-container'>
                  <div className='field-label-container'>
                    <label>Reason for Contact</label>
                  </div>
                  <Field
                    component='select'
                    name='contactType'
                    className='selection'
                    >
                    <option value='feedback'>General Feedback</option>
                    <option value='bug'>Report a Bug</option>
                    <option value='question'>Ask a Question</option>
                  </Field>
                </div>
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
                    <label>Message</label>
                    <span><ErrorMessage name='message' /></span>
                  </div>
                  <Field
                    component='textarea'
                    name='message'
                    placeholder='Type your message here...'
                    className='textarea'
                    />
                </div>
                <button
                  type='submit'
                  disabled={formProps.isSubmitting}>
                    Submit Form
                </button>
              </Form>
            );
          }}
        />
      </div>
    )
  }
}
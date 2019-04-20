import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { contactSchema } from "./formSchema";

export class ContactForm extends React.Component {

  handleSubmit = (values, {
      props = this.props,
      setSubmitting
    }) => {

    //TODO: process form submission here

    setSubmitting(false);
  };

  render() {
    return (
      <div class='form-container'>
        <Formik
          initialValues={{
            email: '',
            message: ''
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
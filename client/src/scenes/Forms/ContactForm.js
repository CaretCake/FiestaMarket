import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { contactSchema } from "./_FormSchema";
import { contactFormService } from '../../services/export';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBug, faQuestion, faCommentDots } from '@fortawesome/free-solid-svg-icons';

export class ContactForm extends React.Component {

  handleSubmit = (values, {
      props = this.props,
      setSubmitting,
      resetForm
    }) => {

    setSubmitting(true);

    contactFormService.postContactFormSubmission(values.contactType, values.email, values.message)
      .then( form => {
        console.log(form);
        setSubmitting(false);
        resetForm();
        }
      );

  };

  render() {
    return (
      <div className='form-container'>
        <Formik
          initialValues={{
            contactType: 'feedback',
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
                    <label><FontAwesomeIcon icon={
                      formProps.values.contactType === 'feedback' ? faCommentDots :
                        formProps.values.contactType === 'bug' ? faBug : faQuestion
                    }/> Reason for Contact</label>
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
    );
  }
}
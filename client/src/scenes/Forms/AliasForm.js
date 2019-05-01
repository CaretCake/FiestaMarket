import React from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { authenticationService, userService } from './../../services/export';
import { aliasSchema } from './_FormSchema';
import history from './../../helpers/history';


export class AliasForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      serverValidationErrorMessage: null
    };

    if (!authenticationService.currentUserValue) {
      history.push('/login');
    }
  }

  handleAliasSubmit = (values, {
    props = this.props,
    setSubmitting
  }) => {

    let server = values.type === 'discord' ? null : values.server;

    userService.createUserAliasById(values.name, values.type, server, values.preferred, authenticationService.currentUserValue.userId)
      .then(
        result => {
          console.log('res: ' + JSON.stringify(result.alias));
          this.props.addToAliasList(result.alias);
        },
        error => {
          //console.log(error);
        }
      );

    setSubmitting(false);
  };

  render() {
    return (
      <div className='form-container alias-form'>
        <Formik
          initialValues={{
            name:'',
            type:'in-game',
            server:'N/A',
            preferred:false
          }}
          validationSchema={aliasSchema}
          onSubmit={this.handleAliasSubmit}
          render={formProps => {
            return(
                <Form>
                  <div className='field-container'>
                  <div className='field-label-container'>
                    <label>Name</label>
                    <span><ErrorMessage name='name'/></span>
                  </div>
                  <div className='icon-field-container'>
                    <Field
                      type='text'
                      name='name'
                      className='text-box'
                    />
                  </div>
                </div>
                <div className='field-container'>
                  <div className='field-label-container'>
                    <label>Type</label>
                    <span><ErrorMessage name='type'/></span>
                  </div>
                  <div className='icon-field-container'>
                    <Field
                      component='select'
                      name='type'
                      className='selection'
                    >
                      <option value='in-game'>In-Game</option>
                      <option value='discord'>Discord</option>
                    </Field>
                  </div>
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
                    <option value='N/A'>N/A</option>
                    <option value='Isya'>Isya</option>
                    <option value='Pagel'>Pagel</option>
                    <option value='Jenira'>Jenira</option>
                    <option value='Enid'>Enid</option>
                  </Field>
                </div>
                <div className='field-container'>
                  <div className='field-label-container'>
                    <label>Preferred?</label>
                    <span><ErrorMessage name='preferred'/></span>
                  </div>
                  <div className='icon-field-container'>
                    <Field
                      type='checkbox'
                      name='preferred'
                      className='selection'
                    />
                  </div>
                </div>
                <button
                  type='submit'
                  disabled={formProps.isSubmitting}>
                  Add Alias
                </button>
              </Form>
            );
          }}
        />
      </div>
    );
  }
}
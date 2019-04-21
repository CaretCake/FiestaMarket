import React from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { orderService, authenticationService } from '../../services/export';
import { sellOrderSchema } from "./formSchema";
import { Stats} from "../../helpers/export";
import history from "../../helpers/history";


export class SellOrderForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      serverValidationErrorMessage: null
    };

    if (!authenticationService.currentUserValue) {
      history.push('/login');
    }
  }

  handleSellOrderSubmit = (values, {
    props = this.props,
    setSubmitting
  }) => {

    /*orderService.postSellOrder(values.email, values.password)
      .then(
        user => {
          const { from } = this.props.location.state || { from: { pathname: "/" } };
          this.props.history.push(from);
        },
        error => {
          console.log(error);
        }
      );*/

    setSubmitting(false);
  };

  render() {
    let stats = this.props.item.StatType === 'normal' ? Stats.normalStats : Stats.prestigeStats;

    return (
      <div className='form-container order-form'>
            <Formik
              initialValues={{}}
              validationSchema={sellOrderSchema}
              onSubmit={this.handleSellOrderSubmit}
              render={formProps => {
                return(
                  <Form>
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
                    <div className='field-container checkbox-field-container'>
                      <div className='field-label-container'>
                        <label>Open to Offers</label>
                      </div>
                      <div>
                        <Field
                          type='checkbox'
                          name='openOffers'
                          className='checkbox'
                        />
                      </div>
                    </div>
                    <div class='price-field-container'>
                      <div className='field-container'>
                        <div className='field-label-container'>
                          <label>Gems</label>
                          <span><ErrorMessage name='gemPrice'/></span>
                        </div>
                        <div class='icon-field-container'>
                          <Field
                            type='number'
                            name='gemPrice'
                            className='number-field'
                          />
                          <span class='gem-icon'/>
                        </div>
                      </div>
                      <div className='field-container'>
                        <div className='field-label-container'>
                          <label>Gold</label>
                          <span><ErrorMessage name='goldPrice'/></span>
                        </div>
                        <div className='icon-field-container'>
                          <Field
                            type='number'
                            name='goldPrice'
                            className='number-field'
                          />
                          <span class='gold-icon'/>
                        </div>
                      </div>
                    </div>
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Enhancement</label>
                        <span><ErrorMessage name='enhancement'/></span>
                      </div>
                      <div className='icon-field-container'>
                        <Field
                          type='number'
                          name='enhancement'
                          className='number-field'
                        />
                        <span className='plus-icon'>+</span>
                      </div>
                    </div>
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Stats</label>
                      </div>
                    </div>

                    <div class='stat-field-container'>
                      {stats.map((statName) => {
                        return <div className='field-container' key={statName}>
                          <div className='field-label-container'>
                            <label>{statName}</label>
                            <span><ErrorMessage name={statName}/></span>
                          </div>
                          <Field
                            type='number'
                            name={statName}
                            className='number-field'
                          />
                        </div>
                      })}
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
      </div>
    )
  }
}
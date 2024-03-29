import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { orderService, authenticationService } from '../../../services/export';
import { sellOrderSchema } from '../_FormSchema';
import { getStatArray } from '../../../helpers/export';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import history from '../../../helpers/history';


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

    let price = parseFloat(values.gemPrice + '.' + values.goldPrice);

    orderService.postSellOrder(price, values.openOffers, values.server, values.enhancement, values.end, values.dex, values.int, values.str, values.spr, values.hp, values.sp, values.dmg, values.mdmg, values.def, values.mdef, values.aim, values.eva, this.props.item.ItemId)
      .then(
        order => {
          //console.log(order);
          history.push('/items/' + this.props.item.ItemId);
        },
        error => {
          //console.log(error);
        }
      );

    setSubmitting(false);
  };

  render() {
    let stats = getStatArray(this.props.item.StatType, 'lower');

    return (
      <div className='form-container order-form'>
        <h2>Sell</h2>
            <Formik
              initialValues={{
                server: 'Isya',
                openOffers: false,
                gemPrice: 0,
                goldPrice: 0,
                enhancement: 0,
                end: 0,
                dex: 0,
                int: 0,
                str: 0,
                spr: 0,
                hp: 0,
                sp: 0,
                dmg: 0,
                mdmg: 0,
                def: 0,
                mdef: 0,
                aim: 0,
                eva: 0
              }}
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
                    <div className='price-suggestion-container'>
                      Suggested Price: { this.props.suggestedPrice } G
                    </div>
                    <div className='related-field-container'>
                      <div className='field-container'>
                        <div className='field-label-container'>
                          <label>Gems</label>
                          <span><ErrorMessage name='gemPrice'/></span>
                        </div>
                        <div className='icon-field-container'>
                          <Field
                            type='number'
                            name='gemPrice'
                            className='number-field'
                          />
                          <span className='gem-icon'/>
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
                          <span className='gold-icon'/>
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
                        <FontAwesomeIcon icon={faPlus} className={'plus-icon'}/>
                      </div>
                    </div>
                    { this.props.item.StatType !== 'none' &&
                      <div className='field-container'>
                        <div className='field-label-container'>
                          <label>Stats</label>
                        </div>

                        <div className='stat-field-container'>
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
                            </div>;
                          })}
                        </div>
                      </div>
                    }
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
    );
  }
}
import React from 'react';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { orderService, authenticationService } from '../../services/export';
import { buyOrderSchema } from "./formSchema";
import {Stats} from "../../helpers/stats";
import history from "../../helpers/history";


export class BuyOrderForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      serverValidationErrorMessage: null
    };

    if (!authenticationService.currentUserValue) {
      history.push('/login');
    }
  }

  handleBuyOrderSubmit = (values, {
    props = this.props,
    setSubmitting
  }) => {

    let priceMin = parseFloat(values.gemPriceMin + '.' + values.goldPriceMin);
    let priceMax = parseFloat(values.gemPriceMax + '.' + values.goldPriceMax);

    orderService.postBuyOrder(priceMin, priceMax, values.server, values.enhancement, values.end, values.dex, values.int, values.str, values.spr, values.hp, values.sp, values.dmg, values.mdmg, values.def, values.mdef, values.aim, values.eva, this.props.item.ItemId, authenticationService.currentUserValue.userId)
      .then(
        result => {
          history.push('/items/' + this.props.item.ItemId);
        },
        error => {
          //console.log(error);
        }
      );

    setSubmitting(false);
  };

  render() {
    let stats = this.props.item.StatType === 'normal' ? Stats.normalStats : Stats.prestigeStats;

    return (
      <div className='form-container order-form'>
        <h2>Want to Buy</h2>
            <Formik
              initialValues={{
                gemPriceMin: 0,
                goldPriceMin: 0,
                gemPriceMax: 0,
                goldPriceMax: 0,
                server: 'Isya',
                enhancement: 0,
                end: 'N/A',
                dex: 'N/A',
                int: 'N/A',
                str: 'N/A',
                spr: 'N/A',
                hp: 'N/A',
                sp: 'N/A',
                dmg: 'N/A',
                mdmg: 'N/A',
                def: 'N/A',
                mdef: 'N/A',
                aim: 'N/A',
                eva: 'N/A'
              }}
              validationSchema={buyOrderSchema}
              onSubmit={this.handleBuyOrderSubmit}
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
                    <div className='price-field-container'>
                      <label>Min Price</label>
                      <div className='field-container'>
                        <div className='field-label-container'>
                          <label>Gems</label>
                          <span><ErrorMessage name='gemPriceMin'/></span>
                        </div>
                        <div className='icon-field-container'>
                          <Field
                            type='number'
                            name='gemPriceMin'
                            className='number-field'
                          />
                          <span className='gem-icon'/>
                        </div>
                      </div>
                      <div className='field-container'>
                        <div className='field-label-container'>
                          <label>Gold</label>
                          <span><ErrorMessage name='goldPriceMin'/></span>
                        </div>
                        <div className='icon-field-container'>
                          <Field
                            type='number'
                            name='goldPriceMin'
                            className='number-field'
                          />
                          <span className='gold-icon'/>
                        </div>
                      </div>
                    </div>
                    <div className='price-field-container'>
                      <label>Max Price</label>
                      <div className='field-container'>
                        <div className='field-label-container'>
                          <label>Gems</label>
                          <span><ErrorMessage name='gemPriceMax'/></span>
                        </div>
                        <div className='icon-field-container'>
                          <Field
                            type='number'
                            name='gemPriceMax'
                            className='number-field'
                          />
                          <span className='gem-icon'/>
                        </div>
                      </div>
                      <div className='field-container'>
                        <div className='field-label-container'>
                          <label>Gold</label>
                          <span><ErrorMessage name='goldPriceMax'/></span>
                        </div>
                        <div className='icon-field-container'>
                          <Field
                            type='number'
                            name='goldPriceMax'
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
                        <span className='plus-icon'>+</span>
                      </div>
                    </div>
                    <div className='field-container'>
                      <div className='field-label-container'>
                        <label>Stats</label>
                      </div>
                    </div>

                    <div className='stat-field-container'>
                      {stats.map((statName) => {
                        return <div className='field-container' key={statName}>
                          <div className='field-label-container'>
                            <label>{statName}</label>
                            <span><ErrorMessage name={statName}/></span>
                          </div>
                          <Field
                            component='select'
                            name={statName}
                            className='selection'
                          >
                            <option value='N/A'>N/A</option>
                            <option value='medium'>Medium</option>
                            <option value='high'>High</option>
                            <option value='godly'>Godly</option>
                          </Field>
                        </div>;
                      })}
                    </div>

                    <button
                      type='submit'
                      disabled={formProps.isSubmitting}>
                      Post Buy Order
                    </button>
                  </Form>
                );
              }}
            />
      </div>
    );
  }
}
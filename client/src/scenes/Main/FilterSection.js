import React from 'react';
import { orderService } from '../../services/export';
import { handleResponse } from '../../helpers/export';
import { ErrorMessage, Field, Form, Formik } from "formik";
import { contactSchema } from "../Forms/_FormSchema";
import { ItemInfo, Classes } from "../../helpers/export";

export class FilterSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [
        {priceMin: 0},
        {priceMax: 1},
        {levelMin: 0},
        {levelMax: 1}
      ]
    };
  }

  getOrderLists() {
    orderService.getAll()
      .then(handleResponse())
      .then(orderInfoFromApi => {
        this.setState({sellOrders: orderInfoFromApi[0].data});
        this.setState({buyOrders: orderInfoFromApi[1].data});
      })
      .catch(err => { console.log('err: ' + err); });
  }


  handleChange = (name, e) => {
    //console.log(this.props.sellOrders);
    //console.log(e.target.value);
    let tempFilters = [...this.state.filters];
    tempFilters[name] = e.target.value;
    this.setState({ filters: tempFilters  }, this.filter);
  };

  filter() {
    console.log(this.state.filters);
    let tempFilteredData = this.props.savedSellOrders.filter((value, index, arr) => {
      console.log(value.Price);
      if (parseFloat(this.state.filters.levelMin) > parseFloat(this.state.filters.levelMax) || parseFloat(this.state.filters.priceMin) > parseFloat(this.state.filters.priceMax)) {
        return false;
      }
      // if minlevel set and < min level, false
      else if (parseFloat(this.state.filters.levelMin) !== 0 && parseFloat(value.PostedItem.Level) < parseFloat(this.state.filters.levelMin)) {
        return false;
      }
      // if maxlevel set and > max level, false
      else if (parseFloat(this.state.filters.levelMax) !== 0 && parseFloat(value.PostedItem.Level) > parseFloat(this.state.filters.levelMax)) {
        return false;
      }
      // if minprice set and < min price, false
      else if (parseFloat(this.state.filters.priceMin) !== 0 && parseFloat(value.Price) < parseFloat(this.state.filters.priceMin)) {
        return false;
      }
      // if maxprice set and > max price, false
      else if (parseFloat(this.state.filters.priceMax) !== 0 && parseFloat(value.Price) > parseFloat(this.state.filters.priceMax)) {
        return false;
      }
      return true;
    });
    //console.log(JSON.stringify(tempFilteredData));
    this.props.handleFilter(tempFilteredData);
  };

  render() {
    return (
      <div className='form-container filter-section'>

        <div className='related-field-container'>
          <div className='field-container'>
            <div className='icon-field-container'>
              <label>Min Price</label>
              <input type='number' name='priceMin' value={ this.state.priceMin } onChange={ (e) => this.handleChange("priceMin", e) }  min={0} max={99999} placeholder={0}/>
              <span className='gem-icon'/>
            </div>
          </div>
          <div className='field-container'>
            <div className='icon-field-container'>
              <label>Max Price</label>
              <input type='number' name='priceMax' value={ this.state.priceMax } onChange={ (e) => this.handleChange("priceMax", e) } min={1} max={99999} placeholder={'MAX'}/>
              <span className='gem-icon'/>
            </div>
          </div>
        </div>

        <div className='related-field-container'>
          <div className='field-container'>
            <div className='icon-field-container'>
              <label>Min Level</label>
              <input type='number' name='levelMin' value={ this.state.levelMin } onChange={ (e) => this.handleChange("levelMin", e) }  min={0} max={99999} placeholder={0}/>
            </div>
          </div>
          <div className='field-container'>
            <div className='icon-field-container'>
              <label>Max Level</label>
              <input type='number' name='levelMax' value={ this.state.levelMax } onChange={ (e) => this.handleChange("levelMax", e) } min={1} max={99999} placeholder={'MAX'}/>
            </div>
          </div>
        </div>

        {/*<Formik
          initialValues={{
            minLevel: '',
            maxLevel: '',
            priceMax: '',
            priceMin: '',
            server: 'None',
            class: 'All',
            type: '',
            rarityCheckboxGroup: []
          }}
          onSubmit={values => this.props.onFormSubmit(values)}
          render={({
            handleSubmit,
            handleChange,
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched,
            isSubmitting
          }) => {
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
                    <option value='None'>Select server...</option>
                    <option value='Isya'>Isya</option>
                    <option value='Pagel'>Pagel</option>
                    <option value='Jenira'>Jenira</option>
                    <option value='Enid'>Enid</option>
                  </Field>
                </div>
                <div className='field-container'>
                  <div className='field-label-container'>
                    <label>Class</label>
                    <span><ErrorMessage name='class' /></span>
                  </div>
                  <Field
                    component='select'
                    name='class'
                    className='selection'
                  >
                    <option value='All'>Select class...</option>;
                    {Classes.classes.map((className) => {
                      return <option value={className} key={className}>{className}</option>;
                    })}
                  </Field>
                </div>
                <div className='field-container'>
                  <div className='field-label-container'>
                    <label>Type</label>
                    <span><ErrorMessage name='type' /></span>
                  </div>
                  <Field
                    component='select'
                    name='type'
                    className='selection'
                  >
                    <option value='None'>Select item type...</option>;
                    {ItemInfo.itemTypes.map((type) => {
                      return <option value={type} key={type}>{type}</option>;
                    })}
                  </Field>
                </div>
                <div className='related-field-container'>
                  <div className='field-label-container'>
                    <label>Level</label>
                    <span><ErrorMessage name='minLevel' /></span>
                  </div>
                  <Field
                    type='number'
                    name='minLevel'
                    placeholder='Min level'
                    className='number-field'
                  />
                  <div className='field-label-container'>
                    <label>Max Level</label>
                    <span><ErrorMessage name='maxLevel' /></span>
                  </div>
                  <Field
                    type='number'
                    name='maxLevel'
                    placeholder='Max level'
                    className='number-field'
                  />
                </div>
                <div className='related-field-container'>
                  <label>Min Price</label>
                  <div className='field-container'>
                    <div className='field-label-container'>
                      <label>Min Gem Price</label>
                      <span><ErrorMessage name='priceMin'/></span>
                    </div>
                    <div className='icon-field-container'>
                      <Field
                        type='number'
                        name='priceMin'
                        className='number-field'
                      />
                      <span className='gem-icon'/>
                    </div>
                  </div>
                  <div className='field-container'>
                    <div className='field-label-container'>
                      <label>Max Gem Price</label>
                      <span><ErrorMessage name='priceMax'/></span>
                    </div>
                    <div className='icon-field-container'>
                      <Field
                        type='number'
                        name='priceMax'
                        className='number-field'
                      />
                      <span className='gem-icon'/>
                    </div>
                  </div>
                </div>
                <button
                  type='submit'>
                  Submit Form
                </button>
              </Form>
            );
          }}
        />*/}
      </div>
    );
  }
}
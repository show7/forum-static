import {DatePicker, RaisedButton, TextField} from 'material-ui';
import { formatDate } from 'utils/helpers'
import extend = require("lodash/extend");
import * as React from 'react';

export default class addCoupon extends React.Component{
  constructor(){
    super();
    this.state = {
        id: [],
        price: 0,
        endDate: null
    };
  }

  handleAddCoupon(){
    console.log(this.state);
  }

  render(){
    return (
      <div>
        <DatePicker hintText={"选择优惠券的截止日期"} formatDate={(date) => {formatDate(date, 'yyyy-mm-dd')}} defaultDate={false}
                    onChange={(e, v) => {this.setState({endDate:  formatDate(v, 'yyyy-mm-dd')})}}/>
        <TextField hintText={"优惠券金额"} onChange={(e, v) => {this.setState({price: v})}}/>
        <TextField hintText={"输入要赠与的学员Id"} multiLine={true} onChange={(e, v) => {this.setState({id: v.split("\n")})}}/>
        <RaisedButton label={"提交"} onClick={() => this.handleAddCoupon()} primary={true}/>
      </div>
    );
  }
}

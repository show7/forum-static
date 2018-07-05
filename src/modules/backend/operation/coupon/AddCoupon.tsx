import {DatePicker, RaisedButton, TextField} from 'material-ui';
import { formatDate } from 'utils/helpers'
import * as React from 'react';
import './AddCoupon.less';

export default class AddCoupon extends React.Component{
  constructor(){
    super();
    this.state = {
        riseId: [],
        amount: 0,
        expired: null
    };
  }

  handleAddCoupon(){
    let temp = this.state.riseId;
    temp = temp.filter((val, index) => {return val != ""});
    this.setState({riseId: temp});
  }

  render(){
    return (
      <div className="add-coupon-container">
        <DatePicker hintText={"选择优惠券的截止日期"} formatDate={(date) => { return formatDate(date, 'yyyy-MM-dd')}}
                    onChange={(e, v) => {this.setState({endDate:  formatDate(v, 'yyyy-MM-dd')})}}/>
        <br/>
        <TextField hintText={"优惠券金额"} onChange={(e, v) => {this.setState({price: v})}}/>
        <br/>
        <TextField hintText={"输入要赠与的学员Id"} multiLine={true} onChange={(e, v) => {this.setState({riseId: v.split("\n")})}}/>
        <br/>
        <RaisedButton label={"提交"} onClick={() => this.handleAddCoupon()} primary={true}/>
      </div>
    );
  }
}

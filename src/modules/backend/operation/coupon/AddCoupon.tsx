import {DatePicker, RaisedButton, TextField} from 'material-ui';
import { formatDate } from 'utils/helpers'
import * as React from 'react';
import './AddCoupon.less';
import {addCoupon} from '../async';
import {connect} from 'react-redux';
import {alertMsg} from '../../../../redux/actions';

@connect(state => state)
export default class AddCoupon extends React.Component{
  constructor(){
    super();
    this.state = {
        riseIdList: [],
        amount: 0,
        expired: null,
        description: null
    };
  }

  handleAddCoupon(){
    let temp = this.state.riseIdList;
    temp = temp.filter((val, index) => {return val != ""});
    this.setState({riseIdList: temp}, () =>{
        console.log(this.state);
        const {riseIdList, amount, expired, description} = this.state;
        const {dispatch} = this.props;
        if(riseIdList.length == 0 || expired == null || description == null) {
          dispatch(alertMsg("请填写信息完整"));
          return;
        }
        if(parseInt(amount) <= 0 ) {
          dispatch(alertMsg("优惠券金额要大于零"));
          return;
        }
        addCoupon(riseIdList, amount, expired, description).then(res => {
            if(res.code == "200"){
                dispatch(alertMsg("插入优惠券成功"));
            }else{
                dispatch(alertMsg(res.msg));
            }
        }).catch(e => {dispatch(alertMsg(e))});
    });
  }

  render(){
    return (
      <div className="add-coupon-container">
        <DatePicker hintText={"选择优惠券的截止日期"} formatDate={(date) => { return formatDate(date, 'yyyy-MM-dd')}}
                    onChange={(e, v) => {this.setState({expired:  formatDate(v, 'yyyy-MM-dd')})}}/>
        <br/>
        <TextField hintText={"优惠券金额"} onChange={(e, v) => {this.setState({amount: v})}}/>
        <br/>
        <TextField hintText={"优惠券描述"} onChange={(e, v) =>{this.setState({description: v})}}/>
        <br/>
        <TextField hintText={"输入要赠与学员的圈外id"} multiLine={true} onChange={(e, v) => {this.setState({riseIdList: v.split("\n")})}}/>
        <br/>
        <RaisedButton label={"提交"} onClick={() => this.handleAddCoupon()} primary={true}/>
      </div>
    );
  }
}

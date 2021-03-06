import * as React from "react"
import { connect } from "react-redux"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { refund } from "./async"
import { RaisedButton, TextField, SelectField, MenuItem } from 'material-ui'
import Confirm from '../../../components/Confirm'

@connect(state => state)
export default class Refund extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      orderId: '',
      fee: '',
      expired: null,
      alert: false,
    }
  }

  onSubmit() {
    this.setState({ alert: true })
  }

  submit() {
    const { fee, orderId, expired } = this.state
    const { dispatch } = this.props
    this.setState({ alert: false })
    if(!orderId) {
      dispatch(alertMsg('请输入订单号'))
      return
    }

    if(!fee) {
      dispatch(alertMsg('请输入退款费用'))
      return
    }

    if(expired == null) {
      dispatch(alertMsg('请选择是否关闭会员'))
      return
    }

    const param = { fee, orderId, expired }
    refund(param).then(res => {
      if(res.code === 200) {
        dispatch(alertMsg('退款成功'))
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => {
      dispatch(alertMsg(e))
    })
  }

  chooseExpired(expired) {
    if(expired) {
      this.setState({ expired })
    } else {
      this.setState({ expired })
    }
  }

  render() {
    const { alert } = this.state;

    const actions = [
      {
        "label": "确定",
        "onClick": () => this.submit(),
      },
      {
        "label": "取消",
        "onClick": () => this.setState({ alert: false }),
        "primary": true,
      }
    ]

    return (
      <div className="backend-refund" style={{marginLeft:20}}>
        <TextField
          floatingLabelText="输入订单号"
          multiLine={true}
          onChange={(ev, value) => {
                this.setState({ orderId: value })
              }}
        /><br/>

        <TextField
          floatingLabelText="输入退款金额"
          onChange={(ev, value) => {
                this.setState({ fee: value })
              }}
        /><br/>

        <SelectField value={this.state.expired}
                     floatingLabelText="是否保留会员"
                     onChange={(e, idx, value) => this.chooseExpired(value)}>
          <MenuItem key={1} value={true} primaryText="关闭会员"/>
          <MenuItem key={2} value={false} primaryText="保留会员"/>
        </SelectField>

        <Confirm content="确定要退款吗？" open={alert} actions={actions}/>

        <RaisedButton
          className="submit-btn" label="申请退款" primary={true}
          onTouchTap={()=>this.onSubmit()}/>
      </div>
    )
  }
}

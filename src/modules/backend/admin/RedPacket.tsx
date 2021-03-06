import * as React from "react"
import { connect } from "react-redux"
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { sendRedPacket, refreshStock, sendStock } from "./async"
import { RaisedButton, TextField, SelectField, MenuItem } from 'material-ui'
import Confirm from '../../../components/Confirm'

@connect(state => state)
export default class RedPacket extends React.Component {
  constructor() {
    super();
    this.state = {
      actName: '',
      totalAmount: 0,
      wishing: '',
      sendName: '',
      riseIds: '',
      sceneId: '',
      alert: false,
    }
  }

  onSubmit() {
    const { actName, totalAmount, wishing, sendName, profileId, sceneId } = this.state;
    const { dispatch } = this.props;
    let param = { actName, totalAmount, wishing, sendName, profileId, sceneId };
    if(!actName) {
      dispatch(alertMsg("请输入活动名"))
      return;
    }
    if(!sceneId) {
      dispatch(alertMsg("请输入场景值"));
      return;
    }

    if(!totalAmount) {
      dispatch(alertMsg("请输入红包金额"))
      return;
    }

    if(!wishing) {
      dispatch(alertMsg("请输入祝福语"))
      return;
    }
    if(!sendName) {
      dispatch(alertMsg("请输入发送人"))
      return;
    }
    if(!profileId) {
      dispatch(alertMsg("请输入红包接受者"))
      return;
    }
    dispatch(startLoad());
    sendRedPacket(param).then(res => {
      if(res.code === 200) {
        dispatch(endLoad());
        dispatch(alertMsg("发送成功"));
      } else {
        dispatch(endLoad());
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  onClickRefreshStock() {
    const { dispatch } = this.props;
    dispatch(startLoad());
    refreshStock().then(res => {
      if(res.code === 200) {
        dispatch(endLoad());
        dispatch(alertMsg("开始刷新分红信息"));
      } else {
        dispatch(endLoad());
        dispatch(alertMsg(res.msg));
      }
    }).catch(e => {
      dispatch(endLoad());
      dispatch(alertMsg(e));
    })
  }

  onClickSendStock() {
    const { actName, totalAmount, wishing, sendName, profileId, sceneId } = this.state;
    const { dispatch } = this.props;
    let param = { actName, totalAmount, wishing, sendName, profileId, sceneId };
    if(!actName) {
      dispatch(alertMsg("请输入活动名"))
      return;
    }
    if(!sceneId) {
      dispatch(alertMsg("请输入场景值"));
      return;
    }
    if(!wishing) {
      dispatch(alertMsg("请输入祝福语"))
      return;
    }
    if(!sendName) {
      dispatch(alertMsg("请输入发送人"))
      return;
    }
    dispatch(startLoad());
    sendStock(param).then(res => {
      if(res.code === 200) {
        dispatch(endLoad());
        dispatch(alertMsg("发送成功"));
      } else {
        dispatch(endLoad());
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
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
      <div className="red-packet">
        <br/><br/>
        <h3>发送红包给股东</h3><br/>
        <RaisedButton
          className="submit-btn" label="刷新分红信息" primary={true}
          onTouchTap={() => this.onClickRefreshStock()}/><br/>
        <RaisedButton
          className="submit-btn" label="发送红包给所有股东" primary={true}
          onTouchTap={() => this.onClickSendStock()}/><br/>

        <TextField
          floatingLabelText="请输入活动id"
          multiLine={false}
          onChange={(ev, value) => {
            this.setState({ actName: value })
          }}
        /><br/>

        <TextField
          floatingLabelText="请输入场景值"
          multiLine={false}
          onChange={(ev, value) => {
            this.setState({ sceneId: value })
          }}
        /><br/>

        <TextField
          floatingLabelText="请输入红包金额"
          multiLine={false}
          onChange={(ev, value) => {
            this.setState({ totalAmount: value })
          }}
        /><br/>

        <TextField
          floatingLabelText="请输入祝福语"
          multiLine={true}
          onChange={(ev, value) => {
            this.setState({ wishing: value })
          }}
        /><br/>

        <TextField
          floatingLabelText="请输入发送者名字"
          multiLine={true}
          onChange={(ev, value) => {
            this.setState({ sendName: value })
          }}
        /><br/>

        <TextField
          floatingLabelText="需要发送的ProfileId"
          multiLine={true}
          onChange={(ev, value) => {
            this.setState({ profileId: value })
          }}
        /><br/>

        <Confirm content="确定要发送么？" open={alert} actions={actions}/>

        <RaisedButton
          className="submit-btn" label="发红包" primary={true}
          onTouchTap={() => this.onSubmit()}/>
      </div>
    )
  }
}

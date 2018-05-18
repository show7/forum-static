import * as React from 'react'
import './ActivityFlowDetail.less'
import { TextField, DatePicker, TimePicker, RaisedButton } from 'material-ui'
import { formatDate } from '../../../../utils/helpers'
import { insertActivityFlow, updateActivityFlow } from '../async'
import requestProxy from '../../../../components/proxy/requestProxy'

export default class ActivityFlowDetail extends React.Component {

  constructor () {
    super()
    this.state = {
      id: -1,
    }
  }

  componentWillMount () {
    this.setState(this.props.data)
  }

  componentWillReceiveProps (nextProps) {
    this.props = nextProps
    this.setState(this.props.data)
  }

  async handleSubmit () {
    const {
      id,
    } = this.state
    if (!this.state.sequence) {
      this.state.sequence = 0
    }
    if (id > 0) {
      let updateRes = await updateActivityFlow(this.state)
      this.props.requestClose()
      if (updateRes.code === 200) {
        requestProxy.alertMessage('更新活动信息成功')
      }
    } else {
      let insertRes = await insertActivityFlow(this.state)
      this.props.requestClose()
      if (insertRes.code === 200) {
        requestProxy.alertMessage('插入活动信息成功')
      }
    }
  }

  render () {
    const {
      name,
      holder,
      location,
      thumbnail,
      startTime,
      endTime,
      status,
      vipSaleLinkUrl,
      guestSaleLinkUrl,
      linkUrl,
      sequence,
    } = this.state

    return (
      <div className="activity-flow-detail-component">
        <TextField floatingLabelText="活动名称"
                   defaultValue={name}
                   onChange={(e, v) => this.setState({ name: v })}/>
        <br/>
        <TextField floatingLabelText="活动举办人"
                   defaultValue={holder}
                   onChange={(e, v) => this.setState({ holder: v })}/>
        <br/>
        <TextField floatingLabelText="活动举办地点"
                   defaultValue={location}
                   onChange={(e, v) => this.setState({ location: v })}/>
        <br/>
        <TextField floatingLabelText="缩略图"
                   defaultValue={thumbnail}
                   onChange={(e, v) => this.setState({ thumbnail: v })}/>
        <br/>
        <TextField floatingLabelText="开始时间，（2018-01-01 11:00:00）"
                   defaultValue={formatDate(new Date(startTime || 0), 'yyyy-MM-dd hh:mm:ss')}
                   onChange={(e, v) => this.setState({ startTime: new Date(v) })}/>
        <br/>
        <TextField floatingLabelText="结束时间，（2018-01-01 11:00:00）"
                   defaultValue={formatDate(new Date(endTime || 0), 'yyyy-MM-dd hh:mm:ss')}
                   onChange={(e, v) => this.setState({ endTime: new Date(v) })}/>
        <br/>
        <TextField floatingLabelText="1-准备中, 2-已关闭报名, 3-回顾"
                   defaultValue={status}
                   onChange={(e, v) => this.setState({ status: v })}/>
        <br/>
        <TextField floatingLabelText="会员售卖链接"
                   defaultValue={vipSaleLinkUrl}
                   onChange={(e, v) => this.setState({ vipSaleLinkUrl: v })}/>
        <br/>
        <TextField floatingLabelText="普通用户售卖链接"
                   defaultValue={guestSaleLinkUrl}
                   onChange={(e, v) => this.setState({ guestSaleLinkUrl: v })}/>
        <br/>
        <TextField floatingLabelText="活动链接"
                   defaultValue={linkUrl}
                   onChange={(e, v) => this.setState({ linkUrl: v })}/>
        <br/>
        <TextField floatingLabelText="次序"
                   defaultValue={sequence}
                   onChange={(e, v) => this.setState({ sequence: v })}/>
        <br/><br/>
        <section>
          <RaisedButton label="提交"
                        onClick={() => {
                          this.handleSubmit()
                        }}/>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <RaisedButton label="取消"
                        onClick={() => this.props.requestClose()}/>
        </section>
      </div>
    )
  }

}

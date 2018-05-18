import * as React from 'react'
import './LiveFlowDetail.less'
import { TextField, DatePicker, TimePicker, RaisedButton } from 'material-ui'
import { formatDate } from '../../../../../utils/helpers'
import { insertLivesFlow, updateLivesFlow } from '../async'
import requestProxy from '../../../../../components/proxy/requestProxy'

export default class LiveFlowDetail extends React.Component {

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
      let updateRes = await updateLivesFlow(this.state)
      this.props.requestClose()
      if (updateRes.code === 200) {
        requestProxy.alertMessage('更新直播信息成功')
      }
    } else {
      let insertRes = await insertLivesFlow(this.state)
      this.props.requestClose()
      if (insertRes.code === 200) {
        requestProxy.alertMessage('插入直播信息成功')
      }
    }
  }

  render () {
    const {
      name,
      speaker,
      speakerDesc,
      speakerIntro,
      liveDesc,
      thumbnail,
      banner,
      startTime,
      endTime,
      linkUrl,
      sequence,
      password,
    } = this.state

    return (
      <div className="live-flow-detail-component">
        <TextField floatingLabelText="直播名称"
                   defaultValue={name}
                   onChange={(e, v) => this.setState({ name: v })}/>
        <br/>
        <TextField floatingLabelText="主讲人名称"
                   defaultValue={speaker}
                   onChange={(e, v) => this.setState({ speaker: v })}/>
        <br/>
        <TextField multiLine={true}
                   floatingLabelText="主讲人描述（直播详情页面）"
                   defaultValue={speakerDesc}
                   onChange={(e, v) => this.setState({ speakerDesc: v })}/>
        <br/>
        <TextField multiLine={true}
                   floatingLabelText="主讲人简介（列表页面）"
                   defaultValue={speakerIntro}
                   onChange={(e, v) => this.setState({ speakerIntro: v })}/>
        <br/>
        <TextField multiLine={true}
                   floatingLabelText="直播简介"
                   defaultValue={liveDesc}
                   onChange={(e, v) => this.setState({ liveDesc: v })}/>
        <br/>
        <TextField floatingLabelText="缩略图链接"
                   defaultValue={thumbnail}
                   onChange={(e, v) => this.setState({ thumbnail: v })}/>
        <br/>
        <TextField floatingLabelText="大展示图，详情页面 Banner 链接"
                   defaultValue={banner}
                   onChange={(e, v) => this.setState({ banner: v })}/>
        <br/>
        <TextField floatingLabelText="开始时间，（2018-01-01 11:00:00）"
                   defaultValue={formatDate(new Date(startTime || 0), 'yyyy-MM-dd hh:mm:ss')}
                   onChange={(e, v) => this.setState({ startTime: new Date(v) })}/>
        <br/>
        <TextField floatingLabelText="结束时间，（2018-01-01 11:00:00）"
                   defaultValue={formatDate(new Date(endTime || 0), 'yyyy-MM-dd hh:mm:ss')}
                   onChange={(e, v) => this.setState({ endTime: new Date(v) })}/>
        <br/>
        <TextField floatingLabelText="链接地址"
                   defaultValue={linkUrl}
                   onChange={(e, v) => this.setState({ linkUrl: v })}/>
        <br/>
        <TextField floatingLabelText="排序"
                   defaultValue={sequence}
                   onChange={(e, v) => this.setState({ sequence: v })}/>
        <br/>
        <TextField floatingLabelText="密码"
                   defaultValue={password}
                   onChange={(e, v) => this.setState({ password: v })}/>
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

import * as React from 'react'
import { connect } from 'react-redux'
import { RaisedButton, TextField } from 'material-ui'
import { alertMsg, startLoad, endLoad } from '../../../../redux/actions'
import { sendCustomerMsg } from '../async'
import './SendTemplate.less'
import * as _ from 'lodash'
import Confirm from '../../../../components/Confirm'

@connect(state => state)
export default class SendTemplate extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      comment: '',
      message: '',
      openids: '',
      showConfirm: false,
      showConfirmModal: {
        title: '提示',
        content: '已经和开发人员确认客服消息内容无误？',
        actions: [ {
          label: '已确认',
          onClick: () => {
            this.setState({ showConfirm: false })
            this.sendTemplate()
          }
        },
          {
            label: '取消',
            onClick: () => this.setState({ showConfirm: false })
          }
        ]
      }
    }
  }

  sendTemplateToMime = () => {
    const { dispatch } = this.props
    const { openids, message, comment } = this.state
    if(_.isEmpty(comment) || _.isEmpty(message)) {
      dispatch(alertMsg('请将信息填写完成'))
      return
    }

    let param = {
      message,
      comment,
      openids,
      isMine: true
    }
    dispatch(startLoad())
    sendCustomerMsg(param).then(res => {
      dispatch(endLoad())
      dispatch(alertMsg(res.msg))
    }).catch(e => {
      alertMsg(e)
    })

  }

  sendTemplate = () => {
    const { dispatch } = this.props
    const { openids, message, comment } = this.state
    if(_.isEmpty(comment) || _.isEmpty(message) || _.isEmpty(openids)) {
      dispatch(alertMsg('请将信息填写完成'))
      return
    }

    let param = {
      message,
      comment,
      openids,
      isMine: false
    }
    dispatch(startLoad())
    sendCustomerMsg(param).then(res => {
      dispatch(endLoad())
      dispatch(alertMsg(res.msg))
    })
  }

  render() {
    const { openids, message, comment } = this.state

    const renderSendInfo = () => {
      return (
        <div>
          <div>
            <TextField hintText='请输入消息用途(中文)' value={comment} onChange={(e, v) => this.setState({
                comment: v
              })}/>
          </div>
          <div>
              <textarea style={{ height: '200px' }} placeholder='请输入内容（如果会用到xxx这种指代用户昵称的内容请替换为{username}）'
                        className='comment-container' value={message}
                        onChange={(e, v) => this.setState({ message: e.target.value })}></textarea>
          </div>
          <div>
              <textarea placeholder='请输入发送人员的openid（用换行符隔开）' className='comment-container' value={openids}
                        onChange={(e, v) => this.setState({ openids: e.target.value })}/>
          </div>
        </div>
      )
    }

    const renderSendBtn = () => {
      return (
        <div>
          <RaisedButton
            style={{ marginLeft: 30 }}
            label="发送给自己" primary={true}
            onClick={() => {
                this.sendTemplateToMime()
              }}/>
          <RaisedButton
            style={{ marginLeft: 30 }}
            label="发送客服消息" primary={true}
            onClick={() => {

                this.setState({ showConfirm: true })
              }}/>
        </div>
      )
    }

    return (

      <div className="template-container">
        <div className="title-container">发送客服消息</div>
        {renderSendInfo()}
        {renderSendBtn()}
        <Confirm open={this.state.showConfirm} {...this.state.showConfirmModal}
                 handlerClose={() => this.setState({ showConfirmModal: false })}/>
      </div>
    )
  }

}

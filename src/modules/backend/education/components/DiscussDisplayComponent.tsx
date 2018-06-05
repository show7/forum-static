/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：forum-static
 2. 文件功能：评论内容展示组件
 3. 作者： duanxianfeng@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

import * as React from 'react'
import './DiscussDisplayComponent.less'
import Discuss from '../../../fragment/components/Discuss'
import { Dialog, RaisedButton } from 'material-ui'

export default class DiscussDisplayComponent extends React.Component {

  constructor() {
    super()
    this.state = {
      show: true,
      showDialog: false,
      dialogContent: '',
      actions: [],
      replyValue: '',
      showDiscuss: false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount() {
    this.setState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.discuss !== this.props.discuss) {
      this.setState({
        discuss: nextProps.discuss,
      })
    }
  }

  handleOpenPriorityDialog(discuss) {
    this.setState({
      showDialog: true,
      dialogContent: discuss.priority ? '确认将该评论取消加精么' : '确认将该条评论进行加精么',
      actions: [
        <RaisedButton label={'取消'}
                      onClick={() => this.setState({ showDialog: false })}/>,
        <RaisedButton label={'确认'}
                      primary={true}
                      style={{ marginLeft: '20px' }}
                      onClick={() => {
                        this.togglePriority(discuss)
                        this.setState({ showDialog: false })
                      }}/>,
      ],
    })
  }

  async togglePriority(discuss) {
    const {
      clickVote = (discussId, priority) => {
      },
    } = this.props
    let res = await clickVote(discuss.id, !discuss.priority)
    if(res.code === 200) {
      let targetDiscuss = JSON.parse(JSON.stringify(discuss))
      targetDiscuss.priority = !discuss.priority
      this.setState({
        discuss: targetDiscuss,
      })
    }
  }

  async onSubmit () {
    const { discuss, replyValue } = this.state;
    const { reply = (discussId, priority) => {
      }
    } = this.props;
    let res = await reply(discuss.id, replyValue)
    if(res.code === 200) {
      let targetDiscuss = JSON.parse(JSON.stringify(discuss))
      targetDiscuss.replied = true
      this.setState({
        discuss: targetDiscuss,
        showDiscuss: false
      })
    }
  }

  onChange (v) {
    this.setState({
      replyValue: v,
    })
  }


  render() {
    const {
      discuss,
      dialogContent,
      actions,
      showDialog,
      showDiscuss,
    } = this.state

    if(!this.state.show) {
      return null
    }

    const replyComponent = () => {
      if(discuss.replied) {
        return (<div className="replied">已回复</div>)
      }else{
        return (
          <div className="vote"
               onClick={() => this.setState({showDiscuss:true})}>
            回复</div>
        )
      }
    }

    return (
      <div className="discuss-item">
        <img className="head-image"
             src={discuss.avatar}></img>
        <span className="nickname">{discuss.name}</span>
        <span className="submit-time">{discuss.publishTime}</span>
        <div className="comment">{discuss.comment}</div>
        {discuss.repliedName && !showDiscuss &&
          <div className="reply-comment">
            <span className="replied-name">{'回复' + discuss.repliedName + "："}</span>
            <div className="comment">{discuss.repliedComment}</div>
          </div>
        }
        {
          showDiscuss && <Discuss isReply={false}
                 placeholder={`在这里和大家讨论吧（限1000字）`}
                 submit={() => this.onSubmit()}
                 limit={1000}
                 onChange={(v) => this.onChange(v)}
                 showCancelBtn={false}/>
        }
        {
          <div className="vote"
               onClick={() => this.handleOpenPriorityDialog(discuss)}>{discuss.priority ? '取消加精' : '加精'}</div>
        }
        {
          replyComponent()
        }
        <Dialog open={showDialog}
                title={dialogContent}
                actions={actions}/>
      </div>
    )
  }

}

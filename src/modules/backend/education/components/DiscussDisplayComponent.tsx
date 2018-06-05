/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：forum-static
 2. 文件功能：评论内容展示组件
 3. 作者： duanxianfeng@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

import * as React from 'react'
import './DiscussDisplayComponent.less'
import { deleteKnowledgeDiscuss } from '../../../fragment/knowledge/async'
import proxy from '../../../../components/proxy/requestProxy'
import { voteKnowledgeDiscuss } from '../knowledge/async'
import { Dialog, RaisedButton } from 'material-ui'

export default class DiscussDisplayComponent extends React.Component {

  constructor() {
    super()
    this.state = {
      show: true,
      showDialog: false,
      dialogContent: '',
      actions: [],
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
    let res = await voteKnowledgeDiscuss(discuss.id, !discuss.priority)
    if(res.code === 200) {
      let targetDiscuss = JSON.parse(JSON.stringify(discuss))
      targetDiscuss.priority = !discuss.priority
      this.setState({
        discuss: targetDiscuss,
      })
    }
  }

  handleOpenDeleteDialog(discuss) {
    this.setState({
      showDialog: true,
      dialogContent: '确认删除该条评论么',
      actions: [
        <RaisedButton label={'取消'}
                      onClick={() => this.setState({ showDialog: false })}/>,
        <RaisedButton label={'确认'}
                      primary={true}
                      style={{ marginLeft: '20px' }}
                      onClick={() => {
                        this.deleteKnowledgeDiscuss(discuss)
                        this.setState({ showDialog: false })
                      }}/>,
      ],
    })
  }

  async deleteKnowledgeDiscuss(discuss) {
    let res = await deleteKnowledgeDiscuss(discuss.id)
    if(res.code === 200) {
      proxy.alertMessage('删除成功')
      this.setState({
        show: false,
      })
    }
  }

  handleGoReplyPage(id) {
    window.open(`/backend/knowledge/discuss/reply?discussId=${id}`, '_blank')
  }

  render() {
    const {
      clickVote = () => {
      },
    } = this.props

    const {
      discuss,
      dialogContent,
      actions,
      showDialog,
    } = this.state

    if(!this.state.show) {
      return null
    }

    const replyComponent = () => {
      if(discuss.replied) {
        return (<div className="replied">已回复</div>)
      }

      if(discuss.commentType === 2 && !discuss.repliedId) {
        return (
          <div className="vote"
               onClick={() => this.handleGoReplyPage(discuss.id)}>
            回复</div>
        )
      }

      return null
    }

    return (
      <div className="discuss-item">
        <img className="head-image"
             src={discuss.avatar}></img>
        <span className="nickname">{discuss.name}</span>
        <span className="submit-time">{discuss.publishTime}</span>
        <div className="comment">{discuss.comment}</div>
        {discuss.repliedName &&
          <div className="reply-comment">
            <span className="replied-name">{'回复' + discuss.repliedName + "："}</span>
            <div className="comment">{discuss.repliedComment}</div>
          </div>
        }
        {
          <div className="vote"
               onClick={() => this.handleOpenPriorityDialog(discuss)}>{discuss.priority ? '取消加精' : '加精'}</div>
        }
        {
          replyComponent()
        }
        {
          discuss.isMine &&
          <div className="vote"
               onClick={() => this.handleOpenDeleteDialog(discuss)}>删除</div>
        }
        <Dialog open={showDialog}
                title={dialogContent}
                actions={actions}/>
      </div>
    )
  }

}

import * as React from 'react'
import './ShowApplication.less'
import * as _ from 'lodash'
import { connect } from 'react-redux'
import { loadApplicationSubmit } from '../async'
import {
  vote,
  loadComments,
  submitComment,
  submitReplyComment,
  VoteType,
  CommentType,
  requestAsstComment,
  deleteComment
} from '../async'
import { set, startLoad, endLoad, alertMsg } from '../../../redux/actions'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import CommentList from '../../../components/CommentList'
import { imgSrc } from '../../../utils/imgSrc'
import Snackbar from 'material-ui/Snackbar'
import Confirm from '../../../components/Confirm'
import { BreakSignal, Stop } from '../../../utils/request'
import AssetImg from '../../../components/AssetImg'
import { highlight, unhighlight } from '../../backend/education/application/async'

const style = {
  divider: {
    backgroundColor: '#f5f5f5',
    marginLeft: '-8px',
    marginTop: 10,
    marginBottom: 10
  }
}
@connect(state => state)
export default class ShowApplication extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      data: {},
      commentList: [],
      page: 1,
      hasMore: false,
      snackOpen: false,
      message: '',
      comment: '',
      tipVote: false,
      tipDisVote: false,
      priority: 0,
      voteCount: 0,
      voteStatus: 0,
      showConfirm:false,
      showConfirm2:false,
      isShowCommentReplyBox: true,
      showConfirmModal: {
        title: '提示',
        content: '确认加精？',
        actions: [{
          label: '确认',
          onClick: () => {
            this.setState({ showConfirm: false })
            this.clickHighlight()
          }
        },
          {
            label: '取消',
            onClick: () => this.setState({ showConfirm: false })
          }
        ]
      },
      showConfirmModal2: {
        title: '提示',
        content: '是否取消加精？',
        actions: [{
          label: '确认',
          onClick: () => {
            this.setState({ showConfirm2: false })
            this.clickHighlight()
          }
        },
          {
            label: '取消',
            onClick: () => this.setState({ showConfirm2: false })
          }
        ]
      }
    }
  }

  componentWillMount() {
    // 加载数据
    const { location, dispatch } = this.props
    // 获取id
    const submitId = _.get(location, 'query.submitId', -1)
    if(!_.isEqual(submitId, -1)) {
      // 获取成功
      loadApplicationSubmit(submitId).then((res) => {
        if(res.code === 200) {
          this.setState({
            data: res.msg,
            submitId: submitId,
            request: res.msg.request,
            requestCommentCount: res.msg.requestCommentCount,
            voteCount: res.msg.voteCount,
            voteStatus: res.msg.voteStatus,
            priority: res.msg.priority
          })
          document.body.scrollTop = 0
        }
      }).catch(err => {
        console.error('catch', err)
        if(err instanceof BreakSignal) {
          dispatch(alertMsg(err.title, err.msg))
        } else if(!(err instanceof Stop)) {
          dispatch(alertMsg(err + ''))
        }
      })

      loadComments(CommentType.Application, submitId, this.state.page).then(res => {
        if(res.code === 200) {
          const { list, count } = res.msg
          if(list.length < count) {
            this.setState({ commentList: list, hasMore: true })
          } else {
            this.setState({ commentList: list })
          }
        }
      }).catch(err => dispatch(alertMsg(err + '')))
    } else {
      alert('缺少参数')
    }
  }

  goEdit(e) {
    // 进入修改页面
    const { data } = this.state
    const { location } = this.props
    const planId = _.get(location, 'query.planId')
    const applicationId = _.get(location, 'query.applicationId')
    const { isMine } = data
    if(isMine && planId && applicationId) {
      this.context.router.push({
        pathname: '/fragment/application',
        query: { planId: planId, id: applicationId }
      })
    } else {
      console.error('返回失败，出现异常')
    }
  }

  clickVote(e) {
    // 点赞／或者取消点赞
    const { voteStatus, voteCount, submitId } = this.state
    const { dispatch } = this.props
    if(_.isUndefined(voteStatus) || _.isUndefined(submitId)) {
      // 不能操作
      return
    } else {
      // 开始请求
      let status = 1
      if(_.isEqual(voteStatus, 1)) {
        // 点赞中，取消点赞
        status = 2
        return// 禁止取消点赞
      } else {
        // 点赞
        status = 1
      }
      vote(submitId, status, VoteType.Application).then(res => {
        if(_.isEqual(res.code, 200)) {
          // 成功
          if(_.isEqual(voteStatus, 1)) {
            // 提示取消成功
            this.setState({ voteCount: (voteCount) - 1, voteStatus: 0 })
            this.tipDiVote()
          } else {
            this.setState({ voteCount: Number(voteCount) + 1, voteStatus: 1 })
            this.tipVote()
          }
        }
      }).catch(err => dispatch(alertMsg(err + '')))
    }
  }

  tipDiVote() {
    this.setState({ tipDisVote: true })
    setTimeout(() => {
      this.setState({ tipDisVote: false })
    }, 1000)
  }

  tipVote() {
    this.setState({ tipVote: true })
    setTimeout(() => {
      this.setState({ tipVote: false })
    }, 1000)
  }

  showMsg(msg) {
    this.setState({
      snackOpen: true,
      message: msg
    })
  }

  loadMoreContent() {
    const page = this.state.page + 1
    const { submitId, hasMore } = this.state
    const { dispatch } = this.props
    if(_.isNumber(page) && _.isNumber(submitId)) {
      const oldList = _.get(this.state, 'commentList')
      if(hasMore) {
        loadComments(CommentType.Application, submitId, page).then(res => {
          if(res.code === 200) {
            const { list, count } = res.msg
            list.forEach(item => oldList.push(item))
            if(oldList.length < count) {
              this.setState({ commentList: oldList, page: page })
            } else {
              this.setState({ commentList: oldList, page: page, hasMore: false })
            }
          } else {
            dispatch(alertMsg(res.msg))
          }
        })
      } else {
        this.showMsg('没有更多评论了')
      }
    }
  }

  clickSubmitComment() {
    const { comment, commentList, submitId } = this.state
    const { dispatch } = this.props
    if(!comment) {
      this.showMsg('请先输入评论内容再提交!')
      return
    } else {
      dispatch(startLoad())
      submitComment(CommentType.Application, submitId, comment).then(res => {
        dispatch(endLoad())
        if(res.code == 200) {
          let newArr = []
          newArr.push(res.msg)
          this.setState({ commentList: _.union(newArr, commentList), comment: '' })
        } else {
          dispatch(endLoad())
          dispatch(alertMsg(res.msg))
        }
      }).catch(ex => {
        dispatch(endLoad())
        dispatch(alertMsg(ex))
      })
    }
  }

  showImgTip(e) {
    const { pageX, pageY } = e
    setTimeout(() => this.setState({ imgTipStyle: { left: pageX + 10, top: pageY - 10 } }), 50)

  }

  onRequestComment() {
    const { location } = this.props
    // 进入修改页面
    const submitId = _.get(location, 'query.submitId')
    requestAsstComment(CommentType.Application, submitId).then(res => {
      if(res.code === 200) {
        this.setState({ message: '教练已经收到你的请求啦，点评后会在消息中心通知你的', snackOpen: true, alert: false, request: true })
      } else {
        this.setState({ message: res.msg, snackOpen: true, alert: false })
      }
    })
    setTimeout(() => {
      this.setState({ message: '', snackOpen: false })
    }, 2000)
  }

  click() {
    const { dispatch } = this.props
    const { request, requestCommentCount } = this.state
    if(request) {
      dispatch(alertMsg('本练习已经使用过求点评啦'))
      return
    }
    if(requestCommentCount === 0) {
      dispatch(alertMsg('本小课求点评次数已用完'))
      return
    }
    this.setState({ alert: true })
  }

  showConfirm(){
    const { priority } = this.state;
    if(priority === 0){
      this.setState({showConfirm:true})
    }else{
      this.setState({showConfirm2:true})
    }

  }

  clickHighlight() {
    const { priority } = this.state
    const { location } = this.props
    const submitId = _.get(location, 'query.submitId')
    if(priority === 0) {
      highlight(submitId).then(res => {
        if(res.code === 200) {
          this.setState({ priority: 1 })
        }
      })
    } else if(priority === 1) {
      unhighlight(submitId).then(res => {
        if(res.code === 200) {
          this.setState({ priority: 0 })
        }
      })
    }
  }

  render() {
    const { data, commentList = [], voteCount, voteStatus, alert, priority } = this.state
    const {
      title, upName, upTime, headImg, content, isMine, requestCommentCount, request,
      role, signature, hasMore, desc, knowledgeId
    } = data

    const actions = [
      {
        'label': '再想想',
        'onClick': () => this.setState({ alert: false })
      },
      {
        'label': '确定',
        'onClick': () => this.onRequestComment(),
        'primary': true
      }
    ]

    const reply = (replyId, replyComment) => {
      const { submitId } = this.state
      const { dispatch } = this.props
      dispatch(startLoad())
      if(replyComment.trim().length == 0) {
        this.showMsg('请先输入回复内容再提交！')
        return
      }
      submitReplyComment(CommentType.Application, submitId, replyComment, replyId).then(res => {
        if(res.code == 200) {
          let newArr = []
          newArr.push(res.msg)
          this.setState({ commentList: _.union(newArr, commentList), comment: '' })
          dispatch(endLoad())
        } else {
          dispatch(endLoad())
          dispatch(alertMsg(res.msg))
        }
      }).catch(err => dispatch(alertMsg(err + '')))
    }

    const onDelete = (id) => {
      deleteComment(id).then(res => {
        if(res.code === 200) {
          let newCommentList = []
          commentList.forEach((item, key) => {
            if(item.id != id) {
              newCommentList.push(item)
            }
          })
          this.setState({ commentList: newCommentList })
        }
      })
    }

    const renderEdit = () => {
      if(isMine) {
        return (
          <div>
            <div className="edit" onClick={(e) => this.goEdit(e)}>
              <img src={imgSrc.edit} style={{ float: 'left', width: '15px', height: '15px', marginRight: '4px' }}/>
              <span>编辑</span>
            </div>
            {!request && requestCommentCount != null && requestCommentCount > 0 ?
              <div className="edit" onClick={() => this.click()}>
                <img src={imgSrc.requestComment}
                     style={{ float: 'left', width: '15px', height: '15px', marginRight: '4px' }}/>
                <span>求点评</span>
              </div> : null}
            {request || (requestCommentCount != null && requestCommentCount === 0) ?
              <div className="edit" onClick={() => this.click()}>
                <img src={imgSrc.requestCommentDisable}
                     style={{ float: 'left', width: '15px', height: '15px', marginRight: '4px' }}/>
                <span className="disabled">求点评</span>
              </div> : null}

          </div>
        )
      }
    }
    return (
      <div className="showContainer">
        <Divider style={style.divider}/>
        <div className="showTitleContainer">
          <div className="title">
            <span>{title}</span>
          </div>
          <Divider style={style.divider}/>
          <div>
            <div className="content">
              <div dangerouslySetInnerHTML={{ __html: desc }}/>
            </div>
            {knowledgeId ?
              <div className="knowledge-tip"
                   onClick={() => window.open(`/fragment/knowledge?id=${knowledgeId}&tag=false`)}>点击查看相关知识
              </div>
              : null}
          </div>
          <Divider style={style.divider}/>
          {renderEdit()}
          <div className="author">
            <div className="avatar">
              <Avatar
                src={headImg}
                size={30}
              />
            </div>
            <div className="upInfo">
              <div className="intro">
                <div className="upName">{upName}</div>
                {role == 3 || role == 4 || role == 12 || role == 13 ?
                  <div className="role"><AssetImg url='https://static.iqycamp.com/images/coach.png'/></div> : null}
                {role == 5 || role == 10 || role == 14 || role == 15 ?
                  <div className="role"><AssetImg url='https://static.iqycamp.com/images/senior_coach.png'/>
                  </div> : null}
                {role == 6 ?
                  <div className="role"><AssetImg url='https://static.iqycamp.com/images/first_coach.png'/>
                  </div> : null}
                {role == 7 ?
                  <div className="role"><AssetImg url='https://static.iqycamp.com/images/vip.png'/></div> : null}
                {/*添加加精和点赞*/}
                <div className="highlight-container" onClick={(e, v) => this.showConfirm()}>
                  <AssetImg className="icon"
                            url={priority === 1 ? 'https://static.iqycamp.com/images/request-comment-gray.png' : 'https://static.iqycamp.com/request_comment-1wsx0d4q.png'}/>
                  <span className="highlight-span">{priority === 1 ? '取消加精' : '加精'}</span>
                </div>
                <div className="like-container" onClick={(e, v) => this.clickVote(e)}>
                  <AssetImg className="icon"
                            url={voteStatus ? 'https://static.iqycamp.com/voted-nm7ga1oc.png' : 'https://static.iqycamp.com/vote-9467wr3b.png'}/>
                  <span className="vote-count">{voteCount}</span>
                </div>
                <div className="upTime">{upTime + '上传'}</div>
              </div>
              <div className="signature">{signature}</div>
            </div>
          </div>
        </div>
        <div className="showContentContainer">
          <div className="content">
            <pre dangerouslySetInnerHTML={{ __html: content }}/>
          </div>
        </div>

        {commentList.length > 0 ? <Divider style={style.divider}/> : null}
        <div className="commentContainer">
          <CommentList comments={commentList} onDelete={onDelete} reply={reply}
                       isShowCommentReplyBox={this.state.isShowCommentReplyBox}/>
          {hasMore ? <div onClick={() => this.loadMoreContent()} className="more">展开查看更多评论</div> : null}
          <div className="commentSubmit">
            <textarea value={this.state.comment} placeholder="和作者切磋讨论一下吧"
                      onChange={(e) => {
                        this.setState({ comment: e.target.value })
                      }}
                      onClick={() => this.setState({ isShowCommentReplyBox: false })}/>
            <div className="commentBtn" onClick={() => this.clickSubmitComment()}>评论</div>
          </div>
        </div>
        <Snackbar
          contentStyle={{ textAlign: 'center' }}
          open={this.state.snackOpen}
          message={this.state.message}
          autoHideDuration={2000}
        />
        <Confirm title='操作确认' content={`当前小课还剩${requestCommentCount}次请求教练点评的机会，确定要在这次使用吗？`} open={alert}
                 actions={actions}/>

        <Confirm open={this.state.showConfirm} {...this.state.showConfirmModal}
                 handlerClose={() => this.setState({ showConfirm: false })}/>
        <Confirm open={this.state.showConfirm2} {...this.state.showConfirmModal2}
                 handlerClose={() => this.setState({ showConfirm2: false })}/>
      </div>
    )
  }
}

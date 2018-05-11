import * as React from 'react'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import { BreakSignal } from '../../../utils/request'
import VerticalBarLoading from '../../../components/VerticalBarLoading'
import Avatar from 'material-ui/Avatar'
import { set, startLoad, endLoad, alertMsg } from '../../../redux/actions'
import _ from 'lodash'
import './ApplicationList.less'
import { loadApplicationSubmit, highlight, unhighlight, loadApplication, submitComment, saveApplicationPractice } from './async'
import Snackbar from 'material-ui/Snackbar'
import { imgSrc } from '../../../utils/imgSrc'
import Confirm from '../../../components/Confirm'
import { CellBody, FormCell, CellFooter, Switch } from 'react-weui'
import Toggle from 'material-ui/Toggle'
import { style } from '../../base/Base'

export const CommentType = {
  Challenge: 1,
  Application: 2,
  Subject: 3
}

@connect(state => state)
export default class ApplicationList extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      other: [],
      hasMore: true,
      index: 1,
      otherLoading: true,
      application: {},
      topic: '',
      topicEditable: false,
      show:true,
      descriptionEditable: false,
      snackOpen: false,
      message: '',
      saving: false,
      showConfirm: false,
      showConfirm2: false,
      applicationId: '',
      highlightId: '',
      showConfirmModal: {
        title: '提示',
        content: '确认加精？',
        actions: [{
          label: '确认',
          onClick: () => {
            this.setState({ showConfirm: false })
            this.confirmHighlight()
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
            this.confirmUnhighlight()
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
    const { location, dispatch, page } = this.props
    const { applicationId } = location.query
    const { index,show } = this.state
    const scrollValue = _.get(page, 'scroll')

    loadApplication(applicationId).then(res => {
      if(res.code === 200) {
        this.setState({ application: res.msg, topic: res.msg.topic })
      } else {
        throw new BreakSignal(res.msg, '提示')
      }
    }).catch(err => {
      if(err instanceof BreakSignal) {
        dispatch(alertMsg(err.title, err.msg))
      }
    })

    loadApplicationSubmit(applicationId, index,show).then(res => {
      if(res.code === 200) {
        this.setState({ other: res.msg, otherLoading: false })
        if(scrollValue) {
          scroll(scrollValue.x, scrollValue.y)
          dispatch(set('page.scroll', { x: 0, y: 0 }))
        }
      } else {
        this.setState({ otherLoading: false })
        throw new BreakSignal(res.msg, '提示')
      }
    }).catch(err => {
      if(err instanceof BreakSignal) {
        this.setState({ otherLoading: false })
        dispatch(alertMsg(err.title, err.msg))
      }
    })
  }

  confirmHighlight() {
    const { other, highlightId } = this.state
    highlight(highlightId).then(res => {
      if(res.code === 200) {
        this.showAlert('提交成功')
      }
      other.forEach((item) => {
        if(item.id === highlightId) {
          _.set(item, 'priority', 1)
        }
      })
      this.setState({ other })
    })
  }

  confirmUnhighlight() {
    const { other, highlightId } = this.state
    unhighlight(highlightId).then(res => {
      if(res.code === 200) {
        this.showAlert('提交成功')
      }
      other.forEach((item) => {
        if(item.id === highlightId) {
          _.set(item, 'priority', 0)
        }
      })
      this.setState({ other })
    })
  }

  showAlert(content, title) {
    const { dispatch } = this.props
    dispatch(alertMsg(title, content))
    setTimeout(() => {
      dispatch(set('base.showModal', false))
    }, 1000)
  }

  loadMoreContent() {
    const { location, dispatch } = this.props
    const { applicationId } = location.query
    const { index, other,show } = this.state

    loadApplicationSubmit(applicationId, index + 1,show).then(res => {
      if(res.code === 200) {
        let hasMore = true
        if(res.msg.length === 0) {
          hasMore = false
        } else {
          res.msg.forEach(item => other.push(item))
        }
        this.setState({ other, index: index + 1, hasMore })
      } else {
        throw new BreakSignal(res.msg, '提示')
      }
    }).catch(err => {
      if(err instanceof BreakSignal) {
        dispatch(alertMsg(err.title, err.msg))
      }
    })
  }

  highlight(id) {
    this.setState({
      highlightId: id,
      showConfirm: true
    })
  }

  unhighlight(id) {
    this.setState({
      highlightId: id,
      showConfirm2: true
    })
  }

  showComment(id) {
    const { other } = this.state

    other.forEach((item) => {
      if(item.id === id) {
        _.set(item, 'commenting', 1)
      }
    })

    this.setState({ other })
  }

  comment(id) {
    const { other, comment } = this.state
    submitComment(CommentType.Application, id, comment).then(res => {
      if(res.code === 200) {
        this.showAlert('提交成功')
      }
      other.forEach((item) => {
        if(item.id === id) {
          _.set(item, 'comment', 1)
          _.set(item, 'commenting', 0)
        }
      })
      this.setState({ other, comment: '' })
    })
  }

  onClickGoDetail(item) {
    this.context.router.push({
      pathname: '/asst/application/view',
      query: {
        submitId: item.id,
        applicationId: item.applicationId,
        planId: item.planId
      }
    })
  }

  back() {
    this.context.router.goBack()
  }

  save() {
    let editor_topic = this.state.topicEditable ? this.refs.editor_topic.value : this.state.application.topic
    let editor_description
    if(this.state.descriptionEditable) {
      editor_description = this.refs.editor_description.getValue()
    } else {
      editor_description = this.state.application.description
    }
    const applicationId = this.state.application.id
    if(this.state.topicEditable || this.state.descriptionEditable) {
      saveApplicationPractice(applicationId, editor_topic, editor_description).then(res => {
        if(res.code === 200) {
          this.setState({ message: '保存成功', snackOpen: true, saving: false })
        } else {
          this.setState({ message: res.msg, snackOpen: true, saving: false })
        }
      })
    }
    setTimeout(() => {
      this.setState({ snackOpen: false })
    }, 2000)
  }

  onClickTopicEdit() {
    this.setState({ topicEditable: true }, () => {
      this.refs.editor_topic.focus()
    })
  }

  onClickDescriptionEdit() {
    this.setState({ descriptionEditable: true })
  }

  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  是否显示加精作业开关
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  toggled(){
    const {dispatch,location} = this.props
    const { applicationId } = location.query
    const {show } = this.state

    if(this.refs.toggle){
      console.log(this.refs.toggle)
    }

    loadApplicationSubmit(applicationId, 1,!show).then(res => {
      if(res.code === 200) {
        this.setState({ other: res.msg, otherLoading: false,index:1,show:!show})

      } else {
        this.setState({ otherLoading: false })
        throw new BreakSignal(res.msg, '提示')
      }
    }).catch(err => {
      if(err instanceof BreakSignal) {
        this.setState({ otherLoading: false })
        dispatch(alertMsg(err.title, err.msg))
      }
    })
  }

  render() {
    const { other = [], hasMore, otherLoading, application} = this.state
    const renderOther = () => {
      return (
        <div className="otherContainer">
          {other.map((item, index) => {
            const { id, upName, headPic, upTime, content, applicationId, priority, comment, commenting } = item
            return (
              <div className="other-show">
              <div key={index} className="workItemContainer">
                <div className="titleArea">
                  <div className="leftArea">
                    <div className="author">
                      <div className="avatar">
                        <Avatar
                          src={headPic}
                          size={30}
                        />
                      </div>
                      <div className="upInfo">
                        <div className="upName">{upName}</div>
                        <div className="upTime">{upTime + '上传'}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="workContentContainer">
                  <div className="content" dangerouslySetInnerHTML={{ __html: content }}>
                  </div>
                  <div className="rightArea">
                    {priority === 0 ?
                      <div className="function-button" onClick={() => this.highlight(id)}>
                        加精
                      </div> :
                      <div className="function-button" onClick={() => this.unhighlight(id)}>
                        取消加精
                      </div>}
                    <div className="function-button" onClick={() => this.onClickGoDetail(item)}>详情</div>
                  </div>
                  {commenting === 1 ?
                    <div className="commentSubmit">
                                <textarea value={this.state.comment} placeholder="和作者切磋讨论一下吧"
                                          onChange={(e) => {
                                            this.setState({ comment: e.target.value })
                                          }}/>
                      <div className="commentBtn" onClick={() => this.comment(id)}>提交</div>
                    </div> : null
                  }
                </div>
              </div>
              </div>
            )
          })}
        </div>
      )
    }
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
      是否显示已加精作业
      -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    const renderToggle = () => {
      return (
        <div className="toggle-container">
          <Toggle ref="toggle"
            label="是否显示加精作业"
            defaultToggled={true} onToggle={(e,v)=>this.toggled()}
          />
        </div>
      )
    }
    const renderDiscuss = () => {
      return (
        <div>
          <div className="title">
            <span className="title-text">圈柚的作业</span>
          </div>
          {renderToggle()}
          {otherLoading ? <VerticalBarLoading/> : renderOther()}
          <Divider style={style.divider}/>
          {hasMore ? <div className="more" onClick={() => this.loadMoreContent()}>点击加载更多</div> :
            <div className="no-more">没有更多了</div>}
        </div>
      )
    }

    return (
      <div className="applicationListContainer">
        <div className="backContainer">
          <span onClick={() => this.context.router.goBack()} className="backBtn"><img src={imgSrc.backList}/>返回列表</span>
        </div>
        <hr/>
        <div className="myApplicationContainer">
          <div className="desc" dangerouslySetInnerHTML={{ __html: application.description }}/>
          {
            renderDiscuss()
          }
        </div>
        <Snackbar
          open={this.state.snackOpen}
          message={this.state.message}
          autoHideDuration={2000}/>
        <Confirm open={this.state.showConfirm} {...this.state.showConfirmModal}
                 handlerClose={() => this.setState({ showConfirm: false })}/>
        <Confirm open={this.state.showConfirm2} {...this.state.showConfirmModal2}
                 handlerClose={() => this.setState({ showConfirm2: false })}/>
      </div>
    )
  }
}

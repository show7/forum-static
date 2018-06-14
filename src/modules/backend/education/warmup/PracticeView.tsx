import * as React from 'react'
import { connect } from 'react-redux'
import './PracticeView.less'
import { loadWarmUp, replyDiscuss, highlight, unhighlight } from './async'
import { BreakSignal, Stop } from 'utils/request'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import Subheader from 'material-ui/Subheader'
import DiscussDisplayComponent from '../components/DiscussDisplayComponent'

@connect(state => state)
export default class PracticeView extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
      discussList: [],
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    const { id } = location.query
    loadWarmUp(id).then(res => {
      if(res.code === 200) {
        this.setState({
          data: res.msg,
          discussList: res.msg.discussList
        })
      } else {
        throw new BreakSignal(res.msg, '加载当前问题失败')
      }
    })
  }

  showAlert(content, title) {
    const { dispatch } = this.props
    dispatch(alertMsg(title, content))
    setTimeout(() => {
      dispatch(set('base.showModal', false))
    }, 1000)
  }


  async discuss(discussId, value) {
    const { location } = this.props
    const { id } = location.query
    const param = { comment: value, repliedId: discussId, referenceId: id ,CommentType:1 }
    return await replyDiscuss(param)
  }

  async voteDiscuss(discussId, priority){
    if(priority){
      return await highlight(discussId)
    }else{
      return await unhighlight(discussId)
    }
  }

  render() {
    const { data } = this.state

    const questionRender = (practice) => {
      const { id, question, choiceList = [] } = practice
      return (
        <div className="intro-container">
          <div className="question">
            <div dangerouslySetInnerHTML={{ __html: question }}></div>
          </div>
          <div className="choice-list">
            {choiceList.map((choice, idx) => choiceRender(choice, idx))}
          </div>
          <div className="analysis">
            <div className="analysis-title">【解析】</div>
            <div className="context"
                 dangerouslySetInnerHTML={{ __html: practice ? practice.analysis : '' }}></div>
          </div>
          <div className="discuss">
            <a name="discuss"/>
            <div className="discuss-title-bar"><span className="discuss-title">问答</span></div>
            {this.state.discussList.map((discuss, idx) => discussRender(discuss, idx))}
            <div className="discuss-end">
              你已经浏览完所有的讨论啦
            </div>
          </div>
        </div>
      )
    }

    const discussRender = (discuss, idx) => {
      return (
        <DiscussDisplayComponent key={idx}
                                 clickVote={(discussId, priority) => this.voteDiscuss(discussId, priority) }
                                 discuss={discuss}
                                 reply={(discussId, value) => this.discuss(discussId, value)}
                                 />
      )
    }

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice
      return (
        <div key={id} className={`choice${choice.selected ? ' selected' : ''}`}>
          <span className={`text${choice.isRight ? ' right' : ' wrong'}`}>{subject}</span>
        </div>
      )
    }

    return (
      <div className="warm-up-analysis">
        <Subheader>选择题</Subheader>
        {questionRender(data)}
      </div>
    )
  }
}

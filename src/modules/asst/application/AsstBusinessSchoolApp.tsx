import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from '../../../redux/actions'
import './AsstBusinessSchoolApp.less'
import {
  loadBusinessApplicationList, addInterviewerRecord
} from './async'
import * as _ from 'lodash'
import { MessageTable } from '../../backend/admin/message/autoreply/MessageTable'
import { RaisedButton, Dialog, Divider, FlatButton, TextField, SelectField, MenuItem } from 'material-ui'
import TimePicker from 'material-ui/TimePicker'

const cellStyle = {
  paddingLeft: 0,
  paddingRight: 0
}

const focusChannels = [
  { id: 1, value: '圈圈的书' },
  { id: 2, value: '好友推荐' },
  { id: 3, value: '朋友圈' },
  { id: 4, value: '奴隶社会' },
  { id: 5, value: '分答&在行' },
  { id: 6, value: '知乎' },
  { id: 7, value: '领英' },
  { id: 8, value: '其他，请详述' },
  { id: 9, value: '不记得了' }
]

const touchDurations = [
  { id: 1, value: '不到一周' },
  { id: 2, value: '不到一个月（超过一周）' },
  { id: 3, value: '1-6个月' },
  { id: 4, value: '6个月以上' },
  { id: 5, value: '其他，请详述' },
  { id: 6, value: '不记得了' }
]

const applyEvents = [
  { id: 1, value: '朋友推荐' },
  { id: 2, value: '领导推荐' },
  { id: 3, value: '招募文章' },
  { id: 4, value: '圈圈直播' },
  { id: 5, value: '其他，请详述' },
  { id: 6, value: '不记得了' }
]

const learningWills = [
  { id: 1, value: '有' },
  { id: 2, value: '无' }
]

const potentialScores = [
  { id: 1, value: '1分' },
  { id: 2, value: '2分' },
  { id: 3, value: '3分' },
  { id: 4, value: '4分' },
  { id: 5, value: '5分' }
]

const applyAwards = [
  { id: 1, value: '是' },
  { id: 2, value: '否' }
]

const isAdmit = [
  { id: 0, value: '是' },
  { id: 1, value: '否' }
]

@connect(state => state)
export default class AsstBusinessSchoolApp extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      meta: [
        { tag: 'nickname', alias: '昵称', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'project', alias: '项目类型', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'interviewTime', alias: '合适的面试时间', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'workYear', alias: '首次工作时间', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'industry', alias: '当前职位', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'education', alias: '最高学历', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'college', alias: '院校名称', style: _.merge({}, cellStyle, { width: '70px' }) },
        { tag: 'isBlack', alias: '黑名单', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'isInterviewed', alias: '是否已经录入信息', style: _.merge({}, cellStyle, { width: '120px' }) },
        { tag: 'submitTime', alias: '问卷提交日期', style: cellStyle }
      ],
      data: [],
      profileId: '',
      applyId: '',
      interviewTime: '',
      question: '',
      targetChannel: '',
      focusChannelName: '',
      touchDuration: '',
      touchDurationName: '',
      targetApplyEvent: '',
      applyEventName: '',
      targetLearningWill: '',
      targetPotentialScore: '',
      potentialScore: '',
      targetAward: '',
      applyReason: '',
      targetAdmit: '',
      openDialog: false,
      RasiedClicked: false,
      remark: ''
    }
  }

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(startLoad())
    loadBusinessApplicationList(1).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ applications: res.msg.data, tablePage: res.msg.page })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  openDialog(data) {
    if(data.interviewRecord != null) {
      const { interviewRecord } = data
      let interviewTime
      if(!_.isEmpty(interviewRecord.interviewTime)) {
        interviewTime = new Date(interviewRecord.interviewTime)
      }
      let targetChannel = interviewRecord.focusChannel
      if(targetChannel != '') {
        focusChannels.map((target) => {
          if(target.value.indexOf(targetChannel) >= 0) {
            targetChannel = target
            return
          }
        })
      }

      let targetTouchDuration = interviewRecord.touchDuration
      if(targetTouchDuration != '') {
        touchDurations.map((touch) => {
          if(touch.value.indexOf(targetTouchDuration) >= 0) {
            targetTouchDuration = touch
            return
          }
        })
      }

      let targetApplyEvent = interviewRecord.applyEvent
      if(targetApplyEvent != '') {
        applyEvents.map((apply) => {
          if(apply.value.indexOf(targetApplyEvent) >= 0) {
            targetApplyEvent = apply
            return
          }
        })
      }

      let targetLearningWill = interviewRecord.learningWill
      learningWills.map((will) => {
        if(will.id === targetLearningWill) {
          targetLearningWill = will
          return
        }
      })

      let targetPotentialScore = interviewRecord.potentialScore
      potentialScores.map((score) => {
        if(score.id === targetPotentialScore) {
          targetPotentialScore = score
          return
        }
      })

      let targetAward = interviewRecord.applyAward
      applyAwards.map((award) => {
        if(award.id === targetAward) {
          targetAward = award
          return
        }
      })

      let targetAdmit = interviewRecord.admit
      isAdmit.map((admit) => {
        if(admit.id === targetAdmit) {
          targetAdmit = admit
          return
        }
      })

      this.setState({
        interviewTime,
        question: interviewRecord.question,
        targetChannel,
        focusChannelName: interviewRecord.focusChannelName,
        targetTouchDuration,
        touchDurationName: interviewRecord.touchDurationName,
        targetApplyEvent,
        applyEventName: interviewRecord.applyEventName,
        targetLearningWill,
        targetPotentialScore,
        targetAward,
        applyReason: interviewRecord.applyReason,
        openDialog: true,
        editData: data,
        applyId: data.applyId,
        profileId: data.profileId,
        remark: interviewRecord.remark,
        targetAdmit
      })
    } else {
      this.setState({
        openDialog: true,
        editData: data,
        applyId: data.applyId,
        profileId: data.profileId
      })
    }
  }

  refreshPage() {
    this.setState({
      openDialog: false,
      editData: undefined,
      applyId: '',
      interviewTime: '',
      question: '',
      targetChannel: '',
      focusChannelName: '',
      targetTouchDuration: '',
      touchDuration: '',
      touchDurationName: '',
      targetApplyEvent: '',
      applyEventName: '',
      targetLearningWill: '',
      targetPotentialScore: '',
      potentialScore: '',
      targetAward: '',
      applyReason: '',
      targetAdmit: '',
      remark: ''
    }, () => {
      this.handlePageClick(this.state.page)
    })
  }

  handlePageClick(page) {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadBusinessApplicationList(page).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ applications: res.msg.data, RasiedClicked: false, tablePage: res.msg.page, page: page })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  /**
   * 点击取消按钮
   */
  handleClickClose() {
    this.setState({
      openDialog: false,
      editData: undefined,
      applyId: '',
      interviewTime: '',
      question: '',
      targetChannel: '',
      focusChannelName: '',
      touchDuration: '',
      targetTouchDuration: '',
      touchDurationName: '',
      targetApplyEvent: '',
      applyEventName: '',
      targetLearningWill: '',
      targetPotentialScore: '',
      potentialScore: '',
      targetAward: '',
      applyReason: '',
      remark: ''
    })
  }

  /**
   * 点击确定按钮
   */
  handleSubmit() {
    const { dispatch } = this.props

    const {
      interviewTime, applyId, profileId, question, targetChannel,
      focusChannelName, targetTouchDuration, touchDurationName,
      targetApplyEvent, applyEventName, targetLearningWill, targetPotentialScore, targetAward, applyReason, remark, targetAdmit
    } = this.state

    if(_.isEmpty(remark)) {
      alert('请选择面试备注')
      return
    }
    //如果选择是否录取，则需要check字段
    if(!_.isEmpty(targetAdmit)) {
      if(interviewTime === undefined || _.isEmpty(question) || _.isEmpty(targetChannel) || _.isEmpty(targetTouchDuration) ||
        _.isEmpty(targetApplyEvent) || _.isEmpty(targetLearningWill) || _.isEmpty(targetPotentialScore) ||
        _.isEmpty(targetAward) || _.isEmpty(remark)) {
        alert('请将信息填写完成')
        return
      }
    }

    let param = {
      applyId,
      profileId,
      question,
      type: 1,
      focusChannelName,
      touchDurationName,
      applyEventName,
      applyReason,
      remark
    }
    if(interviewTime !== undefined) {
      param = _.merge(param, { interviewTime: interviewTime })
    }
    if(!_.isEmpty(targetChannel)) {
      param = _.merge(param, { focusChannel: targetChannel.value })
    }
    if(!_.isEmpty(targetTouchDuration)) {
      param = _.merge(param, { touchDuration: targetTouchDuration.value })
    }
    if(!_.isEmpty(targetApplyEvent)) {
      param = _.merge(param, { applyEvent: targetApplyEvent.value })
    }
    if(!_.isEmpty(targetLearningWill)) {
      param = _.merge(param, { learningWill: targetLearningWill.id })
    }
    if(!_.isEmpty(targetPotentialScore)) {
      param = _.merge(param, { potentialScore: targetPotentialScore.id })
    }
    if(!_.isEmpty(targetAward)) {
      param = _.merge(param, { applyAward: targetAward.id })
    }

    if(!_.isEmpty(targetAdmit)) {
      param = _.merge(param, { admit: targetAdmit.id })
    }

    addInterviewerRecord(param).then(res => {
      if(res.code === 200) {
        this.refreshPage()
      }
      else {
        dispatch(alertMsg('添加失败'))
      }
    })
  }

  render() {
    const renderDialogItem = (label, value, br, key) => {
      return (
        <div className="bs-dialog-row" key={key}>
          <span className="bs-dialog-label">{label}</span>{br ? <br/> : null}
          <span className={`${(value == '是' && label == '是否黑名单用户：') ? 'bs-dialog-true-value' : 'bs-dialog-value'}`}>
            {value}
          </span>

          <Divider/>
        </div>
      )
    }
    const renderDialog = () => {
      const { openDialog, editData = {} } = this.state
      return (
        <Dialog open={openDialog} autoScrollBodyContent={true} modal={false}>
          <div className="bs-dialog">
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              申请者信息：
            </div>
            {renderDialogItem('昵称：', editData.nickname)}
            {renderDialogItem('OpenId：', editData.openid)}
            {renderDialogItem('当前会员状态：', editData.memberType)}
            {renderDialogItem('付费状态：', editData.finalPayStatus)}
            {renderDialogItem('申请时会员类型：', editData.originMemberTypeName)}
            {renderDialogItem('是否助教：', editData.isAsst)}
            {renderDialogItem('最近审核结果：', editData.verifiedResult)}
            {renderDialogItem('是否黑名单用户：', editData.isBlack)}
            {renderDialogItem('最终付费状态：', editData.finalPayStatus)}
            {renderDialogItem('面试官：', editData.interviewerName)}
            <div className="bs-dialog-header">
              问卷信息：
            </div>
            {editData.questionList ? editData.questionList.map(item => {
              return renderDialogItem(item.question, item.answer, true, item.id)
            }) : null}
            <div className="bs-dialog-header">
              录入面试结果：
            </div>
            <br/>
            {renderInterview()}
            {
              <div>
                <RaisedButton
                  style={{ marginLeft: 30 }}
                  label="确定" secondary={true}
                  onClick={() => this.handleSubmit()}/>
                <RaisedButton
                  style={{ marginLeft: 30 }}
                  label="取消" secondary={true}
                  onClick={() => this.handleClickClose()}/>
              </div>
            }
          </div>
        </Dialog>
      )
    }
    /**
     * 面试记录信息
     * @returns {any}
     */
    const renderInterview = () => {
      const {
        interviewTime, question, remark
      } = this.state

      return (
        <div>
          <div className="interview-container">
            <FlatButton label="面试时间"/>
          </div>
          <TimePicker
            value={interviewTime}
            onChange={(e, v) => this.setState({ interviewTime: v })}
          /><br/>
          <div className="interview-container">
            <FlatButton label="学员提问"/>
          </div>
          <textarea
            placeholder="学员提问"
            value={question}
            className="comment-text"
            onChange={(e) => this.setState({ question: e.target.value })}
          /><br/>
          {renderFocusChannel()}
          {renderTouchDuration()}
          {renderApplyEvent()}
          {renderLearningWill()}
          {renderPotentialScore()}
          {renderAward()}
          {renderIsAdmit()}
          <div className="interview-container">
            <FlatButton label="面试备注"/>
          </div>
          <textarea
            placeholder="面试备注"
            value={remark}
            className="comment-text"
            onChange={(e) => this.setState({ remark: e.target.value })}
          /><br/>
        </div>

      )
    }

    /**
     * 关注渠道
     * @returns {{}}
     */
    const renderFocusChannel = () => {
      const { focusChannelName, targetChannel } = this.state
      return (
        <div>
          <div className="selector-inline">
            <SelectField
              value={targetChannel}
              floatingLabelText="选择关注渠道"
              onChange={(e, idx, value) => {
                this.setState({ targetChannel: value })
              }
              }
            >
              {
                focusChannels.map((channel, idx) => {
                  return (
                    <MenuItem key={idx} value={channel} primaryText={channel.value}/>
                  )
                })
              }
            </SelectField>
            {targetChannel && targetChannel.id === 8 && <div>
              <div className="interview-container">
                <FlatButton label="关注渠道"/>
              </div>
              <textarea
                placeholder="请输入关注渠道"
                value={focusChannelName}
                className="comment-text"
                onChange={(e) => this.setState({ focusChannelName: e.target.value })}
              /><br/>
            </div>}
          </div>
        </div>
      )
    }

    /**
     * 接触时长
     */
    const renderTouchDuration = () => {
      const { touchDurationName, targetTouchDuration } = this.state
      return (<div>
        <div className="selector-inline">
          <SelectField
            value={targetTouchDuration}
            floatingLabelText="选择接触圈外时长"
            onChange={(e, idx, value) => {
              this.setState({ targetTouchDuration: value })
            }
            }
          >
            {
              touchDurations.map((duration, idx) => {
                return (
                  <MenuItem key={idx} value={duration} primaryText={duration.value}/>
                )
              })
            }
          </SelectField>
          {targetTouchDuration && targetTouchDuration.id === 5 &&
          <div>
            <div className="interview-container">
              <FlatButton label="接触圈外时长"/>
            </div>
            <textarea
              placeholder="请输入接触圈外时长"
              value={touchDurationName}
              className="comment-text"
              onChange={(e) => this.setState({ touchDurationName: e.target.value })}
            /><br/>
          </div>
          }
        </div>
      </div>)
    }

    /**
     * 申请商学院事件
     */
    const renderApplyEvent = () => {
      const { applyEventName, targetApplyEvent } = this.state

      return (
        <div>
          <div className="selector-inline">
            <SelectField
              value={targetApplyEvent}
              floatingLabelText="选择触发申请商学院事件"
              onChange={(e, idx, value) => {
                this.setState({ targetApplyEvent: value })
              }
              }
            >
              {
                applyEvents.map((event, idx) => {
                  return (
                    <MenuItem key={idx} value={event} primaryText={event.value}/>
                  )
                })
              }
            </SelectField>
            {targetApplyEvent && targetApplyEvent.id === 5 &&
            <div>
              <div className="interview-container">
                <FlatButton label="触发申请商学院事件"/>
              </div>
              <textarea
                placeholder="请填入触发申请商学院事件"
                value={applyEventName}
                className="comment-text"
                onChange={(e) => this.setState({ applyEventName: e.target.value })}
              /><br/>
            </div>
            }
          </div>
        </div>
      )

    }

    /**
     * 学习意愿
     * @returns {any}
     */
    const renderLearningWill = () => {
      const { targetLearningWill } = this.state

      return (
        <div>
          <div className="selector-inline">
            <SelectField
              value={targetLearningWill}
              floatingLabelText="选择学员学习意愿评估结果"
              onChange={(e, idx, value) => {
                this.setState({ targetLearningWill: value })
              }
              }
            >
              {
                learningWills.map((will, idx) => {
                  return (
                    <MenuItem key={idx} value={will} primaryText={will.value}/>
                  )
                })
              }
            </SelectField>
          </div>
        </div>
      )
    }

    /**
     * 发展潜力
     */
    const renderPotentialScore = () => {
      const { targetPotentialScore } = this.state

      return (
        <div>
          <div className="selector-inline">
            <SelectField
              value={targetPotentialScore}
              floatingLabelText="选择发展潜力评估结果"
              onChange={(e, idx, value) => {
                this.setState({ targetPotentialScore: value })
              }
              }
            >
              {
                potentialScores.map((score, idx) => {
                  return (
                    <MenuItem key={idx} value={score} primaryText={score.value}/>
                  )
                })
              }
            </SelectField>
          </div>
        </div>
      )
    }

    /**
     * 奖学金
     */
    const renderAward = () => {
      const { applyReason, targetAward } = this.state

      return (
        <div>
          <div className="selector-inline">
            <SelectField
              value={targetAward}
              floatingLabelText="选择是否申请奖学金"
              onChange={(e, idx, value) => {
                this.setState({ targetAward: value })
              }
              }
            >
              {
                applyAwards.map((award, idx) => {
                  return (
                    <MenuItem key={idx} value={award} primaryText={award.value}/>
                  )
                })
              }
            </SelectField>
            {(targetAward && targetAward.id === 1) &&

            <div>
              <div className="interview-container">
                <FlatButton label="申请奖学金理由"/>
              </div>
              <textarea
                placeholder="请填入选择申请奖学金理由"
                value={applyReason}
                className="comment-text"
                onChange={(e) => this.setState({ applyReason: e.target.value })}
              /><br/>
            </div>
            }
          </div>
        </div>
      )
    }

    const renderIsAdmit = () => {
      const { targetAdmit } = this.state

      return (
        <div className="selector-inline">
          <SelectField
            value={targetAdmit}
            floatingLabelText="是否录取"
            onChange={(e, idx, value) => {
              this.setState({ targetAdmit: value })
            }
            }
          >
            {
              isAdmit.map((admit, idx) => {
                return (
                  <MenuItem key={idx} value={admit} primaryText={admit.value}/>
                )
              })
            }
          </SelectField>
        </div>
      )
    }

    return (
      <div className="bs-container">
        {renderDialog()}
        <MessageTable data={this.state.applications} meta={this.state.meta}
                      opsButtons={[{
                        editFunc: (item) => this.openDialog(item),
                        opsName: '录入'
                      }]}

                      page={this.state.tablePage} handlePageClick={(page) => this.handlePageClick(page)}/>
      </div>
    )
  }
}

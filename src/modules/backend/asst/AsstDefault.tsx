import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import './AsstStandard.less'
import * as _ from 'lodash'
import { MessageTable } from '../admin/message/autoreply/MessageTable'
import { loadAssistsStandard, updateAssistStandard } from './async'
import { Dialog } from 'material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const cellStyle = {
  paddingLeft: 0,
  paddingRight: 0
}

@connect(state => state)
export default class AsstDefault extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      meta: [
        { tag: 'nickName', alias: '昵称', style: _.merge({}, cellStyle, { width: '200px' }) },
        { tag: 'roleName', alias: '助教级别', style: _.merge({}, cellStyle, { width: '200px' }) }
      ],
      id: '',
      profileId:'',
      editData: undefined,
      countDown: '',
      learnedProblem: '',
      reviewNumber: '',
      requestReviewNumber: '',
      validReviewRate: '',
      highQualityAnswer: '',
      hostNumber: '',
      hostScore: '',
      mainPointNumber: '',
      mainPointScore: '',
      onlineAnswer: '',
      swing: '',
      onlineOrSwingNumber: '',
      onlineScore: '',
      campNumber: '',
      asstNumber: '',
      campScore: '',
      monthlyWork: '',
      fosterNew: '',
      companyTrainNumber: '',
      companyTrainScor: '',
      RasiedClicked: false
    }
  }

  componentWillMount() {
    const { dispatch } = this.props

    dispatch(startLoad())
    loadAssistsStandard(1).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({
          standards: res.msg.data, tablePage: res.msg.page
        })
      }
      else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  openDialog(data) {
    const {
      id,
      profileId,
      countDown, learnedProblem, reviewNumber, requestReviewNumber, validReviewRate, highQualityAnswer,
      hostNumber, hostScore, mainPointNumber, mainPointScore,
      onlineAnswer, swing, onlineOrSwingNumber, onlineScore,
      campNumber, asstNumber, campScore,
      monthlyWork, fosterNew, companyTrainNumber, companyTrainScore
    } = data

    this.setState({
      openDialog: true,
      id,
      profileId,
      editData: data,
      countDown,
      learnedProblem,
      reviewNumber,
      requestReviewNumber,
      validReviewRate,
      highQualityAnswer,
      hostNumber,
      hostScore,
      mainPointNumber,
      mainPointScore,
      onlineAnswer,
      swing,
      onlineOrSwingNumber,
      onlineScore,
      campNumber,
      asstNumber,
      campScore,
      monthlyWork,
      fosterNew,
      companyTrainNumber,
      companyTrainScore
    })
  }

  handleClickApprove() {
    const { dispatch } = this.props
    const {
        id, profileId, countDown, learnedProblem, reviewNumber, requestReviewNumber, validReviewRate, highQualityAnswer,
      hostNumber, hostScore, mainPointNumber, mainPointScore,
      onlineAnswer, swing, onlineOrSwingNumber, onlineScore,
      campNumber, asstNumber, campScore,
      monthlyWork, fosterNew,
      companyTrainNumber, companyTrainScore
    } = this.state

    let param = {
      id,
      profileId,
      countDown,
      learnedProblem,
      reviewNumber,
      requestReviewNumber,
      validReviewRate,
      highQualityAnswer,
      hostNumber,
      hostScore,
      mainPointNumber,
      mainPointScore,
      onlineAnswer,
      swing,
      onlineOrSwingNumber,
      onlineScore,
      campNumber,
      asstNumber,
      campScore,
      monthlyWork,
      fosterNew,
      companyTrainNumber,
      companyTrainScore
    }
    dispatch(startLoad())
    updateAssistStandard(param).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.refreshPage()
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  refreshPage() {
    this.setState({
      openDialog: false,
      editData: undefined,
      id: '',
      profileId:'',
      countDown: '',
      learnedProblem: '',
      reviewNumber: '',
      requestReviewNumber: '',
      validReviewRate: '',
      highQualityAnswer: '',
      hostNumber: '',
      hostScore: '',
      mainPointNumber: '',
      mainPointScore: '',
      onlineAnswer: '',
      swing: '',
      onlineOrSwingNumber: '',
      onlineScore: '',
      campNumber: '',
      asstNumber: '',
      campScore: '',
      monthlyWork: '',
      fosterNew: '',
      companyTrainNumber: '',
      companyTrainScore: ''
    }, () => {
      this.handlePageClick(this.state.page)
    })
  }

  handlePageClick(page) {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadAssistsStandard(page).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ standards: res.msg.data, RasiedClicked: false, tablePage: res.msg.page, page: page })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  handleClickClose() {
    this.setState({
      openDialog: false,
      editData: undefined,
      id: '',
      profileId:'',
      countDown: '',
      learnedProblem: '',
      reviewNumber: '',
      requestReviewNumber: '',
      validReviewRate: '',
      highQualityAnswer: '',
      hostNumber: '',
      hostScore: '',
      mainPointNumber: '',
      mainPointScore: '',
      onlineAnswer: '',
      swing: '',
      onlineOrSwingNumber: '',
      onlineScore: '',
      campNumber: '',
      asstNumber: '',
      campScore: '',
      monthlyWork: '',
      fosterNew: '',
      companyTrainNumber: '',
      companyTrainScore: ''
    })
  }

  render() {
    const {
      countDown, learnedProblem, reviewNumber, requestReviewNumber, validReviewRate, highQualityAnswer,
      hostNumber, hostScore, mainPointNumber, mainPointScore,
      onlineAnswer, swing, onlineOrSwingNumber, onlineScore,
      campNumber, asstNumber, campScore,
      monthlyWork, fosterNew, companyTrainNumber, companyTrainScore
    } = this.state
    const renderProblemContent = () => {
      return (
        <div>
          <div>
            升降级倒计时天数：<TextField value={countDown} onChange={(e, v) => {this.setState({ countDown: v })}}/>
          </div>
          <div>
            小课学习（累积）: <TextField value={learnedProblem} onChange={(e, v) => {this.setState({ learnedProblem: v })}}/>
          </div>
          <div>
            点评数: <TextField value={reviewNumber} onChange={(e, v) => {this.setState({ reviewNumber: v })}}/>
          </div>
          <div>
            求点评的回答数: <TextField value={requestReviewNumber}
                                onChange={(e, v) => {this.setState({ requestReviewNumber: v })}}/>
          </div>
          <div>
            有效点评率: <TextField value={validReviewRate} onChange={(e, v) => {this.setState({ validReviewRate: v })}}/>%
          </div>
          <div>
            优质回答数: <TextField value={highQualityAnswer} onChange={(e, v) => {this.setState({ highQualityAnswer: v })}}/>
          </div>
        </div>

      )
    }

    const renderOffLineWork = () => {
      return (
        <div>
          <div>
            主持人次数: <TextField value={hostNumber} onChange={(e, v) => {this.setState({ hostNumber: v })}}/>
          </div>
          <div>
            主持人评分: <TextField value={hostScore} onChange={(e, v) => {this.setState({ hostScore: v })}}/>
          </div>
          <div>
            串讲人次数: <TextField value={mainPointNumber} onChange={(e, v) => {this.setState({ mainPointNumber: v })}}/>
          </div>
          <div>
            串讲人评分: <TextField value={mainPointScore} onChange={(e, v) => {this.setState({ mainPointScore: v })}}/>
          </div>

        </div>
      )
    }

    const renderOnlineWork = () => {
      return (
        <div>
          <div>
            线上答题演习: <TextField value={onlineAnswer} onChange={(e, v) => {this.setState({ onlineAnswer: v })}}/>
          </div>
          <div>
            吊打演习: <TextField value={swing} onChange={(e, v) => {this.setState({ swing: v })}}/>
          </div>
          <div>
            线上答疑或吊打: <TextField value={onlineOrSwingNumber}
                                onChange={(e, v) => {this.setState({ onlineOrSwingNumber: v })}}/>
          </div>
          <div>
            线上活动反馈分数: <TextField value={onlineScore} onChange={(e, v) => {this.setState({ onlineScore: v })}}/>
          </div>
        </div>
      )
    }

    const renderCamp = () => {
      return (
        <div>
          <div>
            训练营次数: <TextField value={campNumber} onChange={(e, v) => {this.setState({ campNumber: v })}}/>
          </div>
          <div>
            大教练次数: <TextField value={asstNumber} onChange={(e, v) => {this.setState({ asstNumber: v })}}/>
          </div>
          <div>
            反馈评分: <TextField value={campScore} onChange={(e, v) => {this.setState({ campScore: v })}}/>
          </div>
        </div>
      )
    }

    const renderCompany = () => {
      return (
        <div>
          <div>
            每月作业: <TextField value={monthlyWork} onChange={(e, v) => {this.setState({ monthlyWork: v })}}/>
          </div>
          <div>
            培养新人: <TextField value={fosterNew} onChange={(e, v) => {this.setState({ fosterNew: v })}}/>
          </div>
          <div>
            企业培训次数: <TextField value={companyTrainNumber}
                               onChange={(e, v) => {this.setState({ companyTrainNumber: v })}}/>
          </div>
          <div>
            企业培训评分：<TextField value={companyTrainScore} onChange={(e, v) => {this.setState({ companyTrainScore: v })}}/>
          </div>
        </div>
      )
    }

    const renderDialog = () => {
      const { openDialog, editData = {}, RasiedClicked } = this.state
      return (
        <Dialog open={openDialog} autoScrollBodyContent={true} modal={false}>
          <div className="bs-dialog">
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              小课内容：
            </div>
            {renderProblemContent()}
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              线下工作坊：
            </div>
            {renderOffLineWork()}
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              线上活动
            </div>
            {renderOnlineWork()}
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              训练营
            </div>
            {renderCamp()}
            <div className="bs-dialog-header" style={{ marginTop: '0px' }}>
              企业培训
            </div>
            {renderCompany()}
            <br/>
            {
              RasiedClicked ? null :
                <div ref="raisedButton">
                  <RaisedButton
                    style={{ marginLeft: 30 }}
                    label="确定" secondary={true}
                    onClick={() => {
                      this.handleClickApprove()
                    }}/>
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

    return (
      <div className="asst-default-bs-container">
        {renderDialog()}
        <MessageTable data={this.state.standards} meta={this.state.meta}
                      opsButtons={[{
                        editFunc: (item) => {this.openDialog(item)},
                        opsName: '修改默认标准'
                      }]}
                      page={this.state.tablePage} handlePageClick={(page) => this.handlePageClick(page)}/>
      </div>
    )
  }
}

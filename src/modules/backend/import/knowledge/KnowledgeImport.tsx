import * as React from 'react'
import { connect } from "react-redux"
import { loadKnowledgeDetail, updateKnowledge } from './async'
import _ from 'lodash'
import { loadProblem } from '../problem/async'
import { SelectField, MenuItem, RaisedButton, TextField, FlatButton, Snackbar } from 'material-ui'
import Editor from '../../../../components/editor/Editor'
import { decodeTextAreaString3 } from '../../../../utils/textUtils'
import { ProblemSelector } from '../component/ProblemSelector'
import { KnowledgeSelector } from '../component/KnowledgeSelector'
import { set, startLoad, endLoad, alertMsg } from "redux/actions"

interface KnowledgeImportState {
  // 后台返回数据
  problemId: string,
  problemName: string,
  schedules: [ {
    section: number,
    knowledgeId: number,
    chapter: number,
    series: number
  } ],
  knowledge: {},

  // SnackBar
  snackShow: boolean,
  snackMessage: string,

  // 逻辑计算数据、状态
  targetChapter: number,
  targetSection: number
  // 目标更改字段：Knowledge Step Analysis Means Keynote
  targetKnowledge: string,
  targetStep: string,
  targetAnalysis: string,
  targetMeans: string,
  targetKeynote: string
}

@connect(state => state)
export default class KnowledgeImport extends React.Component<any, KnowledgeImportState> {

  constructor() {
    super()
    // 设置初始值
    this.state = {
      schedules: [],
      knowledge: {},
      select: false,
      add: false,
      snackShow: false,
      snackMessage: '',

      targetChapter: 1,
      targetSection: 1
    }
  }

  componentWillMount() {
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return JSON.stringify(this.state) !== JSON.stringify(nextState)
  }

  onSelect(id) {
    const { dispatch } = this.props
    // 加载当前操作小课名称
    loadProblem(id).then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          problemId: msg.id,
          problemName: msg.problem,
          schedules: msg.schedules
        })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(e=>{
      dispatch(alertMsg(e))
    })
  }

  /**
   * 获取知识点详细信息
   */
  handleLoadKnowledgeDetail(knowledgeId) {
    const { schedules, targetChapter, targetSection } = this.state
    const { dispatch } = this.props

    loadKnowledgeDetail(knowledgeId).then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          // snackBar
          snackShow: true,
          snackMessage: "加载数据成功",

          knowledge: msg,
          targetChapter: msg.chapter,
          targetSection: msg.section,
          targetKnowledge: msg.knowledge,
          targetStep: msg.step,
          targetAnalysis: msg.analysis,
          targetMeans: msg.means,
          targetKeynote: msg.keynote
        })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(e=>{
      dispatch(alertMsg(e))
    })
  }

  handleClickUpdateKnowledge() {
    const { problemId, knowledge, targetKnowledge, targetStep, targetAnalysis, targetMeans, targetKeynote } = this.state
    const { dispatch } = this.props

    const analysis = this.refs.analysis.getValue()
    const means = this.refs.means.getValue()
    const keynote = this.refs.keynote.getValue()
    let id = 0
    if(knowledge.id){
      id = knowledge.id
    }

    let param = { analysis, means, keynote, knowledge: targetKnowledge, step: targetStep, id }
    if(_.isEmpty(analysis) || _.isEmpty(means) || _.isEmpty(keynote) ||
      _.isEmpty(targetKnowledge) || _.isEmpty(targetStep) ) {
      dispatch(alertMsg('请将所有信息填写完毕'))
      return
    }

    updateKnowledge(problemId, param).then(res => {
      if(res.code === 200) {
        this.setState({ snackShow: true, snackMessage: '添加知识点成功' })
      }else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e=>{
      dispatch(alertMsg(e))
    })
  }

  closeSnackShow() {
    this.setState({ snackShow: false })
  }

  render() {
    const { problemId, problemName, schedules, knowledge, snackShow, snackMessage, select, add,
      targetChapter, targetSection, targetKnowledge, targetStep, targetAnalysis, targetMeans, targetKeynote } = this.state

    const renderSelect = () => {
      return (
        <div>
          <RaisedButton
            label="添加知识点" primary={true}
            style={{marginRight:50}}
            onClick={() => this.setState({add:true, select:true})}
          />
          <RaisedButton
            label="更新知识点" primary={true}
            onClick={() => this.setState({add:false, select:true})}
          />
        </div>
      )
    }

    const renderAddName = () => {
      if(add) {
        return (
          <TextField
            value={targetKnowledge}
            onChange={(e, v) => this.setState({ targetKnowledge: v })}
          />
        )
      } else {
        return (
          <KnowledgeSelector problemId={problemId} select={(id)=>this.handleLoadKnowledgeDetail(id)}></KnowledgeSelector>
        )
      }
    }

    const renderChapterSelector = () => {
      let chapterList = [1,2,3,4,5,6,7,8,9]
      return (
        <div>
          <FlatButton label="章节" /><br/>
          <SelectField
            value={targetChapter}
            disabled={!add}
            onChange={(e, idx, value) => this.setState({ targetChapter: value })}
          >
            {
              chapterList.map((chapter, idx) => {
                return (
                  <MenuItem key={idx} value={chapter} primaryText={chapter}/>
                )
              })
            }
          </SelectField>
        </div>
      )
    }

    const renderSectionSelector = () => {
      let sectionList = [1,2,3,4,5,6,7,8,9]
      return (
        <div>
          <FlatButton label="小节" /><br/>
          <SelectField
            value={targetSection}
            disabled={!add}
            onChange={(e, idx, value) => this.setState({ targetSection: value })}
          >
            {
              sectionList.map((section, idx) => {
                return (
                  <MenuItem key={idx} value={section} primaryText={section}/>
                )
              })
            }
          </SelectField>
        </div>
      )
    }

    return (
      <div className="knowledge-import-container">
        <div style={{ padding: 50 }}>
          <FlatButton label="小课" /><br/>
          <ProblemSelector select={(id)=>this.onSelect(id)}></ProblemSelector>
          <br/>
          <FlatButton label="一、知识点" /><br/>
          {
            select ? renderAddName() : renderSelect()
          }
          <br/>
          {renderChapterSelector()}
          <br/>
          {renderSectionSelector()}
          <br/>
          <FlatButton label="二、步骤" /><br/>
          <TextField
            hintText="步骤"
            value={targetStep}
            onChange={(e, v) => this.setState({ targetStep: v })}
          /><br/>
          <FlatButton label="三、作用" /><br/>
          <Editor
            id="analysis" ref="analysis"
            value={decodeTextAreaString3(targetAnalysis)}
          />
          <FlatButton label="四、方法" /><br/>
          <Editor
            id="means" ref="means"
            value={decodeTextAreaString3(targetMeans)}
          />
          <FlatButton label="五、要点" /><br/>
          <Editor
            id="keynote" ref="keynote"
            value={decodeTextAreaString3(targetKeynote)}
          /><br/>
          <RaisedButton
            label="更新数据" primary={true}
            onClick={() => this.handleClickUpdateKnowledge()}
          /><br/>
          <Snackbar
            open={snackShow}
            message={snackMessage}
            autoHideDuration={2000}
            onRequestClose={() => this.closeSnackShow()}
          />
        </div>
      </div>
    )
  }

}

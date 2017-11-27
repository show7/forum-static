import * as React from "react";
import { connect } from "react-redux";
import { startLoad, endLoad, alertMsg } from "redux/actions";
import { SelectField, MenuItem, RadioButtonGroup, RadioButton, RaisedButton, TextField, Snackbar } from "material-ui";
import ChoiceEditor from "../practiceinput/inputcomponents/ChoiceEditor";
import { insertWarmupPractice, loadAllProblemsAndKnowledges, loadWarmUp, loadWarmupPracticeByPracticeUid } from '../async'
import * as _ from "lodash";
import "./WarmupPracticeEdit.less";
import { loadAllKnowledges } from '../../application/async'
import Editor from '../../../../../components/editor/Editor'
import { decodeTextAreaString3 } from '../../../../../utils/textUtils'
import { saveWarmup } from '../../../warmup/async'

interface WarmupPracticeEditState {
  // 巩固练习训练对象
  id:number;
  question: string; // 题干
  type: number; // 题型 1-单选 2-多选
  analysis: string; //解析
  pic: string; // 图片
  difficulty: number; // 难度 1-容易 2-普通 3-困难
  knowledgeId: number; // 知识点 id 重要
  sceneId: number; // 场景 id 已过时，默认为 1
  problemId: number; // 难题 id
  sequence: number; // 顺序
  practiceUid: number; // 练习唯一 id，内容团队给出
  example: number; // 是否是例题 0-否 1-是
  problemList: object;
  // 与问题对应的知识点
  knowledgeList: object;
  // 巩固练习的选择对象
  choices: object;
  choicesCnt: number;
  choiceList:object;

  problems: object; // 返回所有小课列表
  knowledges: object; // 返回所有知识点列表
  knowledgesForSelect: object; // 根据小课列表筛选出的 Knowledge 集合
  problemSelect: number; // 选择 problem
  knowledgeSelect: number; //选择 知识点
  showSnackBar: boolean; // 提交成功提示消息
}
@connect(state => state)
export default class WarmupPracticeEdit extends React.Component<any, WarmupPracticeEditState> {

  constructor() {
    super()
    this.state = {
      choices: [],
      choicesCnt: 1,
      problemList: [],
      knowledgeList: [],
      problems: [],
      knowledges: [],
      knowledgesForSelect: [],
      showSnackBar: false,
      //当存在多个Editor时需要进行判断
      analysisEdit: false,
      questionEdit: false,
      choiceList:[]
    }
  }

  componentWillMount() {
    const {location} = this.props
    const{id} = location.query
    loadWarmUp(id).then(res=>{
      const{msg } = res
      if(res.code==200){
        console.log(res.msg)
        this.setState({
          id:id,
          problemId:msg.problemId,
          practiceUid:msg.practiceUid,
          sequence:msg.sequence,
          question:msg.question,
          analysis:msg.analysis,
          difficulty:msg.difficulty,
          knowledgeId:msg.knowledgeId,
          type:msg.type,
          example:msg.example ? 1 : 0,
          choicesCnt:msg.choicesCnt,
          choiceList:msg.choiceList
        })
      }
    })

    loadAllKnowledges().then(res=>{
      const{code,msg} = res
      if(res.code==200){
        this.setState({
          knowledgesForSelect:msg
        })
      }
    })

    loadAllProblemsAndKnowledges().then(res => {
      const { code, msg } = res
      if(res.code === 200) {
        this.setState({
          problems: msg.problems,
        })
      }
    })

  }

  submitWarmupPractice() {
    const {id,
     type, pic,
      difficulty, sequence, practiceUid, example,
      choices, problemSelect, knowledgeSelect,choiceList
    } = this.state

    let question,analysis

    if(this.refs.editor_question){
      question = this.refs.editor_question.getValue()
    }
    else{
      question = this.state.question
    }
    if(this.refs.editor_analysis){
      analysis = this.refs.editor_analysis.getValue()
    }
    else{
      analysis = this.state.analysis
    }


    const param = {
      id,
      question:question,
      analysis:analysis,
      edit:true,
      type,
      pic: _.trim(pic),
      difficulty,
      knowledgeId: knowledgeSelect,
      problemId: problemSelect,
      sequence: parseInt(_.trim(sequence)),
      practiceUid: _.trim(practiceUid),
      example,
      choiceList,
      choices: _.filter(choices, function(choice) {
        return _.trim(choice.subject) != ''
      })

    }

    const { dispatch } = this.props
    if(param.question == "" || param.analysis == "" || param.practiceUid == "") {
      dispatch(alertMsg("数据必输项未填写完成，请重试"))
    } else if(!param.sequence) {
      dispatch(alertMsg('数据格式异常，请重试'))
    } else {
      dispatch(startLoad())
      saveWarmup(param).then(res => {
        dispatch(endLoad())
        if(res.code === 200) {
          this.setState({ showSnackBar: true }, () => {
            setTimeout(() => {
              this.disableSnackBar()
            }, 1000)
          })
        } else {
          dispatch(alertMsg(res.msg))
        }
      }).catch(e => {
        dispatch(endLoad())
        dispatch(alertMsg(e))
      })
    }
  }

  disableSnackBar() {
    this.setState({
      showSnackBar: false
    })
  }

  // 选择题答案 check
  handleClickCheckBox(isRight, subject, id) {
    // 开始时 默认值都为 false
    // 将对应 id 值的 checkbox 值拼装
    // questionid 要通过后端 insert WarmupPractice 返回得到
    let { choices } = this.state
    choices[id] = { sequence: id + 1, isRight, subject: _.trim(subject) }
    this.setState({
      choices: choices
    })
  }


  onAnswerChange(value, idx) {
    const {choiceList = []} = this.state;
    if (value != choiceList[idx].isRight) {
      _.set(choiceList[idx], "isRight", value === '√');
      this.setState({choiceList, edit: true})
    }
  }

  onChoiceEdit(idx) {
    const {choiceList = []} = this.state;
    _.set(choiceList[idx], "choiceEdit", true);
    this.setState({choiceList})
  }

  onChoiceChange(value, idx) {
    const {choiceList = []} = this.state;
    if (value !== choiceList[idx].subject) {
      _.set(choiceList[idx], "subject", value);
      _.set(choiceList[idx], "choiceEdit", false);
      this.setState({choiceList, edit: true})
    }
  }

  render() {
    const {
      question, type, analysis,
      difficulty, knowledgeId, problemId, sequence,
      practiceUid, example,
      problems, knowledgesForSelect,choiceList,
      showSnackBar
    } = this.state

    const renderProblemSelect = () => {
      return (
        <SelectField
          floatingLabelText="所在小课" maxHeight={300} disabled={true}
          value={problemId}
        >
          {
            problems.map((item, idx) => {
              return (
                <MenuItem key={idx} value={item.id} primaryText={item.id + "、" + item.problem}/>
              )
            })
          }
        </SelectField>
      )
    }

    const renderKnowledgeSelect = () => {
      return (
        <SelectField
          floatingLabelText="所在知识点" maxHeight={400} disabled={true}
          value={knowledgeId}
         >
          {
            knowledgesForSelect.map((item, idx) => {
              return (
                <MenuItem value={item.id} primaryText={item.id + "、" + item.knowledge} key={idx}/>
              )
            })
          }
        </SelectField>
      )
    }

    const renderChoices = () => {
      return (
        <div className="choice-list">
          {choiceList.map((choice, idx) => choiceRender(choice, idx))}
        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const {id, subject, choiceEdit, isRight} = choice;
      return (
        <div key={id} className={`choice`}>
          <div className="select">
            <SelectField style={{width:'70'}}
                         floatingLabelText="选项" maxHeight={300}
                         value={isRight === true ? 'true' : 'false'}
                         onChange={(e) => this.onAnswerChange(e.target.textContent, idx)}
            >
              <MenuItem key={1} value={'true'} primaryText={'√'}/>
              <MenuItem key={2} value={'false'} primaryText={'×'}/>
            </SelectField>
          </div>
          {
            choiceEdit ?
              <input type="text" className="text"
                     onBlur={(e) => this.onChoiceChange(e.currentTarget.value, idx)} defaultValue={subject}/>
              : <div className="text" onClick={() => this.onChoiceEdit(idx)}>{subject}</div>
          }
        </div>
      )
    }


    /**
     * 加载主体信息
     **/
    const renderMainInfo= ()=>{
      const { questionEdit, analysisEdit,choiceList = []} = this.state
      return(

      <div className="intro-container">
        <div className="question">
          <div className="question-title">【题干（点击内容区进行编辑）】</div>
          {
            questionEdit ?
              <Editor id={`editor1`} value={decodeTextAreaString3(question)} ref="editor_question"/> :
              <div className="context" dangerouslySetInnerHTML={{__html: question}}
                   onClick={() => this.setState({questionEdit: true})}></div>
          }
        </div>
        <div className="analysis">
          <div className="analysis-title">【解析（点击内容区进行编辑）】</div>
          {
            analysisEdit ?
              <Editor id={`editor2`} value={decodeTextAreaString3(analysis)} ref="editor_analysis"/> :
              <div className="context" dangerouslySetInnerHTML={{__html: analysis}}
                   onClick={() => this.setState({analysisEdit: true})}></div>
          }
        </div>
      </div>
      )
    }

    const renderOtherComponents = () => {
      return (
        <Snackbar
          open={showSnackBar}
          message="提交数据成功"
          autoHideDuration={1000}
        />
      )
    }

    return (
      <div className="warmup-practice-edit-input-container">
        <div className="practice-input-page">
          <div className="practice-header">巩固练习更新页面</div>
          <div className="practice-init">
            <div className="practice-step">Step1、所在小课及知识点</div>
            <div className="selecte-field">
              {renderProblemSelect()}
              {renderKnowledgeSelect()}
            </div>
          </div>
          <div className="practice-basis">
            <div className="practice-step">Step2、基本要点</div>
            <br/>
            <div className="basis-flex-box">
              <TextField
                hintText="在这里输入练习唯一 id" floatingLabelText=" 练习唯一 id" value={ practiceUid } readOnly="readonly"
                onChange={(ev, value) => {
                  this.setState({ practiceUid: value })
                }}
              />
              <TextField
                hintText="在这里输入题目顺序" floatingLabelText="题目顺序" value={ sequence } readOnly="readonly"
                onChange={(ev, value) => {
                  this.setState({ sequence: value })
                }}
              />
            </div>
          </div>
          <div className="practice-main">
            <div className="practice-step">Step3、更新主体详情</div>
            {renderMainInfo()}
            <div className="practice-choice ">
              <div className="practice-step">Step4、修改巩固练习选项</div>
              {renderChoices()}
            </div>
          </div>
          <div className="practice-addition">
            <div className="practice-step">Step5、修改额外信息</div>
            <div className="pratice-tip">1）选择题目类型</div>
            <RadioButtonGroup name="typeGroup" className="radio-group"
                              valueSelected={type}
                              onChange={(ev, value) => this.setState({ type: value })}>
              <RadioButton value={1} label="单选"/>
              <RadioButton value={2} label="多选"/>
            </RadioButtonGroup>
            <div className="pratice-tip">2）选择题目难易度</div>
            <RadioButtonGroup name="typeGroup" className="radio-group"
                              valueSelected={difficulty}
                              onChange={(ev, value) => this.setState({ difficulty: value })}>
              <RadioButton value={1} label="容易"/>
              <RadioButton value={2} label="普通"/>
              <RadioButton value={3} label="困难"/>
            </RadioButtonGroup>
            <div className="pratice-tip">3）该题是否为例题</div>
            <RadioButtonGroup name="exampleGroup" className="radio-group"
                              valueSelected={example}
                              onChange={(ev, value) => this.setState({ example: value })}>
              <RadioButton value={0} label="否"/>
              <RadioButton value={1} label="是"/>
            </RadioButtonGroup>
          </div>
          <RaisedButton
            className="submit-btn" label="提交题目" primary={true}
            onTouchTap={this.submitWarmupPractice.bind(this)}/>
        </div>
        {renderOtherComponents()}
      </div>
    )
  }

}


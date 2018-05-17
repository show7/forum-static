import * as React from 'react'
import { connect } from "react-redux"
import _ from 'lodash'
import { addProblemAndReviewSchedule, loadProblem, saveProblem } from './async'
import { SelectField, MenuItem, RaisedButton, TextField, FlatButton, Snackbar } from 'material-ui'
import Editor from 'components/editor/Editor'
import { ProblemSelector } from '../component/ProblemSelector'
import { CatalogSelector } from '../component/CatalogSelector'
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { AudioModal } from '../component/AudioModal'

interface ProblemImportState {
  // 后台返回数据
  add: boolean,
  select: boolean,
  problemAudio:boolean,

  // SnackBar
  snackShow: boolean,
  snackMessage: string,
}

@connect(state => state)
export default class ProblemImport extends React.Component<any, ProblemImportState> {

  constructor() {
    super()
    // 设置初始值
    this.state = {
      snackShow: false,
      snackMessage: '',
      add: false,
      select: false,
      problemAudio:false,
      audioId:0
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
  }

  handleClickUpdateProblem() {
    const { id, problem, length, abbreviation, audioId, who } = this.state
    const { dispatch } = this.props
    const why = this.refs.why.getValue()
    const how = this.refs.how.getValue()
    const { catalogId, subCatalogId } = this.refs.catalog.getValue()
    let param = { id, problem, length, abbreviation, why, how, who, catalogId, subCatalogId ,audioId}

    if(_.isEmpty(problem) || !length || _.isEmpty(abbreviation) ||
      _.isEmpty(why) || _.isEmpty(how) || _.isEmpty(who) || !catalogId || !subCatalogId) {
      dispatch(alertMsg('请将所有信息填写完毕'))
      return
    }

      saveProblem(param ).then(res => {
        if(res.code === 200) {
          this.setState({ snackShow: true, snackMessage: '添加小课成功', add:false, select:true })
        } else {
          this.setState({ snackShow: true, snackMessage: '添加小课失败' })
        }
      })
  }

  closeSnackShow() {
    this.setState({ snackShow: false })
  }

  onSelect(id) {
    loadProblem(id).then(res => {
      this.setState(res.msg)
    })
  }

  render() {
    const { id, problem, length, catalogId, subCatalogId, who, why, how, abbreviation,
      audioId, snackShow, snackMessage, add, select, problemAudio } = this.state

    const renderSelect = () => {
      return (
        <div>
          <RaisedButton
            label="添加小课" primary={true}
            style={{marginRight:50}}
            onClick={() => this.setState({add:true, select:true})}
          />
          <RaisedButton
            label="更新小课" primary={true}
            onClick={() => this.setState({add:false, select:true})}
          />
        </div>
      )
    }

    const renderAddName = () => {
      if(add) {
        return (
          <TextField
            value={problem}
            onChange={(e, v) => this.setState({ problem: v })}
          />
        )
      } else {
        return (
          <ProblemSelector select={(id)=>this.onSelect(id)}></ProblemSelector>
        )
      }
    }

    const renderProblemAudio = ()=>{
        return (
          <AudioModal ref="problemAudio" prefix="problem" audioId={audioId} upload={(id)=>this.setState({audioId:id})}
                      close={()=>this.setState({problemAudio:false})}></AudioModal>
        )
    }
    return (
      <div className="problem-import-container">
        <div style={{ padding: 50 }}>

          <FlatButton label="一、小课标题"/><br/>
          {
            select ? renderAddName() : renderSelect()
          }
          <br/>
          <FlatButton label="二、小课语音"/><br/>
          {problemAudio? renderProblemAudio() : <RaisedButton
              label="上传语音" primary={true}
              onClick={() => this.setState({problemAudio:true})}
            />}
          <br/>
          <FlatButton label="三、小课长度"/><br/>
          <TextField
            value={length}
            onChange={(e, v) => this.setState({ length: v })}
          /><br/>
          <FlatButton label="四、小课缩略名称"/><br/>
          <TextField
            value={abbreviation}
            onChange={(e, v) => this.setState({ abbreviation: v })}
          /><br/>
          <FlatButton label="五、小课类别"/><br/>
          <CatalogSelector catalogId={catalogId} subCatalogId={subCatalogId} ref="catalog"></CatalogSelector><br/>
          <FlatButton label="六、课程介绍"/><br/>
          <Editor
            id="why" ref="why"
            value={why}
          />
          <FlatButton label="七、适用人群"/><br/>
          <TextField
            onChange={(e, v) => this.setState({ who: v })}
            value={who}
            multiLine={true}
          /><br/>
          <FlatButton label="八、知识体系"/><br/>
          <Editor
            id="how" ref="how"
            value={how}
          /><br/>
          <RaisedButton
            label="更新数据" primary={true}
            onClick={() => this.handleClickUpdateProblem()}
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

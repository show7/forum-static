import * as React from 'react'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { loadQrCode, loadQrCodeByRule } from './async'
import { connect } from 'react-redux'
import { RaisedButton, TextField } from 'material-ui'
import './GenerateQrCode.less'
import * as _ from 'lodash'
import RuleConfig from '../component/RuleConfig'

/**
 * 推广二维码
 */
@connect(state => state)
export default class GenerateQrCode extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = ({
      scene: '',
      img: '',
      remark: '',
      ruleList: [],
      ruleSum: 1
    })
  }

  componentWillMount(props) {

  }

  generateQrCode = () => {
    const { dispatch } = this.props
    const { scene, remark, ruleList } = this.state
    if(_.isEmpty(scene) || _.isEmpty(remark)) {
      dispatch(alertMsg('请输入活动英文名和中文活动名称'))
      return
    }
    if(ruleList.length < 1) {
      dispatch(alertMsg('请输入默认规则'))
      return
    }
    const param = {
      scene,
      remark,
      ruleList
    }
    dispatch(startLoad())
    loadQrCodeByRule(param).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          img: msg
        })
      }
      else {
        dispatch(endLoad())
        dispatch(alertMsg(msg))
      }
    })
  }

  addRule() {
    this.setState({ ruleSum: this.state.ruleSum + 1 })
  }

  handleRule(memberTypeIds, link, content, id) {
    let { ruleList } = this.state
    ruleList[id] = { memberTypeIds, link, content }
    this.setState({
      ruleList: ruleList
    })
  }

  render() {
    const { scene, img, remark } = this.state

    const renderRules = () => {
      let rules = []
      for(let i = 0; i < this.state.ruleSum; i++) {
        rules.push(
          <RuleConfig key={i} data={i}
                      onChange={(memberTypeIds, link, content) => this.handleRule(memberTypeIds, link, content, i)}/>
        )
      }
      return rules
    }

    const renderScene = () => {
      return (
        <div className="scene-container">
          <TextField floatingLabelText='请输入英文活动名和编号（格式例如：subscribe_push_1）' fullWidth={200} value={scene}
                     onChange={(e, v) => this.setState({ scene: v })}/>
          <TextField floatingLabelText='请输入中文活动名称' value={remark} onChange={(e, v) => this.setState({ remark: v })}/>
          <div>
            {renderRules()}
            <RaisedButton
              label="增加规则" primary={true}
              style={{ marginLeft: 50, marginBottom: 50 }}
              onClick={() => this.addRule()}/>
          </div>
          <div>
            <RaisedButton
              label="点击生成" primary={true}
              style={{ marginLeft: 50 }}
              onClick={() => this.generateQrCode()}
            />
          </div>
        </div>
      )
    }
    return (
      <div className="qrcode-container">
        {renderScene()}
        {img != '' && <div className="hint-container">
          <div>活动链接地址：</div>
          右击图片进行保存</div>}
        <img src={img}/>

      </div>
    )
  }
}


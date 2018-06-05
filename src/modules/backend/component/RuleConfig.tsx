import * as React from 'react'
import TextField from 'material-ui/TextField'
import './RuleConfig.less'

/**
 * 规则配置
 */

export default class RuleConfig extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      memberTypeIds: '',
      content: '',
      link: ''
    }
  }

  handleOnChange() {
    const { memberTypeIds, content, link } = this.state;
    this.props.onChange(memberTypeIds, link, content);
  }

  handleChangeRule(e, v) {
    this.setState({ memberTypeIds: v }, () => {
      this.handleOnChange();
    })
  }

  handleChangeContent(e, v) {
    this.setState({ content: v }, () => {
      this.handleOnChange();
    })
  }

  handleChangeLink(e, v) {
    this.setState({ link: v }, () => {
      this.handleOnChange();
    })
  }

  render() {
    console.log(this.props.data)
    console.log(this.props.data === 0)
    return (
      <div className="rule-container">
        {this.props.data !== 0 &&
        <div>
          <div>3-核心能力，5-专项课，8-商业思维；例如：3,5</div>
          <TextField hintText="会员类型id，用英文逗号分隔" multiLine={true} onChange={(e, v) => this.handleChangeRule(e, v)}/>
        </div>
        }
        <div>
          <div>{'预置变量：{nickname} 昵称,{url}'}跳转链接<br/>例如：<br/>
            你好，{'{nickanme}'}
            即将跳转到: {'{url}'}
          </div>
          <TextField hintText="请输入关注文案" multiLine={true} onChange={(e, v) => this.handleChangeContent(e, v)}/>
        </div>
        <div>
          <TextField hintText="请输入跳转链接" multiLine={true} onChange={(e, v) => this.handleChangeLink(e, v)}/>
        </div>
      </div>
    )
  }

}

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
          <TextField hintText="请输入规则" multiLine={true} onChange={(e, v) => this.handleChangeRule(e, v)}/>
        </div>
        }
        <div>
          <TextField hintText="请输入关注文案" multiLine={true} onChange={(e, v) => this.handleChangeContent(e, v)}/>
        </div>
        <div>
          <TextField hintText="请输入跳转链接" multiLine={true} onChange={(e, v) => this.handleChangeLink(e, v)}/>
        </div>
      </div>
    )
  }

}

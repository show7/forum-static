import * as React from 'react'
import './SubmitRichText.less'
import Editor from '../../../../components/editor/Editor'
import AlertMessage from '../../../../components/AlertMessage'
import { TextField, RaisedButton } from 'material-ui'
import { saveRichText, loadRichText } from '../async'

export default class SubmitRichText extends React.Component {

  constructor() {
    super()
    this.state = {
      title: '',
      copyValue: '',
      select: false,
      showAlert: false,
      add: false,
      updateContent: false,
      uuid: null,
    }
  }

  submitValue() {
    const { title, uuid } = this.state
    saveRichText({
      title,
      content: this.refs.editorValue.getValue(),
      uuid,
    }).then(res => {
      if(res.code === 200) {
        this.setState({
          showAlert: true,
          copyValue: res.msg,
        })
      }
    })
  }

  loadValue() {
    const { uuid } = this.state
    loadRichText(uuid).then(res => {
      if(res.code === 200) {
        const { msg } = res
        this.setState({
          title : msg.title
        })
        this.refs.editorValue.setValue(msg.content)
      }
    })
  }

  render() {
    const {
      showAlert,
      title,
      editorValue,
      select,
      add,
      updateContent,
    } = this.state

    const renderAlert = () => {
      const actions = [
        {
          label: '确认',
          onClick: () => {
            const input = document.createElement('input')
            document.body.appendChild(input)
            input.setAttribute('value', this.state.copyValue)
            input.select()
            document.execCommand('copy')
            document.body.removeChild(input)
            this.setState({ showAlert: false })
          },
        },
      ]
      return <AlertMessage actions={actions} open={showAlert} content={this.state.copyValue}/>
    }

    const renderSelect = () => {
      return (
        <div>
          <RaisedButton
            label="更新内容" primary={true}
            onClick={() => this.setState({updateContent:true, select: true})}
          />
        </div>
      )
    }

    return (
      <div className="submit-richtext-container">
        {!select && renderSelect() }
        { updateContent  &&
          <div>
            <TextField hintText="请输入uuid" onChange={(ev, value) => this.setState({ uuid: value, })}/>
            <RaisedButton
              label="查询" primary={true}
              onClick={() => this.loadValue()}
            />
          </div>
        }

        <TextField hintText="请输入文章标题"
                   value={title}
                   onChange={(ev, value) => this.setState({ title: value, })}/>
        <br/>
        <Editor ref="editorValue" value={editorValue}/>
        <br/>
        <RaisedButton label='提交' primary={true} onClick={() => this.submitValue()}/>
        {renderAlert()}
      </div>
    )
  }

}

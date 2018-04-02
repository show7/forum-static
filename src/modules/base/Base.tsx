import * as React from 'react'
import { connect } from 'react-redux'
import { set, alertMsg } from 'redux/actions'
import { Grid, Row, Col } from 'react-flexbox-grid'
import Avatar from 'material-ui/Avatar'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './Base.less'
import { style } from './Base.ts'
import AlertMessage from '../../components/AlertMessage'
import NavigatorBar from '../../components/NavigatorBar'
import Loading from '../../components/Loading'
import { isPending, renderExist } from '../../utils/helpers'
import { pget } from '../../utils/request'
import RequestComponent from '../../components/RequestComponent'

@connect(state => state)
export default class Main extends React.Component<any, any> {

  constructor (props) {
    super(props)
    this.state = {
      open: false,
      showPage: false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount () {
    // 通过此接口弥补 window.ENV
    pget('/rise/customer/info').then(res => {
      if (res.code === 200) {
        window.ENV.userName = res.msg.nickname
        window.ENV.headImgUrl = res.msg.headimgurl
      }
      this.setState({ showPage: true })
    })
  }

  closeBaseAlert () {
    const { dispatch } = this.props
    dispatch(set('base.showModal', false))
  }

  render () {
    if (!this.state.showPage) {
      return <div></div>
    }

    return (
      <MuiThemeProvider>
        <div className="container">
          <RequestComponent/>
          <NavigatorBar/>
          <div style={{ marginTop: 80 }}>
            {this.props.children}
          </div>
          <AlertMessage open={this.props.base.showModal}
                        modal={false}
                        content={this.props.base.alertMsg.msg}
                        title={this.props.base.alertMsg.title}
                        handleClose={() => this.closeBaseAlert()}/>
          {renderExist(isPending(this.props, 'base.loading'), <Loading/>)}
        </div>
      </MuiThemeProvider>
    )
  }
}

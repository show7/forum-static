import * as React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { searchInfo, searchInfoByClass } from './async'
import Dialog from 'material-ui/Dialog'
import { Divider, MenuItem, SelectField } from 'material-ui'
import './UserInfo.less'
import { loadClassNameAndGroup } from '../../../asst/async'
import * as _ from 'lodash'
import { MessageTable } from '../../admin/message/autoreply/MessageTable'

const cellStyle = {
  paddingLeft: 0,
  paddingRight: 0
}

@connect(state => state)
export default class UserInfo extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      page: 1,
      meta: [
        {tag:'headimgurl',alias:'头像',style: _.merge({}, cellStyle, { width: '100px' })},
        { tag: 'nickname', alias: '昵称', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'memberId', alias: '学号', style: _.merge({}, cellStyle, { width: '100px' }) },
        { tag: 'memberTypes', alias: '会员类型', style: _.merge({}, cellStyle,{width:'150px'}) }
      ],
      searchId: '',
      selected: false,
      classSearch: false,
      className: '',
      groupId: '',
      classNames: [],
      groupIds: [],
      openDialog: false,
      infos: [],
      info: ''
    }
  }

  componentWillMount() {
    loadClassNameAndGroup().then(res => {
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          classNames: msg.className,
          groupIds: msg.groupIds
        })
      }
    })
  }

  /**
   * 根据学号查询
   * @param memberId
   */
  searchUserInfo(searchId) {
    const { dispatch } = this.props
    dispatch(startLoad())

    searchInfo(searchId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          infos: msg
        })
      }
      else {
        dispatch(alertMsg(msg))
      }
    })
  }

  searchClass = () => {
    const { dispatch } = this.props
    const { className, groupId, page } = this.state
    if(_.isEmpty(className)) {
      dispatch(alertMsg('请选择班级'))
      return
    }
    dispatch(startLoad())
    searchInfoByClass(page, className, groupId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        this.setState({
          infos: msg.data,
          tablePage: res.msg.page
        })
      } else {
        dispatch(alertMsg(msg))
      }
    })

  }

  openDialog(item) {
    this.setState({
      openDialog: true,
      info: item
    })
  }

  closeDialog = () => {
    this.setState({
      openDialog: false
    })
  }

  handlePageClick(page) {
    const { dispatch } = this.props
    const { className, groupId } = this.state
    dispatch(startLoad())
    searchInfoByClass(page, className, groupId).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ infos: res.msg.data, tablePage: res.msg.page, page: page })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  render() {
    const { searchId, selected, classSearch } = this.state

    const renderSelect = () => {

      return (
        <div className="select-container">
          <RaisedButton
            label="个人搜索" primary={true}
            style={{ marginRight: 50 }}
            onClick={() => this.setState({ classSearch: false, selected: true })}
          />
          <RaisedButton
            label="班级和小组搜索" primary={true}
            onClick={() => this.setState({
              selected: true,
              classSearch: true
            })}
          />
        </div>
      )
    }

    const renderSearch = () => {
      return (
        <div className="search-container">
          {classSearch ? renderClassSearch() : renderNormalSearch()}
        </div>
      )
    }

    const renderNormalSearch = () => {
      return (
        <div className="search-item-container">
          <TextField hintText={'输入学号/ProfileId/RiseId/昵称查询'} style={{ margin: 40, width: 300 }} value={searchId}
                     onChange={(e, v) => this.setState({ searchId: v })}/>
          <RaisedButton
            label="点击查询" onClick={() => this.searchUserInfo(searchId)}
          /><br/>
          {renderMessage()}
          {renderDialog()}
        </div>
      )
    }

    const renderClassSearch = () => {
      return (
        <div className="class-item-container">
          {renderClassName()}
          {renderGroupId()}
          <div className="class-search-container">
            <RaisedButton
              label="点击查询" onClick={() => this.searchClass()}
            /><br/>
          </div>
          {renderMessage()}
          {renderDialog()}
        </div>
      )
    }

    const renderClassName = () => {
      const { className, classNames } = this.state
      return (
        <div className="classname-container">
          <SelectField
            floatingLabelText="选择班级名" maxHeight={300} value={className} onChange={(ev, value) => {
            this.setState({
              className: ev.target.textContent,
              groupId: '',
              page: 1
            })
          }}>
            {
              classNames.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item} primaryText={item}/>
                )
              })
            }
          </SelectField>
        </div>
      )
    }

    const renderGroupId = () => {
      const { className, groupId, groupIds } = this.state
      const group = _.filter(groupIds, { className: className })
      return (
        <div className="group-container">
          <SelectField
            floatingLabelText="选择小组" maxHeight={300} value={groupId} onChange={(ev, value) => {
            this.setState({
              groupId: ev.target.textContent,
              page: 1
            })
          }}>
            {
              group.map((item, idx) => {
                return (
                  <MenuItem key={idx} value={item.groupId} primaryText={item.groupId}/>
                )
              })
            }
          </SelectField>
        </div>
      )
    }

    const renderDialog = () => {
      const { openDialog, info } = this.state
      return (
        <Dialog open={openDialog} autoScrollBodyContent={true} modal={false}>
          <div className="bs-dialog">
            <div className="bs-dialog-header" style={{ marginTop: '0px', marginBottom: '20px' }}>
              用户信息
            </div>
            {renderDialogItem('昵称：', info.nickname)}
            {renderDialogItem('openid：', info.openid)}
            {renderDialogItem('学号：', info.memberId)}
            {renderDialogItem('真实姓名：', info.realName)}
            {renderDialogItem('收件人：', info.receiver)}
            {renderDialogItem('圈外id：', info.riseId)}
            {renderDialogItem('微信号：', info.weixinId)}
            {renderDialogItem('联系方式：', info.mobileNo)}

            <div className="bs-dialog-header" style={{ marginTop: '20px', marginBottom: '20px' }}>
              会员信息
            </div>

            {info.memberInfoDtos && info.memberInfoDtos.map((item, index) => {
              return (
                <div style={{marginBottom:'20px'}}>
                  {renderDialogItem('当前会员类型：', item.memberName)}
                  {renderDialogItem('入学日期：', item.openDate)}
                  {renderDialogItem('过期日期：',item.expireDate)}
                  {renderDialogItem('班级：', item.className)}
                  {renderDialogItem('小组：', item.groupId)}
                </div>
              )
            })
            }

            <div className="bs-dialog-header" style={{ marginTop: '20px', marginBottom: '20px' }}>
              工作情况
            </div>
            {renderDialogItem('行业：', info.industry)}
            {renderDialogItem('职业：', info.function)}
            {renderDialogItem('参加工作年份：', info.workingYear)}

            <div className="bs-dialog-header" style={{ marginTop: '20px', marginBottom: '20px' }}>
              地址信息
            </div>
            {renderDialogItem('国家：', info.country)}
            {renderDialogItem('省份：', info.province)}
            {renderDialogItem('城市：', info.city)}
            {renderDialogItem('地址：', info.address)}
            {
              <div ref="raisedButton">
                <RaisedButton
                  style={{ marginLeft: 30, marginTop: 30 }}
                  label="确定" primary={true}
                  onClick={() => {
                    this.closeDialog()
                  }}/>
              </div>
            }
          </div>
        </Dialog>
      )
    }

    const renderDialogItem = (label, value, br, key) => {
      return (
        <div className="bs-dialog-row" key={key}>
          <span className="bs-dialog-label">{label}</span>{br ? <br/> : null}

          <span className='bs-dialog-value'>
            {value}
          </span>
          <Divider/>
        </div>
      )
    }

    const renderMessage = () => {
      return (
        <MessageTable data={this.state.infos} meta={this.state.meta}
                      opsButtons={[{
                        editFunc: (item) => {this.openDialog(item)},
                        opsName: '查看详情'
                      }]}
                      page={this.state.tablePage} handlePageClick={(page) => this.handlePageClick(page)}
        />
      )
    }

    return (
      <div className="user-info-container">
        {selected ? renderSearch() : renderSelect()}
      </div>
    )
  }

}


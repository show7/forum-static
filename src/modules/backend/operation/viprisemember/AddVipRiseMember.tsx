import * as React from 'react'
import { TextField, RaisedButton, SelectField, MenuItem, DatePicker } from 'material-ui'
import './AddVipRiseMember.less'
import { openVipRiseMember, loadRiseMember } from '../async'
import _ from 'lodash'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { formatDate } from 'utils/helpers'

@connect(state => state)
export default class AddVipRiseMember extends React.Component {
  constructor() {
    super()
    this.state = {
      riseIds: [],
      month: 0,
      memo: '',
      memberTypeId: 0,
      memberTypes: [],
      startDate: formatDate(new Date(), 'yyyy-MM-dd'),
      vip: true,
    }
  }

  componentWillMount() {
    loadRiseMember().then(res => {
      this.setState({ memberTypes: res.msg })
    })
  }

  handleClickOpenRiseMember() {
    const { riseIds, month, memo, memberTypeId, vip, startDate } = this.state
    const { dispatch } = this.props
    if(_.isEmpty(riseIds) || month === 0 || memberTypeId === 0) {
      dispatch(alertMsg('请补充完整数据再提交'))
      return
    }

    if(month < 0 || month > 12) {
      dispatch(alertMsg('月份不能超过 12'))
      return
    }

    openVipRiseMember({riseIds, month, memo, memberTypeId, vip, startDate}).then(res => {
      if(res.code === 200) {
        dispatch(alertMsg('更新成功'))
      } else {
        dispatch(alertMsg(res.msg))
      }
    })
  }

  render() {
    const { memberTypeId, memberTypes } = this.state
    return (
      <div className="add-vip-risemember-container">
        <TextField
          multiLine={true}
          hintText="输入圈外 Id" onChange={(e, v) => this.setState({ riseIds: v.split('\n') })}/>
        <br/>
        <SelectField value={this.state.month}
                     floatingLabelText="选择会员有效期（月）"
                     onChange={(e, idx, value) => this.setState({ month: value })}>
          <MenuItem key={1} value={1} primaryText="1 个月"/>
          <MenuItem key={2} value={4} primaryText="4 个月"/>
          <MenuItem key={3} value={6} primaryText="6 个月"/>
          <MenuItem key={4} value={8} primaryText="8 个月"/>
          <MenuItem key={5} value={12} primaryText="12 个月"/>
        </SelectField>
        <br/>
        <SelectField value={this.state.vip}
                     floatingLabelText="是否vip"
                     onChange={(e, idx, value) => this.setState({ vip: value })}>
          <MenuItem key={1} value={true} primaryText="是"/>
          <MenuItem key={2} value={false} primaryText="否"/>
        </SelectField>
        <br/>
        <SelectField
          value={memberTypeId}
          floatingLabelText="选择会员类型"
          onChange={(e, idx, value) => {
                this.setState({
                  memberTypeId: value
                })
              }}
        >
          {
            memberTypes.map((item, idx) => {
              return (
                <MenuItem key={idx} value={item.id} primaryText={item.name}/>
              )
            })
          }
        </SelectField>
        <br/>
        <DatePicker hintText="选择会员开始时间，默认今天"
                    formatDate={(date) => formatDate(date, 'yyyy-MM-dd')}
                    mode="landscape"
                    onChange={(e, v) => this.setState({
                      startDate: formatDate(v, 'yyyy-MM-dd'),
                    })}/>
        <br/>
        <TextField hintText="用户身份（10字以内）" onChange={(e, v) => this.setState({ memo: v })}/>
        <br/>
        <RaisedButton label="提交" onClick={() => this.handleClickOpenRiseMember()} primary={true}/>
      </div>
    )
  }
}

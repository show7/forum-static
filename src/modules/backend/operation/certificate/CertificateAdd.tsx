import * as React from 'react'
import { Dialog, SelectField, MenuItem, TextField, RaisedButton, Snackbar } from 'material-ui'
import { addCertificate } from './async'
import { ProblemSelector } from '../../education/import/component/ProblemSelector'

interface CertificateAddState {
  year: number,
  month: number,
  identityType: any,
  memberIdListStr: any,
  riseIdListStr: any,
  showDialog: boolean,
  showSnack: boolean,
  memberTypeId: string,
  problemId: number,
  groupId: number,
  profileSearchType: number
}

export default class CertificateAdd extends React.Component<any, CertificateAddState> {

  constructor () {
    super()
    this.state = {}
  }

  // 证书类型 （1-优秀班长，2-优秀组长，3-优秀学员，4-优秀团队, 5-结课证书, 6-优秀助教，7-优秀班委）
  IdentityType = {
    EXCELLENT_CLASS_LEADER: 1,
    EXCELLENT_GROUP_LEADER: 2,
    EXCELLENT_STUDENT: 3,
    EXCELLENT_TEAM: 4,
    NORMAL_GRADUATE: 5,
    EXCELLENT_COACH: 6,
    EXCELLENT_COMMITTEE: 7,
  }

  MEMBERTYPE = {
    CORE_ABILITY: 3,
    CAMP: 5,
    MONTH_CAMP: 14,
    BUSINESS_THINK: 8,
    L1: 12,
    L2: 10,
  }

  ProfileSearchType = {
    MemberIdType: 1,
    RiseIdType: 2,
  }

  async handleInsertCertificate () {
    const {
      year, // 年份
      month,  // 月份
      identityType, // 证书类型
      memberTypeId, // 身份 id
      problemId,  // 课程 id
      memberIdListStr = '',  // memberId 列表
      riseIdListStr = '',  // riseId 列表
      profileSearchType, // 用户查找类型
    } = this.state
    let memberIds = memberIdListStr.split('\n')
    memberIds = memberIds.map(memberId => memberId.trim()).filter(memberId => memberId != '')

    let riseIds = riseIdListStr.split('\n')
    riseIds = riseIds.map(riseId => riseId.trim()).filter(riseId => riseId != '')

    let param = {
      year: year,
      month: month,
      type: identityType,
      memberTypeId: memberTypeId,
      problemId: problemId,
      memberIds: memberIds,
      riseIds: riseIds,
      profileSearchType: profileSearchType,
    }

    let addCertificateRes = await addCertificate(param)
    if (addCertificateRes.code === 200) {
      this.setState({ showSnack: true }, () => this.clear())
    }
  }

  clear () {
    this.setState({
      memberIdListStr: undefined,
      riseIdListStr: undefined,
      showDialog: false,
    })
  }

  render () {
    const {
      year,
      month,
      identityType,
      memberIdListStr = '',
      riseIdListStr = '',
      showDialog = false,
      showSnack = false,
      memberTypeId,
      problemId,
      groupId,
      profileSearchType,
    } = this.state

    const renderMonthItems = () => {
      const menuItems = []
      for (let i = 1; i <= 12; i++) {
        menuItems.push(<MenuItem key={i}
                                 value={i}
                                 primaryText={`${i}月`}></MenuItem>)
      }
      return menuItems
    }

    return (
      <section style={{ padding: '25px 50px' }}>
        <SelectField value={year}
                     floatingLabelText="选择证书年份"
                     onChange={(e, i, v) => this.setState({ year: v })}>
          <MenuItem value={2017}
                    primaryText="2017"/>
          <MenuItem value={2018}
                    primaryText="2018"/>
          <MenuItem value={2019}
                    primaryText="2019"/>
        </SelectField>
        <br/>
        <SelectField value={month}
                     floatingLabelText="选择证书月份"
                     onChange={(e, i, v) => this.setState({ month: v })}>
          {renderMonthItems()}
        </SelectField>
        <br/>
        <SelectField floatingLabelText={'选择生成学习项目'}
                     value={memberTypeId}
                     onChange={(event, index, value) => this.setState({ memberTypeId: value })}>
          <MenuItem value={this.MEMBERTYPE.CAMP}
                    primaryText={'深度阅读训练营'}></MenuItem>
          <MenuItem value={this.MEMBERTYPE.CORE_ABILITY}
                    primaryText={'核心能力'}></MenuItem>
          <MenuItem value={this.MEMBERTYPE.BUSINESS_THINK}
                    primaryText={'商业思维'}></MenuItem>
          <MenuItem value={this.MEMBERTYPE.MONTH_CAMP}
                    primaryText={'专项课'}></MenuItem>
          <MenuItem value={this.MEMBERTYPE.L1}
                    primaryText={'L1'}></MenuItem>
          <MenuItem value={this.MEMBERTYPE.L2}
                    primaryText={'L2'}></MenuItem>
        </SelectField>
        <br/>
        <SelectField value={identityType}
                     floatingLabelText="选择身份类型"
                     onChange={(e, i, v) => this.setState({ identityType: v, problemId: -1 })}>
          <MenuItem value={this.IdentityType.EXCELLENT_CLASS_LEADER}
                    primaryText="优秀班长"/>
          <MenuItem value={this.IdentityType.EXCELLENT_GROUP_LEADER}
                    primaryText="优秀组长"/>
          <MenuItem value={this.IdentityType.EXCELLENT_STUDENT}
                    primaryText="优秀学员"/>
          <MenuItem value={this.IdentityType.EXCELLENT_TEAM}
                    primaryText="优秀团队"/>
          <MenuItem value={this.IdentityType.NORMAL_GRADUATE}
                    primaryText="结课证书"/>
          <MenuItem value={this.IdentityType.EXCELLENT_COACH}
                    primaryText="优秀教练"/>
          <MenuItem value={this.IdentityType.EXCELLENT_COMMITTEE}
                    primaryText="优秀班委"/>
        </SelectField>
        <br/>
        {
          this.state.identityType === this.IdentityType.EXCELLENT_TEAM &&
          <div>
            <TextField value={memberIdListStr}
                       floatingLabelText="输入小组号，如 1，2"
                       onChange={(e, v) => this.setState({ memberIdListStr: v })}>
            </TextField>
            <br/>
          </div>
        }
        <ProblemSelector select={(problemId) => this.setState({ problemId: problemId })}/>


        <SelectField value={profileSearchType}
                     floatingLabelText="选择学员查找方式"
                     onChange={(e, i, v) => this.setState({ profileSearchType: v })}>
          <MenuItem value={this.ProfileSearchType.MemberIdType}
                    primaryText="学号"/>
          <MenuItem value={this.ProfileSearchType.RiseIdType}
                    primaryText="圈外 id"/>
        </SelectField>

        <br/>

        {
          profileSearchType == this.ProfileSearchType.MemberIdType &&
          <TextField value={memberIdListStr}
                     multiLine={true}
                     floatingLabelText="输入学号，换行区分"
                     onChange={(e, v) => this.setState({ memberIdListStr: v })}>
          </TextField>
        }
        {
          profileSearchType == this.ProfileSearchType.RiseIdType &&
          <TextField value={riseIdListStr}
                     multiLine={true}
                     floatingLabelText="输入圈外 id，换行区分"
                     onChange={(e, v) => this.setState({ riseIdListStr: v })}>
          </TextField>
        }

        <br/>
        <RaisedButton label="点击提交"
                      primary={true}
                      onClick={() => this.setState({ showDialog: true })}/>
        <Dialog open={showDialog}>
          {`您将要添加 ${year} 年 ${month} 月的证书，请确认`}
          <br/>
          <div style={{ padding: '20px 50px' }}>
            <RaisedButton style={{ marginTop: 30 }}
                          label="取消"
                          primary={true}
                          onClick={() => this.setState({ showDialog: false })}/>
            <RaisedButton style={{ marginLeft: 30 }}
                          label="确认"
                          primary={true}
                          onClick={() => this.handleInsertCertificate()}/>
          </div>
        </Dialog>
        <Snackbar open={showSnack}
                  message="添加成功"
                  autoHideDuration={3000}
                  onRequestClose={() => {
                    this.setState({ showSnack: false })
                  }}/>
      </section>
    )
  }

}

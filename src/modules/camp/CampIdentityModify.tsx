import * as React from 'react';
import { Dialog, SelectField, MenuItem, TextField, RaisedButton, Snackbar } from 'material-ui';
import { addCertificate } from './async';

interface CampIdentityModifyState {
  year: number,
  month: number,
  identityType: any,
  memberIdListStr: any,
  showDialog: boolean,
  showSnack: boolean,
  memberTypeId: string
}

export default class CampIdentityModify extends React.Component<any, CampIdentityModifyState> {

  constructor () {
    super();
    this.state = {};
  }

  // 证书类型 （1-优秀班长，2-优秀组长，3-优秀学员，4-优秀团队, 5-结课证书, 6-优秀助教，7-优秀班委）
  identityType = {
    EXCELLENT_CLASS_LEADER: 1,
    EXCELLENT_GROUP_LEADER: 2,
    EXCELLENT_STUDENT: 3,
    EXCELLENT_TEAM: 4,
    NORMAL_GRADUATE: 5,
    EXCELLENT_COACH: 6,
    EXCELLENT_COMMITTEE: 7,
  };

  MEMBERTYPE = {
    CORE_ABILITY: 3,
    MONTH_CAMP: 5,
    BUSINESS_THINKG: 8,
  };

  handleMemberIds () {
    const { year, month, identityType, memberIdListStr, memberTypeId } = this.state;
    let memberIds = memberIdListStr.split('\n');
    memberIds = memberIds.map(memberId => memberId.trim()).filter(memberId => memberId != '');
    console.log(memberIds);
    let param = { year: year, month: month, type: identityType, memberTypeId: memberTypeId, memberIds: memberIds };
    addCertificate(param).then(res => {
      if (res.code === 200) {
        this.setState({ showSnack: true });
        setTimeout(() => {
          this.clear();
        }, 1000);
      }
    }).catch(e => alert(e));
  }

  clear () {
    this.setState({
      year: '', month: '', identityType: 0, memberIdListStr: '', showDialog: false,
    });
  }

  render () {
    const {
      year, month, identityType = 0, memberIdListStr = '', showDialog = false, showSnack = false, memberTypeId = 0,
    } = this.state;

    const renderMonthItems = () => {
      const menuItems = [];
      for (let i = 1; i <= 12; i++) {
        menuItems.push(<MenuItem key={i}
                                 value={i}
                                 primaryText={`${i}月`}></MenuItem>);
      }
      return menuItems;
    };

    return (
      <section style={{ padding: '25px 50px' }}>
        <SelectField value={year}
                     floatingLabelText="选择证书年份"
                     onChange={(e, i, v) => this.setState({ year: v })}>
          <MenuItem value="2017"
                    primaryText="2017"/>
          <MenuItem value="2018"
                    primaryText="2018"/>
          <MenuItem value="2019"
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
          <MenuItem key={11}
                    value={this.MEMBERTYPE.CORE_ABILITY}
                    primaryText={'核心能力'}></MenuItem>
          <MenuItem key={12}
                    value={this.MEMBERTYPE.BUSINESS_THINKG}
                    primaryText={'商业思维'}></MenuItem>
          <MenuItem key={13}
                    value={this.MEMBERTYPE.MONTH_CAMP}
                    primaryText={'专项课'}></MenuItem>
        </SelectField>
        <br/>
        <SelectField value={identityType}
                     floatingLabelText="选择身份类型"
                     onChange={(e, i, v) => this.setState({ identityType: v })}>
          <MenuItem value={this.identityType.EXCELLENT_CLASS_LEADER}
                    primaryText="优秀班长"/>
          <MenuItem value={this.identityType.EXCELLENT_GROUP_LEADER}
                    primaryText="优秀组长"/>
          <MenuItem value={this.identityType.EXCELLENT_STUDENT}
                    primaryText="优秀学员"/>
          <MenuItem value={this.identityType.EXCELLENT_TEAM}
                    primaryText="优秀团队"/>
          <MenuItem value={this.identityType.NORMAL_GRADUATE}
                    primaryText="优秀结课"/>
          <MenuItem value={this.identityType.EXCELLENT_COACH}
                    primaryText="优秀教练"/>
          <MenuItem value={this.identityType.EXCELLENT_COMMITTEE}
                    primaryText="优秀班委"/>
        </SelectField>
        <br/>
        <TextField value={memberIdListStr}
                   multiLine={true}
                   floatingLabelText="输入学号，换行区分"
                   onChange={(e, v) => this.setState({ memberIdListStr: v })}>
        </TextField>
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
                          onClick={() => this.handleMemberIds()}/>
          </div>
        </Dialog>
        <Snackbar open={showSnack}
                  message="添加成功"
                  autoHideDuration={3000}
                  onRequestClose={() => {
                    this.setState({ showSnack: false });
                  }}/>
      </section>
    );
  }

}

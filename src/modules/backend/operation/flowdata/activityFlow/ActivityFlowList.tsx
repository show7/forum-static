import * as React from 'react';
import { Table } from 'antd';
import { deleteActivityFlow, loadAllActivitiesFlow } from '../async';
import requestProxy from 'components/proxy/requestProxy';
import { RaisedButton, Dialog } from 'material-ui';
import ActivityFlowDetail from './ActivityFlowDetail';

export default class ActivityFlowList extends React.Component {

  constructor () {
    super();
    this.state = {
      activityList: [],
      showDialog: false,
      editItem: {},
    };
    this.columns = [
      { key: 1, title: '名称', dataIndex: 'name' },
      { key: 2, title: '举办方', dataIndex: 'holder' },
      { key: 3, title: '举办地点', dataIndex: 'location' },
      { key: 4, title: '优先次序（值越大越靠前）', dataIndex: 'sequence' },
      {
        key: 5, title: '操作',
        render: (text, record) => {
          return (
            <div style={{ color: '#55cbcb', cursor: 'pointer' }}>
              <span onClick={() => this.handleEditRecord(record)}>编辑</span>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <span onClick={() => this.handleDeleteRecord(record)}>删除</span>
            </div>
          );
        },
      },
    ];
  }

  componentDidMount () {
    this.loadData();
  }

  async loadData () {
    let activitiesRes = await loadAllActivitiesFlow();
    this.setState({
      activityList: activitiesRes.msg,
    });
  }

  async handleEditRecord (item) {
    this.setState({
      showDialog: true,
      editItem: item,
    });
  }

  async handleDeleteRecord (item) {
    const { id } = item;
    let deleteRes = await deleteActivityFlow(id);
    if (deleteRes.code === 200) {
      requestProxy.alertMessage('删除活动数据成功');
      this.loadData();
    }
  }

  render () {
    const {
      activityList,
      showDialog,
      editItem,
    } = this.state;

    return (
      <div className="activity-flow-list-container"
           style={{ margin: '2rem' }}>
        <RaisedButton label="新增"
                      primary={true}
                      onClick={() => this.handleEditRecord()}/>
        <br/><br/>
        <Table columns={this.columns}
               dataSource={activityList}/>
        <Dialog open={showDialog}
                autoScrollBodyContent={true}>
          <ActivityFlowDetail data={editItem}
                              requestClose={() => {
                                this.setState({ showDialog: false });
                                this.loadData();
                              }}/>
        </Dialog>
      </div>
    );
  }

}

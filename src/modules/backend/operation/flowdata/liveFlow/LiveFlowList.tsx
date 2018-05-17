import * as React from 'react';
import { Table } from 'antd';
import { deleteLivesFlow, loadAllLivesFlow } from '../async';
import { formatDate } from 'utils/helpers';
import LiveFlowDetail from './LiveFlowDetail';
import requestProxy from 'components/proxy/requestProxy';
import { RaisedButton, Dialog } from 'material-ui';

export default class LiveFlowList extends React.Component {

  constructor () {
    super();
    this.state = {
      liveFlowList: [],
      showDialog: false,
      editItem: {},
    };
    this.columns = [
      { key: 1, title: '名称', dataIndex: 'name' },
      { key: 2, title: '主讲人', dataIndex: 'speaker' },
      {
        key: 3, title: '开始时间', dataIndex: 'startTime',
        render: (text) => formatDate(new Date(text), 'yyyy-MM-dd hh:mm:ss'),
      },
      {
        key: 4, title: '结束时间', dataIndex: 'endTime',
        render: (text) => formatDate(new Date(text), 'yyyy-MM-dd hh:mm:ss'),
      },
      { key: 5, title: '优先次序（值越大越靠前）', dataIndex: 'sequence' },
      {
        key: 6, title: '操作',
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

  async componentDidMount () {
    this.loadData();
  }

  async loadData () {
    let livesRes = await loadAllLivesFlow();
    this.setState({
      liveFlowList: livesRes.msg,
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
    let deleteRes = await deleteLivesFlow(id);
    if (deleteRes.code === 200) {
      requestProxy.alertMessage('删除直播数据成功');
      this.loadData();
    }
  }

  render () {
    const {
      liveFlowList,
      showDialog,
      editItem,
    } = this.state;

    return (
      <div className="live-flow-list"
           style={{ margin: '2rem' }}>
        <RaisedButton label="新增"
                      primary={true}
                      onClick={() => this.handleEditRecord()}/>
        <br/><br/>
        <Table columns={this.columns}
               dataSource={liveFlowList}/>
        <Dialog open={showDialog}
                autoScrollBodyContent={true}>
          <LiveFlowDetail data={editItem}
                          requestClose={() => {
                            this.setState({ showDialog: false });
                            this.loadData();
                          }}/>
        </Dialog>
      </div>
    );
  }

}

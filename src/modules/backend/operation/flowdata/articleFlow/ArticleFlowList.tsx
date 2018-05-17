import * as React from 'react';
import { deleteArticle, loadAllArticles } from '../async';
import requestProxy from 'components/proxy/requestProxy';
import { RaisedButton, Dialog } from 'material-ui';
import { Table } from 'antd';
import ArticleFlowDetail from './ArticleFlowDetail';

export default class ArticleFlowList extends React.Component {

  constructor () {
    super();
    this.state = {
      articleFlowList: [],
      showDialog: false,
      editItem: {},
    };
    this.columns = [
      { key: 1, title: '标题', dataIndex: 'title', },
      { key: 2, title: '描述', dataIndex: 'description', },
      { key: 3, title: '标签', dataIndex: 'tag', },
      {
        key: 4, title: '操作',
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
    let articlesRes = await loadAllArticles();
    console.log(articlesRes);
    this.setState({
      articleFlowList: articlesRes.msg,
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
    let deleteRes = await deleteArticle(id);
    if (deleteRes.code === 200) {
      requestProxy.alertMessage('删除文章数据成功');
      this.loadData();
    }
  }

  render () {
    const {
      articleFlowList,
      showDialog,
      editItem,
    } = this.state;

    return (
      <div className="article-flow-list-container"
           style={{ margin: '2rem' }}>
        <RaisedButton label="新增"
                      primary={true}
                      onClick={() => this.handleEditRecord()}/>
        <br/><br/>
        <Table columns={this.columns}
               dataSource={articleFlowList}/>
        <Dialog open={showDialog}
                autoScrollBodyContent={true}>
          <ArticleFlowDetail data={editItem}
                             requestClose={() => {
                               this.setState({ showDialog: false });
                               this.loadData();
                             }}/>
        </Dialog>
      </div>
    );
  }

}

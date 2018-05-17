import * as React from 'react';
import './FlowData.less';

export default class FlowData extends React.Component {

  constructor () {
    super();
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  render () {
    return (
      <div className="flow-data-container">
        <h1 onClick={() => this.context.router.push('/backend/home/banner')}>首页 Banner 编辑</h1><br/>
        <h1 onClick={() => this.context.router.push('/backend/home/lives')}>直播内容编辑</h1><br/>
        <h1 onClick={() => this.context.router.push('/backend/home/activities')}>线下活动编辑</h1><br/>
        <h1 onClick={() => this.context.router.push('/backend/home/articles')}>圈圈文章编辑</h1>
      </div>
    );
  }

}

import * as React from 'react';
import './ArticleFlowDetail.less';
import { insertArticle, updateArticle } from '../async';
import requestProxy from 'components/proxy/requestProxy';
import { TextField, RaisedButton } from 'material-ui';

export default class ArticleFlowDetail extends React.Component {

  constructor () {
    super();
    this.state = {
      id: -1,
    };
  }

  componentWillMount () {
    this.setState(this.props.data);
  }

  componentWillReceiveProps (nextProps) {
    this.props = nextProps;
    this.setState(this.props);
  }

  async handleSubmit () {
    const {
      id,
    } = this.state;
    if (id > 0) {
      let updateRes = await updateArticle(this.state);
      this.props.requestClose();
      if (updateRes.code === 200) {
        requestProxy.alertMessage('更新文章信息成功');
      }
    } else {
      let insertRes = await insertArticle(this.state);
      this.props.requestClose();
      if (insertRes.code === 200) {
        requestProxy.alertMessage('插入文章信息成功');
      }
    }
  }

  render () {
    const {
      title,
      description,
      tag,
      thumbnail,
      linkUrl,
    } = this.state;

    return (
      <div className="article-flow-detail-component">
        <TextField floatingLabelText="文章标题"
                   defaultValue={title}
                   onChange={(e, v) => this.setState({ title: v })}/>
        <br/>
        <TextField floatingLabelText="文章描述"
                   defaultValue={description}
                   onChange={(e, v) => this.setState({ description: v })}/>
        <br/>
        <TextField floatingLabelText="标签集合，英文逗号 , 分隔"
                   defaultValue={tag}
                   onChange={(e, v) => this.setState({ tag: v })}/>
        <br/>
        <TextField floatingLabelText="缩略图"
                   defaultValue={thumbnail}
                   onChange={(e, v) => this.setState({ thumbnail: v })}/>
        <br/>
        <TextField floatingLabelText="文章链接"
                   defaultValue={linkUrl}
                   onChange={(e, v) => this.setState({ linkUrl: v })}/>
        <br/><br/>
        <section>
          <RaisedButton label="提交"
                        onClick={() => {
                          this.handleSubmit();
                        }}/>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <RaisedButton label="取消"
                        onClick={() => this.props.requestClose()}/>
        </section>
      </div>
    );
  }

}

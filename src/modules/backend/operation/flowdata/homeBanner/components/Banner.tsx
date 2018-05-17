import * as React from 'react';
import { TextField, RaisedButton } from 'material-ui';
import AssetImg from '../../../../../../components/AssetImg';
import { deleteBanner, updateBanner } from '../../async';
import requestProxy from '../../../../../../components/proxy/requestProxy';
import { randomStr } from 'utils/helpers';

export default class Banner extends React.Component {

  constructor () {
    super();
    this.state = {
      preview: true,
    };
  }

  componentWillMount () {
    this.setState({
      ...this.props.data
    });
  }

  componentWillReceiveProps (nextProps) {
    this.props = nextProps;
    this.setState({
      ...this.props.data
    });
  }

  /**
   * 更新头像
   * @returns {Promise<void>}
   */
  async handleUpdateBanner () {
    const {
      id,
      imageUrl,
      linkUrl,
      sequence,
    } = this.state;
    let updateRes = await updateBanner(id, imageUrl, linkUrl, sequence);
    if (updateRes.code === 200) {
      requestProxy.alertMessage('头图更改成功');
    }
  }

  /**
   * 删除头像
   * @returns {Promise<void>}
   */
  async handleDeleteBanner () {
    const {
      id,
    } = this.state;
    let deleteRes = await deleteBanner(id);
    if (deleteRes.code === 200) {
      requestProxy.alertMessage('头图删除成功');
      this.props.reload();
    }
  }

  render () {
    const {
      preview,
      id,
      imageUrl,
      linkUrl,
      sequence,
    } = this.state;

    return (
      <div className="banner-component"
           style={{ margin: '4rem', display: 'inline-block' }}>
        {
          preview ?
            <div className="banner-preview"
                 key={randomStr(8)}>
              {/* 预览模式 */}
              <AssetImg url={imageUrl}
                        style={{ width: '25rem' }}/>
              <br/>
              <TextField floatingLabelText="图片链接"
                         value={imageUrl}
                         disabled={true}/>
              <br/>
              <TextField floatingLabelText="内容点击链接"
                         value={linkUrl}
                         disabled={true}/>
              <br/>
              <TextField floatingLabelText="所在顺序"
                         value={sequence}
                         disabled={true}/>
              <br/>
              <RaisedButton label="编辑"
                            onClick={() => {
                              this.setState({ preview: false });
                            }}/>
              <RaisedButton label="删除"
                            style={{ marginLeft: '1rem' }}
                            onClick={() => {
                              this.handleDeleteBanner();
                            }}/>
            </div> :
            <div className="banner-edit"
                 key={randomStr(8)}>
              {/* 编辑模式 */}
              <TextField hintText="填写图片链接"
                         floatingLabelText="请填写图片链接"
                         defaultValue={imageUrl}
                         onChange={(e, v) => {
                           this.setState({ imageUrl: v });
                         }}/>
              <br/>
              <TextField hintText="填写内容点击链接"
                         floatingLabelText="请填写内容点击链接"
                         defaultValue={linkUrl}
                         onChange={(e, v) => {
                           this.setState({ linkUrl: v });
                         }}/>
              <br/>
              <TextField hintText="填写所在顺序"
                         floatingLabelText="填写所在顺序"
                         defaultValue={sequence}
                         onChange={(e, v) => {
                           this.setState({ sequence: v });
                         }}/>
              <br/>
              <RaisedButton label="保存"
                            onClick={() => {
                              this.setState({ preview: true });
                              this.handleUpdateBanner();
                            }}/>
              <RaisedButton label="取消"
                            style={{ marginLeft: '1rem' }}
                            onClick={() => {
                              this.setState({ preview: true });
                            }}/>
            </div>
        }
      </div>
    );
  }

}

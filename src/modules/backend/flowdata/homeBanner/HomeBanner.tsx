import * as React from 'react';
import Banner from './components/Banner';
import { TextField, RaisedButton, Dialog } from 'material-ui';
import { insertBanner, loadAllHomeBanners } from '../async';
import requestProxy from '../../../../components/proxy/requestProxy';

export default class HomeBanner extends React.Component {

  constructor () {
    super();
    this.state = {
      banners: [],
      showDialog: false,
      imageUrl: '',
      linkUrl: '',
      sequence: 0,
    };
  }

  async componentDidMount () {
    let bannersRes = await loadAllHomeBanners();
    this.setState({
      banners: bannersRes.msg,
    });
  }

  /**
   * 添加新的头图
   * @returns {Promise<void>}
   */
  async handleAddBanner () {
    const {
      imageUrl,
      linkUrl,
      sequence,
    } = this.state;
    let insertRes = await insertBanner(imageUrl, linkUrl, sequence);
    if (insertRes.code === 200) {
      requestProxy.alertMessage('提交成功');
      this.componentDidMount();
    }
  }

  render () {
    const {
      banners,
      showDialog,
    } = this.state;

    return (
      <div className="home-banner-container"
           style={{ margin: '4rem' }}>
        <RaisedButton label="新增 Banner"
                      onClick={() => {
                        this.setState({ showDialog: true });
                      }}/>
        <br/>
        {
          banners.map(banner => (
            <Banner data={banner}
                    reload={() => this.componentDidMount()}/>
          ))
        }
        <Dialog title="新增一个首页 Banner"
                actions={[
                  <RaisedButton label={'取消'}
                                onClick={() => this.setState({ showDialog: false })}/>,
                  <RaisedButton label={'确认'}
                                style={{ marginLeft: '20px' }}
                                onClick={() => {
                                  this.setState({ showDialog: false });
                                  this.handleAddBanner();
                                }}/>,
                ]}
                open={showDialog}
                onRequestClose={() => {
                  this.setState({
                    showDialog: false,
                  });
                }}>
          <TextField hintText="填写图片链接"
                     floatingLabelText="请填写图片链接"
                     onChange={(e, v) => {
                       this.setState({ imageUrl: v });
                     }}/>
          <br/>
          <TextField hintText="填写内容点击链接"
                     floatingLabelText="请填写内容点击链接"
                     onChange={(e, v) => {
                       this.setState({ linkUrl: v });
                     }}/>
          <br/>
          <TextField hintText="填写所在顺序"
                     floatingLabelText="填写所在顺序"
                     onChange={(e, v) => {
                       this.setState({ sequence: v });
                     }}/>
          <br/>
        </Dialog>
      </div>
    );
  }

}

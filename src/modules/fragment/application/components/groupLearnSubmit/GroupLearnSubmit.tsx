/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：forum-static
 2. 文件功能：小组编辑区提交组件
 3. 作者： justin@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react';
import './GroupLearnSubmit.less';
import { loadApplicationPractice, submitApplicationPractice } from '../../async';
import requestProxy from 'components/proxy/requestProxy';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import FileInput from 'react-fine-uploader/file-input';
import Dropzone from 'react-fine-uploader/dropzone';
import 'react-fine-uploader/gallery/gallery.css';
import AssetImg from 'components/AssetImg';
import VerticalBarLoading from "components/VerticalBarLoading";

export default class GroupLearnSubmit extends React.Component {

  constructor() {
    super();
    this.state = {
      fileId: 0,
      submitLoading: false,
      uploadingSuccess: false,
    };
    // 初始化上传控件
    this.uploader = new FineUploaderTraditional({
      options: {
        request: {
          endpoint: '/file/ppt/upload'
        },
        validation: {
          allowedExtensions: [ 'ppt', 'pptx', 'pps' ],
          sizeLimit: 1024 * 1024 * 10 // 10 mb
        },
        messages: {
          typeError: "只支持PPT格式",
          sizeError: "上传的PPT不能超过10mb"
        },
        callbacks: {
          onSubmit: (id, fileName) => {
            this.setState({ submitLoading: true });
          },
          onComplete: (id, fileName, responseJSON) => {
            const { msg, code } = responseJSON;
            if(code !== 200) {
              requestProxy.alertMessage(msg);
            } else {
              this.setState({ fileId: msg, submitLoading: false, uploadingSuccess: true });
            }
          }
        }
      }
    })
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  async componentDidMount() {
    const { id, planId } = this.props;
    let res = await loadApplicationPractice(id, planId);
    const { msg } = res;
    this.setState({
      value: res.msg.content
    });
  }

  /**
   * 点击提交应用题内容
   **/
  async handleSubmitApplicationSubmit() {
    const { fileId } = this.state;
    if(!fileId) {
      requestProxy.alertMessage('请先上传ppt');
      return;
    }
    const {
      hideCallback = () => {
      },
      submitCallback = () => {
      },
    } = this.props;

    const { id, planId } = this.props;
    let res = await submitApplicationPractice(planId, id, { fileId });
    if(res.code === 200) {
      hideCallback();
      submitCallback();
    }
  }

  render() {
    const { uploadingSuccess, submitLoading } = this.state;
    return (
      <div className="group-learn-submit-component">
        {submitLoading && <VerticalBarLoading/>}
        <Dropzone style={ { border: '2px dotted #55cbcb', width: '100%', height: '25.4rem' } }
                  uploader={ this.uploader }
        >
          { uploadingSuccess ?
            <div className="text-tip-area">
              <AssetImg url="https://static.iqycamp.com/images/ppt_upload_success.png" width={59} height={67}
                        marginTop={43}></AssetImg>
              <span className="text-tip1">文件上传成功</span>
              <FileInput uploader={ this.uploader }>
                <div className="upload-file">重新上传</div>
              </FileInput>
            </div> :
            <div className="text-tip-area">
              <AssetImg url="https://static.iqycamp.com/images/ppt_upload.png" width={59} height={67}
                        marginTop={43}></AssetImg>
              <span className="text-tip1">将ppt拖放至此处</span>
              <span className="text-tip2">或</span>
              <FileInput uploader={ this.uploader }>
                <div className="upload-file">选择文件</div>
              </FileInput>
            </div>
          }
        </Dropzone>
        <div className="footerbutton">
          <div className="pc-submit"
               onClick={() => this.handleSubmitApplicationSubmit()}>提交
          </div>
        </div>
      </div>
    );
  }

}

import * as React from 'react';
import {connect} from 'react-redux'
import ExcelUpload from '../../../../components/ExcelUpload'
import {alertMsg } from '../../../../redux/actions'
import './AddSocial.less'

@connect(state=>state)
export default class AddSocial extends React.Component<any,any>{


  constructor(props){
    super(props);
  }

  alertSuccess(){
    const {dispatch} = this.props;
    dispatch(alertMsg('上传成功'));
  }


  render(){
    const renderUploadExcel = () => {
      return (
        <div className="add-social-container">
          <ExcelUpload action='/pc/operation/social//file/upload' flatLabel={`上传Excel`} func={this.alertSuccess.bind(this)}/>
        </div>
      )
    }


    return(
      <div className="add-social-container">
        {renderUploadExcel()}
      </div>
    )
  }



}

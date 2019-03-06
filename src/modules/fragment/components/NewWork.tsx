import * as React from "react";
import "./NewWork.less"
import { isString, truncate, isFunction } from "lodash";
import AssetImg from "../../../components/AssetImg";
import { preview } from "../../helpers/JsConfig"
import { connect } from "react-redux";
import { alertMsg } from "../../../redux/actions";
import { requestApplicationComment } from "./async";
import AlertMessage from "../../../components/AlertMessage";

@connect(state => state)
export default class Work extends React.Component<any,any> {

  constructor(props) {
    super(props);

    this.state = {
      showAll: false,
      filterContent: isString(props.content) ? props.content.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "") : "",
      showRequestComment: false,
      request: false,
    }
  }

  disOpen(filterContent, showAll) {
    const { wordsCount = 60 } = this.props;
    return filterContent.length > wordsCount && !showAll;
  }

  requestComment() {
    this.onRequestComment()
    this.setState({ showRequestComment: false })
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.content && !this.props.content) {
      this.setState({
        filterContent: isString(nextProps.content) ? nextProps.content.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "") : ""
      })
    }
  }

  componentWillMount() {
    this.setState({ request: this.props.request })
  }

  contentClick(e) {
    if(e.target.tagName === 'IMG') {
      let item = e.target.src
      let picList = Array.from(this.refs.submitContent.querySelectorAll('img')).map(item => item.src);
      preview(item, picList)
    }
  }

  click() {
    const { dispatch, requestCommentCount } = this.props;
    const { request } = this.state;
    if(request) {
      dispatch(alertMsg(null, '本练习已经使用过求点评啦'));
      return;
    }
    if(requestCommentCount === 0) {
      dispatch(alertMsg(null, '本小课求点评次数已用完'));
      return;
    }
    this.setState({ showRequestComment: true })
  }

  onRequestComment() {
    const { dispatch, submitId } = this.props;
    requestApplicationComment(submitId).then(res => {
      let { code, msg } = res;
      if(code === 200) {
        this.setState({ request: true })
        dispatch(alertMsg(null, '教练已经收到你的请求啦<br/>点评后，会在消息中心通知你的'))
      } else {
        dispatch(alertMsg(msg));
      }
    })

  }

  show(showAll) {
    this.setState({ showAll: !showAll })
  }

  render() {
    const {
      headImage, userName, content,
      submitUpdateTime, onEdit, voteCount, commentCount,
      voteStatus, onVoted, goComment, wordsCount = 60,
      title, avatarStyle = 'left', role, signature, requestCommentCount, feedback = false,
      operation = true
    } = this.props;
    const { showAll, filterContent, showRequestComment, request } = this.state;
    const renderWorkContent = () => {
      if(isString(content)) {
        if(filterContent.length > wordsCount && !showAll) {
          return (
            <div className={`${avatarStyle}`}>{truncate(filterContent, { length: wordsCount, omission: '' })}<span
              style={{letterSpacing:'-3px'}}>......</span></div>
          )
        } else {
          return (
            <pre className={`${avatarStyle}`} dangerouslySetInnerHTML={{__html:content}}/>
          )
        }
      }
      return null;
    }

    const showOperation = () => {
      if(operation) {
        return true;
      } else {
        return false;
      }
    }

    const renderHeader = () => {
      return (
        <div className={`submit-head ${avatarStyle}`}>
          <div className="submit-img"><img className={`submit-avatar ${avatarStyle}`} src={headImage}/></div>
          <div className="submit-memo">
            <div className="intro">
              <div className="submit-name">
                {userName}
              </div>
              {role == 3 || role == 4 || role == 12 || role == 13 ?
                <div className="role"><AssetImg url='https://static.iqycamp.com/images/coach.png'/></div> : null}
              {role == 5 ?
                <div className="role"><AssetImg url='https://static.iqycamp.com/images/senior_coach.png'/></div> : null}
              {role == 6 ?
                <div className="role"><AssetImg url='https://static.iqycamp.com/images/first_coach.png'/></div> : null}
              {role == 7 ?
                <div className="role"><AssetImg url='https://static.iqycamp.com/images/vip.png'/></div> : null}
              <div className="submit-time">{submitUpdateTime}</div>
            </div>
            <div className="signature">{signature}</div>

          </div>

          {onEdit ?<div className="right" style={{marginTop:`${avatarStyle==='left'?'0':'5px'}`}}>
              <div className="function-area" onClick={()=>onEdit()} style={{marginRight:8}}>
                <AssetImg type="edit" height={12}/>
                <div className="submit-button click-key">
                  编辑
                </div>
              </div>
              {!request && requestCommentCount != null && requestCommentCount > 0 ?
                <div className="function-area" onClick={()=>this.click()}>
                  <AssetImg type="request_comment" height={12}/>
                  <div className={`submit-button click-key`}>
                    求点评
                  </div>
                </div>
                : null}
              {request || (requestCommentCount != null && requestCommentCount === 0) ?
                <div className="function-area" onClick={()=>this.click()}>
                  <AssetImg type="request_comment_disable" height={12}/>
                  <div className={`submit-button disabled`}>
                    求点评
                  </div>
                </div>: null}
            </div>: null}
        </div>
      )
    }

    const alertProps = {
      actions: [
        { label: '再想想', onClick: () => this.setState({ showRequestComment: false }) },
        { label: '确定', onClick: () => this.requestComment(), "primary": true }
      ],
    }

    return (
      <div className={`new-work`}>
        <AlertMessage { ...alertProps }
          open={showRequestComment}
          content={`当前小课还剩${requestCommentCount}次请求教练点评的机会,确定要在这次使用吗？`}
        >
        </AlertMessage>
        <div className="submit-cell">
          <div className="submit-area">
            {renderHeader()}
            {title ?<div className="submit-title">{title}</div>: null}
            <div className="submit-content" ref="submitContent"
                 onClick={(e)=>this.contentClick(e)}>{renderWorkContent()}</div>
            {filterContent && filterContent.length > wordsCount ?<div onClick={()=>this.show(showAll)}
                                                                      className="show-all click-key"
                                                                      style={{marginTop:5}}>{showAll ? '收起' : '展开'}</div>: null}
            {
              showOperation()
                ? <div className={`operation-area`}>
                  <div onClick={()=>{isFunction(goComment)?goComment():null}} className="comment">
                    <span>{commentCount}</span>
                  </div>
                  <div onClick={()=>{isFunction(onVoted)?onVoted():null}} className="vote">
                    <span className={`${voteStatus?'voted':'disVote'}`}>{voteCount}</span>
                  </div>
                  {
                    feedback
                      ? <div className="operation-asset" onClick={()=>{isFunction(goComment)?goComment():null}}>
                        <AssetImg
                          url="https://static.iqycamp.com/images/fragment/application_asset_comment.png"
                          width="45px"
                          height="13px"
                        />
                      </div>
                      : null
                  }
                </div>
                : null
            }
          </div>
        </div>
      </div>
    )
  }
}


import * as React from 'react'
import { connect } from 'react-redux'
import './BackendIndex.less'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { List } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

const style = {
  divider: {
    backgroundColor: '#f5f5f5'
  },
  listTitle: {
    height: '65px',
    padding: 0,
    overflow: 'hidden'
  },
  firstItem: {
    margin: '0px auto',
    padding: '20px 0 25px'
  },
  item: {
    margin: '0 auto',
    padding: '24px 0'
  },
  itemActive: {
    color: '#55cbcb'
  }
}

@connect(state => state)
export default class Fragment extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      problemCatalogs: [],
      doingId: null,
      curProblem: null
    }
  }

  componentWillMount() {

  }

  render() {
    const renderMenu = () => {
      return (
        <List>
          <Subheader style={style.listTitle}>
            <div className="listTitle">内容功能</div>
          </Subheader>
          <Divider style={style.divider}/>
          <div className="catalog-area">
         {/*   <div className="catalog-name" onClick={() => {
                  this.context.router.push({ pathname: '/backend/problem/import' })
                }}>小课导入
            </div>
            <div className="catalog-name" onClick={() => {
                  this.context.router.push({ pathname: '/backend/preview/import' })
                }}>课前思考导入
            </div>
            <div className="catalog-name" onClick={() => {
                  this.context.router.push({ pathname: '/backend/knowledge/import' })
                }}>小课知识导入
            </div>
            <div className="catalog-name" onClick={() => {
                  this.context.router.push({ pathname: '/backend/warmup/import' })
                }}>选择题导入
            </div>
            <div className="catalog-name" onClick={() => {
                  this.context.router.push({ pathname: '/backend/warmup/management' })
                }}>选择题管理
            </div>
            <div className="catalog-name" onClick={() => {
                  this.context.router.push({ pathname: '/backend/application/import' })
                }}>应用题导入
            </div>
            <div className="catalog-name" onClick={() => {
                  this.context.router.push({ pathname: '/backend/application/management' })
                }}>应用题管理
            </div>*/}
            <div className="catalog-name" onClick={
              () => this.context.router.push({ pathname: '/asst/knowledge/vote' })}>
              知识点评论
            </div>
            <div className="catalog-name" onClick={()=>{
              this.context.router.push({pathname:'/asst/warmup/problem/list'})}}>
              选择题评论
            </div>
            <div className="catalog-name" onClick={() => {
              this.context.router.push({ pathname: '/asst/application/problem/list' })}}>
              应用题评论
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/assist/management' })}}>
              助教管理
            </div>
          </div>
          <Subheader style={style.listTitle}>
            <div className="listTitle">运营功能</div>
          </Subheader>
          <Divider style={style.divider}/>
          <div className="catalog-area">
            <div className="catalog-name" onClick={()=>{this.context.router.push({pathname:'/backend/user/info'})}}>
              用户信息
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/add/certificate' })}}>
              添加证书
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/certificate' })}}>
              证书发送
            </div>
            <div className="catalog-name" onClick={()=>{
              this.context.router.push({pathname:'/backend/template'})
            }}>
              模板消息
            </div>
            <div className="catalog-name" onClick={()=>{
              this.context.router.push({pathname:'/backend/customer/msg'})
            }}>
              客服消息
            </div>
            <div className="catalog-name" onClick={()=>{
              this.context.router.push({pathname:'/backend/addvip'})
            }}>
              添加vip会员
            </div>
            <div className="catalog-name" onClick={()=>{
              this.context.router.push({pathname:'/backend/opencourse'})
            }}>
              新开/解锁课程
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/business/school/application' })}}>
              申请审批
            </div>
            <div className="catalog-name"
                 onClick={()=>{this.context.router.push({pathname:'/backend/generate/qrcode'})}}>
              推广二维码
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/survey/config' })}}>
              问卷链接设置
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/home/config' })}}>
              首页资源管理
            </div>
            <div className="catalog-name" onClick={()=>{this.context.router.push({pathname:'/backend/add/social'})}}>
              社群信息导入
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/message/reply' })}}>
              服务号自动回复
            </div>
            <div className="catalog-name"
                 onClick={() => {this.context.router.push({ pathname: '/backend/message/subscribe' })}}>
              服务号关注回复
            </div>
            <div className="catalog-name" onClick={() => {this.context.router.push({pathname: '/backend/add/coupon'})}}>
                创建优惠券
            </div>
          </div>
          <Subheader style={style.listTitle}>
            <div className="listTitle">管理员功能</div>
          </Subheader>
          <Divider style={style.divider}/>
          <div className="catalog-area">
            <div className="catalog-name" onClick={() => {
              this.context.router.push({ pathname: '/backend/admin/config' })
            }}>项目配置
            </div>
            <div className="catalog-name" onClick={() => {
              this.context.router.push({ pathname: '/backend/upload/richtext' })
            }}>富文本上传
            </div>
            <div className="catalog-name" onClick={() => {
                   this.context.router.push({ pathname: '/backend/admin/upload/file' })
            }}>图片上传
            </div>
            <div className="catalog-name" onClick={() => {
                this.context.router.push({ pathname: '/backend/admin/wx/upload/image' })
            }}>微信上传图片
            </div>
            <div className="catalog-name" onClick={() => {
              this.context.router.push({ pathname: '/backend/admin/refund' })
            }}>退款
            </div>
         {/*   <div className="catalog-name" onClick={() => {
              this.context.router.push({ pathname: '/backend/admin/redpacket' })
            }}>发红包
            </div>*/}
          </div>
        </List>
      )
    }

    return (
      <div className="backendContent">
        <div className="leftList">
          {renderMenu()}
        </div>
        <div className="rightContent">
          {this.props.children}
        </div>
      </div>
    )
  }
}

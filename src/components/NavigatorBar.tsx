import * as React from 'react';
import { connect } from 'react-redux';
import AssetImg from "../components/AssetImg";
import './NavigatorBar.less';

enum NavType {
  Home = 1,
  Rise,
  Forum
}

interface NavigatorBarProps {
  isFixed: boolean;
}

@connect(state => state)
export default class NavigatorBar extends React.Component<NavigatorBarProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      size: {},
      activeNav: 0,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.checkCurNav();
  }

  handleClickNav(navId) {
    switch(navId) {
      case NavType.Home: {
        this.setState({ activeNav: NavType.Home }, () => {
          this.context.router.push({ pathname: '/home' })
        })
        break;
      }
      case NavType.Rise: {
        this.setState({ activeNav: NavType.Rise }, () => {
          this.context.router.push({ pathname: '/fragment/rise' })
        })
        break;
      }
      case NavType.Forum: {
        this.setState({ activeNav: NavType.Forum })
        break;
      }
      default: {
        break;
      }
    }
  }

  checkCurNav() {
    let url = window.location.pathname;
    if(url === '/fragment/rise' || url === '/fragment/learn') {
      this.setState({ activeNav: NavType.Rise });
    } else if(url === '/home' || url === '/') {
      this.setState({ activeNav: NavType.Home });
    }
  }

  render() {

    const { activeNav } = this.state

    return (
      <div className={this.props.isFixed ? `nav-container-fixed` : `nav-container`}>
        <div className="navigator-bar">
          <div className="nav-logo">
            <div className="logo-img">
              <AssetImg url="http://static.iqycamp.com/images/logo.png" width="36" height="38"/>
            </div>
            <span className="logo-name">
                圈外
            </span>
          </div>
          <div className="nav-btn">
            <button className={`nav-item first-item ${activeNav === NavType.Home ? 'active' : ''}`}
                    onClick={() => this.handleClickNav(NavType.Home)}>首页
            </button>
            <button className={`nav-item ${activeNav === NavType.Rise ? 'active' : ''}`}
                    onClick={() => this.handleClickNav(NavType.Rise)}>RISE
            </button>
          </div>
          <div className="nav-user">
            <div className="user-img"><img src={window.ENV.headImage}/></div>
            <div className="user-name">{window.ENV.userName}</div>
          </div>
        </div>
      </div>
    )
  }
}

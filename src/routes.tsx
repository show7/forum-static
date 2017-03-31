import * as React from "react";
import {Route, IndexRoute} from "react-router";
import Base from "modules/base/Base.tsx";
import ProblemList from "./modules/fragment/ProblemList"
import Home from "./modules/home/Home"
import Login from "./modules/Login"
import ServerCode from "./modules/ServerCode"
import Catalog from "./modules/fragment/Catalog"
import DoChallenge from "./modules/fragment/challenge/DoChallenge"
import DoApplication from "./modules/fragment/application/DoApplication"
import ChallengeList from "./modules/fragment/challenge/ChallengeList"
import ApplicationList from "./modules/fragment/application/ApplicationList"
import ShowChallenge from "./modules/fragment/challenge/ShowChallenge"
import ShowApplication from "./modules/fragment/application/ShowApplication"
import ShowSubject from "./modules/fragment/subject/ShowSubject"
import Stranger from "./modules/Stranger"
import Reject from "./modules/Reject"
import NotFoundPage from "./modules/NotFoundPage"
import SubjectList from "./modules/fragment/subject/SubjectList"
import MineSubject from "./modules/fragment/subject/MineSubject"
import WriteSubject from "./modules/fragment/subject/WriteSubject"
import Test from "./modules/Test"
import BackendIndex from "./modules/backend/BackendIndex"
import Welcome from "./modules/backend/Welcome"
import HotWarmupPractice from "./modules/backend/warmup/HotWarmupPractice"
import PracticeView from "./modules/backend/warmup/PracticeView"
import Discuss from "./modules/backend/warmup/Discuss"
import ProblemView from "./modules/backend/application/ProblemView"
import CatalogView from "./modules/backend/application/Catalog"
import ApplicationView from "./modules/backend/application/ApplicationList"
import ProjectConfig from "./modules/backend/admin/ProjectConfig"
import ConfigDetail from "./modules/backend/admin/ConfigDetail"

const routes = (
  <Route path="/" component={Base}>
    <IndexRoute component={Home}/>
    <Route path="home" component={Home}/>
    <Route path="test" component={Test}/>
    <Route path="login" component={Login}/>
    <Route path="stranger" component={Stranger}/>
    <Route path="pc/static/reject" component={Reject} />
    <Route component={ProblemList}>
      <Route path="fragment/rise" component={Catalog}/>
      <Route path="fragment/challenge" component={DoChallenge}/>
      <Route path="fragment/application" component={DoApplication}/>
      <Route path="fragment/challenge/list" component={ChallengeList}/>
      <Route path="fragment/application/list" component={ApplicationList}/>
      <Route path="fragment/challenge/show" component={ShowChallenge}/>
      <Route path="fragment/application/show" component={ShowApplication}/>
      <Route path="fragment/subject/list" component={SubjectList}/>
      <Route path="fragment/subject/show" component={ShowSubject}/>
      <Route path="fragment/subject/list/mine" component={MineSubject}/>
      <Route path="fragment/subject/write" component={WriteSubject}/>
      <Route path="servercode" component={ServerCode}/>
    </Route>
    <Route component={BackendIndex}>
      <Route path="backend" component={Welcome}/>
      <Route path="/backend/admin/config" component={ProjectConfig}>
          <Route path="/backend/project/config" component={ConfigDetail}/>
      </Route>
      <Route path="backend/warmup" component={HotWarmupPractice}/>
      <Route path="backend/warmup/view" component={PracticeView}/>
      <Route path="backend/warmup/discuss" component={Discuss}/>
      <Route path="/backend/application/problem/list" component={ProblemView}>
        <Route path="/backend/application/catalog" component={CatalogView}/>
        <Route path="/backend/application/list" component={ApplicationView}/>
      </Route>
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
)

export default routes

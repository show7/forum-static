import * as React from 'react'
import { Route, IndexRoute } from 'react-router'
import Base from 'modules/base/Base.tsx'
import RiseBase from 'modules/base/RiseBase.tsx'
import Login from './modules/Login'
import ServerCode from './modules/ServerCode'
import ShowApplication from './modules/asst/application/ShowApplication'
import Reject from './modules/Reject'
import NotFoundPage from './modules/NotFoundPage'
import BackendIndex from './modules/backend/BackendIndex'
import BackendWelcome from './modules/backend/Welcome'
import HotWarmupPractice from './modules/backend/warmup/HotWarmupPractice'
import CatalogView from './modules/backend/import/application/Catalog'
import ProjectConfig from './modules/backend/admin/ProjectConfig'
import ConfigDetail from './modules/backend/admin/ConfigDetail'
import Refund from './modules/backend/admin/Refund'
import WarmupProblemList from './modules/backend/import/warmup/ProblemList'
import WarmupPracticeList from './modules/backend/import/warmup/WarmupPracticeList'
import AsstIndex from './modules/asst/AsstIndex'
import AsstWelcome from './modules/asst/Welcome'
import AsstApplicationComment from './modules/asst/application/ProblemList'
import AsstApplicationList from './modules/asst/application/ApplicationList'
import CommentedList from './modules/asst/CommentedList'
import WarmupPracticeView from './modules/asst/warmup/WarmupPracticeView'

// pc rise 改版
import Plan from './modules/fragment/plan/Plan'
import Learn from './modules/fragment/plan/Learn'
import Report from './modules/fragment/plan/Report'
import Subject from './modules/fragment/subject/Subject'
import Challenge from './modules/fragment/challenge/Challenge'
import Application from './modules/fragment/application/Application'
import Comment from './modules/fragment/application/Comment'
import WarmUp from './modules/fragment/warmup/WarmUp'
import WarmupResult from './modules/fragment/warmup/Result'
import WarmUpAnalysis from './modules/fragment/warmup/Analysis'
import AnalysisNew from './modules/fragment/warmup/AnalysisNew'
import KnowledgeViewer from './modules/fragment/knowledge/KnowledgeViewer'
import KnowledgeReview from './modules/fragment/knowledge/KnowledgeReview'
import ProblemViewer from './modules/fragment/problem/ProblemViewer'
import Profile from './modules/fragment/customer/personal/Profile'
import { Comment as SubjectComment } from './modules/fragment/subject/Comment'
import Personal from './modules/fragment/customer/personal/Personal'
import Account from './modules/fragment/customer/personal/Account'
import Help from './modules/fragment/customer/personal/Help'
import Message from './modules/fragment/customer/msgcenter/Message'
import UserProtocol from './modules/fragment/customer/personal/UserProtocol'
import ReplyKnowledgeDiscussMessage from './modules/fragment/customer/msgcenter/TransitionPages/ReplyKnowledgeDiscussMessage'
import ReplyCommentMessage from './modules/fragment/customer/msgcenter/TransitionPages/ReplyCommentMessage'
import ReplyWarmupDiscussMessage from './modules/fragment/customer/msgcenter/TransitionPages/ReplyWarmupDiscussMessage'
import WarmupPracticeImport from './modules/backend/import/warmup/WarmupPracticeImport'
import KnowledgeImport from './modules/backend/import/knowledge/KnowledgeImport'
import ProblemImport from './modules/backend/import/problem/ProblemImport'
import CampUserView from './modules/camp/CampUserView'
import CampUserUnGroup from './modules/camp/CampUserUnGroup'
import CampUserAdd from './modules/camp/CampUserAdd'
import AutoReplyMessage from './modules/backend/message/autoreply/AutoReplyMessage'
import SubscribeMessage from './modules/backend/message/autoreply/SubscribeMessage'
import BusinessSchoolApplication from './modules/backend/operation/BusinessSchoolApplication'
import SurveyConfig from './modules/backend/operation/SurveyConfig'
import ApplicationImport from './modules/backend/import/application/ApplicationImport'
import CampIdentityModify from './modules/camp/CampIdentityModify'
import AsstImport from './modules/backend/import/assist/AsstImport'
import UploadMaterial from './modules/backend/wx/UploadMaterial'
import AsstBusinessSchoolApp from './modules/asst/application/AsstBusinessSchoolApp'
import ProblemExtension from './modules/fragment/problem/ProblemExtension'
import UpGradeInfo from './modules/asst/info/UpGradeInfo'
import AsstManagement from './modules/backend/asst/AsstManagement'
import AsstStandard from './modules/backend/asst/AsstStandard'
import AsstExecution from './modules/backend/asst/AsstExecution'
import ApplicationView from './modules/backend/application/ApplicationList'
import PracticeView from './modules/backend/warmup/PracticeView'
import ApplicationCatalog from './modules/backend/application/ApplicationCatalog'
import ApplicationProblemList from './modules/backend/application/ApplicationProblemList'
import ProblemList from './modules/backend/import/application/ProblemList'
import Discuss from './modules/backend/warmup/Discuss'
import WarmProblemList from './modules/backend/import/warmup/WarmProblemList'
import WarmupShowList from './modules/backend/import/warmup/WarmupShowList'
import UserInfo from './modules/backend/user/UserInfo'
import SendTemplate from './modules/backend/operation/SendTemplate'
import GenerateQrCode from './modules/backend/operation/GenerateQrCode'
import WarmupList from './modules/backend/warmup/WarmupList'
import NewPracticeView from './modules/backend/warmup/NewPracticeView'
import SubmitRichText from './modules/backend/common/submitrichtext/SubmitRichText'
import SubmitFile from './modules/backend/common/submitimage/SubmitFile'
import AddVipRiseMember from './modules/backend/operation/viprisemember/AddVipRiseMember'
import BatchOpenCourse from './modules/backend/operation/batchopencourse/BatchOpenCourse'
import CertificateOperate from './modules/backend/operation/certificate/CertificateOperate'
import KnowledgeComment from './modules/backend/knowledge/KnowledgeComment'
import sa from 'sa-sdk-javascript';
import KnowledgeDiscussComment from './modules/backend/knowledge/KnowledgeDiscussComment'

const routes = (
  <Route path="/" onChange={() => {
    sa.quick('autoTrackSinglePage');
  }}>
    <Route path="/login" component={Login}/>
    <Route component={Base}>

      <Route path="pc/static/reject" component={Reject}/>
      <Route path="servercode" component={ServerCode}/>
      <Route component={BackendIndex}>
        <Route path="/backend" component={BackendWelcome}/>
        <Route path="backend/warmup/view" component={PracticeView}/>
        <Route path="backend/warmup/view/seven" component={NewPracticeView}/>
        <Route path="/backend/admin/config" component={ProjectConfig}>
          <Route path="/backend/project/config" component={ConfigDetail}/>
        </Route>
        <Route path="/backend/admin/refund" component={Refund}/>
        <Route path="/backend/admin/wx/upload/image" component={UploadMaterial}/>
        <Route path="/backend/warmup/management" component={WarmupProblemList}>
          <Route path="/backend/warmup/edit/list" component={WarmupPracticeList}/>
        </Route>
        <Route path="/backend/warmup/problem/list" component={WarmProblemList}>
          <Route path="/backend/warmup/show/list" component={WarmupShowList}/>
        </Route>
        <Route path="/backend/warmup/list" component={WarmupList}/>
        <Route path="/backend/warmup/discuss" component={Discuss}/>

        <Route path="/backend/template" component={SendTemplate}/>

        <Route path="/backend/warmup/newpractice">
          <Route path="/backend/warmup/import" component={WarmupPracticeImport}/>
        </Route>
        <Route path="/backend/application/management" component={ProblemList}>
          <Route path="/backend/application/catalog" component={CatalogView}/>
        </Route>

        <Route path='/backend/knowledge/vote' component={KnowledgeComment}/>
        <Route path="/backend/knowledge/discuss/reply" component={KnowledgeDiscussComment}/>

        <Route path="/backend/user/info" component={UserInfo}/>
        <Route path="/backend/camp/add" component={CampUserAdd}/>
        <Route path="/backend/camp/group" component={CampUserUnGroup}/>
        <Route path="/backend/camp/identity" component={CampIdentityModify}/>
        <Route path="/backend/assist/management" component={AsstManagement}>
          <Route path="/backend/assist/standard" component={AsstStandard}/>
          <Route path="/backend/assist/execution" component={AsstExecution}/>
          <Route path="/backend/assist/upgrade" component={AsstImport}/>
        </Route>
        <Route path="/backend/assist" component={AsstImport}/>
        <Route path="/backend/message/reply" component={AutoReplyMessage}/>
        <Route path="/backend/message/subscribe" component={SubscribeMessage}/>
        <Route path="/backend/knowledge/import" component={KnowledgeImport}/>
        <Route path="/backend/problem/import" component={ProblemImport}/>
        <Route path="/backend/business/school/application" component={BusinessSchoolApplication}/>
        <Route path="/backend/survey/config" component={SurveyConfig}/>
        <Route path="/backend/application/import" component={ApplicationImport}/>
        <Route path="/backend/generate/qrcode" component={GenerateQrCode}/>
        <Route path="/backend/upload/file" component={SubmitFile}/>
        <Route path="/backend/upload/richtext" component={SubmitRichText}/>
        <Route path="/backend/addvip" component={AddVipRiseMember}/>
        <Route path="/backend/opencourse" component={BatchOpenCourse}/>
        <Route path="/backend/certificate" component={CertificateOperate}/>
      </Route>
      <Route component={AsstIndex}>
        <Route path="/asst" component={AsstWelcome}/>
        <Route path="/asst/commented" component={CommentedList}/>
        <Route path="/asst/business/comment" component={AsstBusinessSchoolApp}/>
        <Route path="/asst/application/problem/list" component={ApplicationProblemList}>
          <Route path="/asst/problem/application/catalog" component={ApplicationCatalog}/>
          <Route path="/asst/problem/application/list" component={ApplicationView}/>
        </Route>
        <Route path="/asst/application/comment" component={AsstApplicationComment}>
          <Route path="/asst/application/list" component={AsstApplicationList}/>
          <Route path="/asst/application/view" component={ShowApplication}/>
        </Route>
        <Route path="/asst/warmup/comment" component={HotWarmupPractice}/>
        <Route path="/asst/warmup/view" component={WarmupPracticeView}/>
        <Route path="/asst/upgrade/info" component={UpGradeInfo}/>
      </Route>
    </Route>

    {/*Rise PC 改版*/}
    <Route component={RiseBase}>
      <Route path="/fragment/rise" component={Plan}/>
      <Route path="/fragment/learn" component={Learn}/>
      <Route path="/fragment/main" component={Learn}/>
      <Route path="/fragment/subject" component={Subject}/>
      <Route path="/fragment/practice/subject/comment" component={SubjectComment}/>
      <Route path="/fragment/problem/view" component={ProblemViewer}/>
      <Route path="/fragment/problem/extension/view" component={ProblemExtension}/>
      <Route path="/fragment/knowledge" component={KnowledgeViewer}/>
      <Route path="/fragment/warmup" component={WarmUp}/>
      <Route path="/fragment/warmup/result" component={WarmupResult}/>
      <Route path="/fragment/warmup/analysis" component={WarmUpAnalysis}/>
      <Route path="/fragment/application" component={Application}/>
      <Route path="/fragment/challenge" component={Challenge}/>
      <Route path="/fragment/report" component={Report}/>
      <Route path="/fragment/warmup/new/analysis" component={AnalysisNew}/>
      <Route path="/fragment/knowledge/review" component={KnowledgeReview}/>
      <Route path="/fragment/application/comment" component={Comment}/>
      <Route component={Personal}>
        <Route path="/fragment/customer/profile" component={Profile}/>
        <Route path="/fragment/customer/account" component={Account}/>
        <Route path="/fragment/customer/help" component={Help}/>
        <Route path="/fragment/customer/userprotocol" component={UserProtocol}/>
      </Route>
      <Route path="/fragment/message" component={Message}/>
      <Route path="/fragment/message/knowledge/reply" component={ReplyKnowledgeDiscussMessage}/>
      <Route path="/fragment/message/comment/reply" component={ReplyCommentMessage}/>
      <Route path="/fragment/message/warmup/reply" component={ReplyWarmupDiscussMessage}/>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Route>
)

export default routes

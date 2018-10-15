import * as React from "react"
import { RaisedButton, SelectField, MenuItem } from "material-ui"
import { ProblemSelector } from "../import/component/ProblemSelector"
import { checkShowHide, hideKnowledgeDiscuss, queryKnowledgeDiscusses, queryProblemKnowledges, replyKnowledgeDiscuss, voteKnowledgeDiscuss } from "./async"
import DiscussDisplayComponent from "../components/DiscussDisplayComponent"

export default class KnowledgeComment extends React.Component {

  constructor() {
    super()
    this.state = {
      knowledges: [],
      selectKnowledgeId: -1,
      discusses: [],
      showHide: false
    }
  }

  async componentWillMount() {
    let res = await checkShowHide()
    this.setState({
      showHide: res.msg
    })
  }

  handleSelectProblem(problemId) {
    this.setState({
      selectProblemId: problemId,
      selectKnowledgeId: -1
    }, () => {
      this.loadKnowledges(problemId)
    })
  }

  async loadKnowledges(problemId) {
    let res = await queryProblemKnowledges(problemId)
    if (res.code === 200) {
      this.setState({ knowledges: res.msg })
    }
  }

  async loadKnowledgeDiscuss(knowledgeId) {
    if (knowledgeId == -1) return
    let res = await queryKnowledgeDiscusses(knowledgeId)
    if (res.code === 200) {
      this.setState({ discusses: res.msg})
    }
  }

  async voteKnowledgeDiscuss(discussId, priority) {
    let res = await voteKnowledgeDiscuss(discussId, priority)
    return res
  }

  async hideKnowledgeDiscuss(discussId, hide) {
    let res = await hideKnowledgeDiscuss(discussId, hide)
    return res
  }

  async replyKnowledge(discussId, value) {
    const { selectKnowledgeId } = this.state
    let res = await replyKnowledgeDiscuss(value, selectKnowledgeId, discussId)
    return res
  }

  render() {
    const {
      knowledges,
      selectKnowledgeId,
      discusses,
      showHide
    } = this.state

    return (
      <div style={{ padding: "50px 80px" }}>
        <ProblemSelector ref={"problemSelector"}
                         select={(problemId) => this.handleSelectProblem(problemId)}></ProblemSelector>

        <SelectField floatingLabelText="选择知识点"
                     value={selectKnowledgeId}
                     onChange={(event, index, value) => this.setState({ selectKnowledgeId: value })}>
          {
            knowledges.map((knowledge) => {
              return <MenuItem key={knowledge.id}
                               value={knowledge.id}
                               primaryText={knowledge.knowledge}/>
            })
          }
        </SelectField>
        <br/><br/>
        <RaisedButton label={"查询知识点评论"}
                      primary={true}
                      onClick={() => this.loadKnowledgeDiscuss(selectKnowledgeId)}></RaisedButton>
        <br/><br/>
        {
          discusses.map((discuss, index) => {
            return (
              <DiscussDisplayComponent key={index}
                                       clickVote={(discussId, priority) => this.voteKnowledgeDiscuss(discussId, priority)}
                                       clickHide={(discussId, hide) => this.hideKnowledgeDiscuss(discussId, hide)}
                                       discuss={discuss}
                                       showHide={showHide}
                                       reply={(discussId, value) => this.replyKnowledge(discussId, value)}
              />
            )
          })
        }
      </div>
    )
  }

}

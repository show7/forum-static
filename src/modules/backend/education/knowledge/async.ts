import proxy from "components/proxy/requestProxy"

export function queryProblemKnowledges(problemId) {
  return proxy.getProxy(`/pc/asst/knowledge/load/problem/knowledges?problemId=${problemId}`)
}

export function queryKnowledgeDiscusses(knowledgeId) {
  return proxy.getProxy(`/pc/asst/knowledge/load/discuss?knowledgeId=${knowledgeId}`)
}

export function voteKnowledgeDiscuss(discussId, priority) {
  return proxy.postProxy(`/pc/asst/knowledge/vote/discuss?discussId=${discussId}&priority=${priority}`)
}

export function hideKnowledgeDiscuss(discussId, hide) {
  return proxy.postProxy(`/pc/asst/knowledge/hide`, { discussId, hide })

}

export function replyKnowledgeDiscuss(comment, referenceId, repliedId) {
  return proxy.postProxy(`/rise/practice/knowledge/discuss`, {
    comment: comment,
    referenceId: referenceId,
    repliedId: repliedId
  })
}

export function checkShowHide() {
  return proxy.getProxy(`/pc/asst/knowledge/check/hide`)
}

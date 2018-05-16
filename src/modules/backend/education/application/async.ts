import {pget,ppost} from "utils/request"

export function loadProblems() {
  return pget("/pc/asst/problem/list");
}

export function loadRiseWorkList(problemId){
  return pget(`/pc/asst/homework/${problemId}`);
}

export function loadApplicationSubmit(cid, index,show) {
  return pget(`/pc/asst/application/submit/${cid}`, {page:index,show:show});
}

export function highlight(submitId){
  return ppost(`/pc/asst/application/highlight/applicationSubmit/${submitId}`,null)
}

export function unhighlight(submitId){
  return ppost(`/pc/asst/application/highlight/cancel/applicationSubmit/${submitId}`,null)
}

export function loadApplication(applicationId){
  return pget(`/pc/asst/application/load/${applicationId}`);
}

export function saveApplicationPractice(applicationId, topic, description) {
  return ppost(`/pc/operation/application/update/${applicationId}`, {topic: topic, description: description})
}

export function submitComment(type,submitId,content){
  return ppost(`/pc/asst/application/comment/${type}/${submitId}`,{content:content});
}


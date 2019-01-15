import {pget,ppost} from "utils/request"

export function loadProblems() {
  return pget("/pc/asst/problem/list");
}

export function loadRiseWorkList(problemId){
  return pget(`/pc/asst/homework/${problemId}`);
}

export function loadApplicationSubmit(cid,param) {
  return ppost(`/pc/asst/application/submit/${cid}`,param)
}

export function highlight(submitId){
  return ppost(`/pc/asst/application/highlight/applicationSubmit/${submitId}`,null)
}

export function unhighlight(submitId){
  return ppost(`/pc/asst/application/highlight/cancel/applicationSubmit/${submitId}`,null)
}
export function hideItem(submitId){
  return ppost(`/pc/asst/application/hide/applicationSubmit/${submitId}`,null)
}

export function cancleHide(submitId){
  return ppost(`/pc/asst/application/unHide/applicationSubmit/${submitId}`,null)
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


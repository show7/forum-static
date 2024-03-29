import {pget,ppost} from "../../../../../utils/request"

export function loadWarmUp(warmupPracticeId) {
  return pget(`/pc/asst/warmup/load/${warmupPracticeId}`)
}

export function  loadAllWarmupList(problemId){
  return pget(`/pc/operation/warmup/load/all/${problemId}`)
}

export function loadWarmupList(problemId) {
  return pget(`/pc/asst/warmup/list/${problemId}`)
}

export function loadProblems() {
  return pget("/pc/operation/problem/list");
}

export function saveWarmup(practice) {
  return ppost("/pc/operation/warmup/save", practice);
}

// 插入录入的选择题信息
export function insertWarmupPractice (param){
  return ppost(`/pc/operation/warmup/insert/practice`, param)
}

export function deleteExample(id){
  return pget(`/pc/operation/warmup/delete/example/${id}`)
}

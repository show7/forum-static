import {pget,ppost} from "utils/request"


export function loadWarmUp(warmupPracticeId) {
  return pget(`/pc/asst/warmup/load/${warmupPracticeId}`)
}

export function replyDiscuss(params) {
  return ppost(`/rise/practice/warmup/discuss`, params)
}

export function deleteWarmupDiscuss(discussId) {
  return pget(`/pc/asst/warmup/discuss/del/${discussId}`)
}

export function loadProblems() {
  return pget("/pc/asst/problem/list");
}

export function highlight(discussId){
  return ppost(`/pc/asst/warmup/highlight/discuss/${discussId}`,null)
}

export function unhighlight(discussId){
  return ppost(`/pc/asst/warmup/highlight/cancel/discuss/${discussId}`,null)
}

export function loadTargetDiscuss(interval){
  return pget(`/pc/operation/warmup/load/discuss?interval=${interval}`)
}

export function loadCurrentWarmup(warmupPracticeId,interval){
  return pget(`/pc/operation/warmup/load/target/${warmupPracticeId}?interval=${interval}`)
}

export function ignoreDiscuss(id,interval){
  return pget(`/pc/operation/warmup/ignore/discuss?discussId=${id}&interval=${interval}`)
}



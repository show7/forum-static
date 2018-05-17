import { pget, ppost } from 'utils/request'


export function loadSimpleProblems() {
  return pget(`/pc/asst/problem/simple`)
}

export function loadProblem(id) {
  return pget(`/pc/asst/problem/load/${id}`)
}

export function loadProblemCatalog() {
  return pget(`/pc/operation/problem/catalog/load`)
}

export function saveProblem(param) {
  return ppost(`/pc/operation/problem/save`, param)
}

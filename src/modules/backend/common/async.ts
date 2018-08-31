import { ppost, pget } from '../../../utils/request'

export function uploadFile(file) {
  return ppost(`/pc/upload/file`, file)
}

export function loadRichText(uuid) {
  return pget(`/pc/operation/richtext/load/${uuid}`)
}

export function saveRichText(param) {
  return ppost(`/pc/operation/richtext/save`, param)
}

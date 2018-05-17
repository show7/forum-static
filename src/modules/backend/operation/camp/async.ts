import { pget, ppost } from 'utils/request'

export function addCertificate (param) {
  return ppost(`/rise/operation/backend/generate/special/certificate`, param)
}

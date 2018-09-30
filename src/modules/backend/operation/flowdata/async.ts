import requestProxy from 'components/proxy/requestProxy';

/**
 * 加载所有头图信息
 * @returns {Promise<T>}
 */
export function loadAllHomeBanners () {
  return requestProxy.getProxy('/pc/operation/flow/banners');
}

/**
 * 插入新的头图
 * @param imageUrl 图片链接
 * @param linkUrl 点击链接
 * @param sequence 顺序
 * @returns {Promise<T>}
 */
export function insertBanner (imageUrl, linkUrl, sequence) {
  return requestProxy.postProxy('/pc/operation/flow/banner/insert', {
    imageUrl: imageUrl,
    linkUrl: linkUrl,
    sequence: sequence,
  });
}

/**
 * 更新头图
 * @param id 头图 id
 * @param imageUrl 图片链接
 * @param linkUrl 点击链接
 * @param sequence 顺序
 * @returns {Promise<T>}
 */
export function updateBanner (id, imageUrl, linkUrl, sequence) {
  return requestProxy.postProxy('/pc/operation/flow/banner/update', {
    id: id,
    imageUrl: imageUrl,
    linkUrl: linkUrl,
    sequence: sequence,
  });
}

/**
 * 删除头图
 * @param id 头图 id
 * @returns {Promise<T>}
 */
export function deleteBanner (id) {
  return requestProxy.postProxy(`/pc/operation/flow/banner/delete?id=${id}`);
}

export function loadAllLivesFlow () {
  return requestProxy.getProxy('/pc/operation/flow/lives');
}

export function insertLivesFlow (params) {
  return requestProxy.postProxy('/pc/operation/flow/lives/insert', params);
}

export function updateLivesFlow (params) {
  return requestProxy.postProxy('/pc/operation/flow/lives/update', params);
}

export function deleteLivesFlow (id) {
  return requestProxy.postProxy(`/pc/operation/flow/lives/delete?id=${id}`);
}

export function loadAllActivitiesFlow () {
  return requestProxy.getProxy('/pc/operation/flow/activities');
}

export function insertActivityFlow (params) {
  return requestProxy.postProxy('/pc/operation/flow/activities/insert', params);
}

export function updateActivityFlow (params) {
  return requestProxy.postProxy('/pc/operation/flow/activities/update', params);
}

export function deleteActivityFlow (id) {
  return requestProxy.postProxy(`/pc/operation/flow/activities/delete?id=${id}`);
}

export function loadAllArticles () {
  return requestProxy.getProxy('/pc/operation/flow/articles');
}

export function insertArticle (params) {
  return requestProxy.postProxy('/pc/operation/flow/article/insert', params);
}

export function updateArticle (params) {
  return requestProxy.postProxy('/pc/operation/flow/article/update', params);
}

export function deleteArticle (id) {
  return requestProxy.postProxy(`/pc/operation/flow/article/delete?id=${id}`);
}

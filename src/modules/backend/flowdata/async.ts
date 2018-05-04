import requestProxy from '../../../components/proxy/requestProxy';

/**
 * 加载所有头图信息
 * @returns {Promise<T>}
 */
export function loadAllHomeBanners () {
  return requestProxy.getProxy('/backend/flow/banners');
}

/**
 * 插入新的头图
 * @param imageUrl 图片链接
 * @param linkUrl 点击链接
 * @param sequence 顺序
 * @returns {Promise<T>}
 */
export function insertBanner (imageUrl, linkUrl, sequence) {
  return requestProxy.postProxy('/backend/flow/banner/insert', {
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
  return requestProxy.postProxy('/backend/flow/banner/update', {
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
  return requestProxy.postProxy(`/backend/flow/banner/delete?id=${id}`);
}

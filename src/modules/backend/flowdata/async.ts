import requestProxy from '../../../components/proxy/requestProxy';

export function loadAllHomeBanners () {
  return requestProxy.getProxy('/backend/flow/banners');
}

export function insertBanner (imageUrl, linkUrl, sequence) {
  return requestProxy.postProxy('/backend/flow/banner/insert', {
    imageUrl: imageUrl,
    linkUrl: linkUrl,
    sequence: sequence,
  });
}

export function updateBanner (id, imageUrl, linkUrl, sequence) {
  return requestProxy.postProxy('/backend/flow/banner/update', {
    id: id,
    imageUrl: imageUrl,
    linkUrl: linkUrl,
    sequence: sequence,
  });
}

export function deleteBanner (id) {
  return requestProxy.postProxy(`/backend/flow/banner/delete?id=${id}`);
}

import qs from 'qs';

export function buildUrl(baseOrSections: string | string[], query: any = {}) {
  const url = Array.isArray(baseOrSections) ? baseOrSections.map((p, index) => {
    let next = p.replace(/\/+$/, '');
    if (index > 0) next = next.replace(/^\/+/, '');
    return next;
  }).join('/') : baseOrSections;
  const q = qs.stringify(query);
  if (q) return `${url}?${q}`;
  return url;
}
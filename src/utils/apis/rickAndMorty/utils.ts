export function getIdFromUrl(url: string): number | undefined {
  const idString = url.split('/').pop();
  return typeof idString === 'undefined' ? undefined : parseInt(idString);
}

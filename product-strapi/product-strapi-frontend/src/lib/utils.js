export const getImageUrl = (img, baseUrl = 'http://localhost:1337') => {
  const imageUrl =
    img?.formats?.medium?.url ||
    img?.formats?.small?.url ||
    img?.formats?.thumbnail?.url ||
    img?.url;
  return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
};
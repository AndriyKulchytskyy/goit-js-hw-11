export function pictureTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<div class="gallery__item">
  <a class="gallery__link" href="${largeImageURL}" >
    <img class="gallery__img"
      src="${webformatURL}"
      width="300px"
      height="200px"
      alt="${tags}"
      loading="lazy"
    />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <i>${likes}</i>
    </p>
    <p class="info-item">
      <b>Views</b>
      <i>${views}</i>
    </p>
    <p class="info-item">
      <b>Comments</b>
      <i>${comments}</i>
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <i>${downloads}</i>
    </p>
  </div>
</div>`;
}

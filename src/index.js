import './sass/main.scss';
import Notiflix from 'notiflix';
import AnimalsApi from './js/animals_api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import LoadMoreBtn from './js/load_more_button';


const formSearch = document.querySelector('.search-form');
// const btnLoadMore = document.querySelector('button[data-action="load-more"]');
const divGalleryEl = document.querySelector('.gallery');


 const loadMorebtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const animalsApi = new AnimalsApi();
console.log(loadMorebtn);
console.log();

formSearch.addEventListener('submit', imageSearch);

 function imageSearch(e) {
    e.preventDefault();
    
    animalsApi.searchQuery = e.currentTarget.elements.searchQuery.value; 
    
    if (animalsApi.searchQuery === ''){
      return Notiflix.Notify.failure('Введите что-то для поиска изображений!');
      
    };
   
    loadMorebtn.show();
    loadMorebtn.disable();
    animalsApi.resetPage();
    
    animalsApi.fetchArticles().then(hits => {
      clearHitsContainer();
      appendHitsMarkup(hits);
      loadMorebtn.enable();
    });
    
    };
    
    


  // btnLoadMore.addEventListener('click', onLoadMore);
  loadMorebtn.refs.button.addEventListener('click', onLoadMore);

  function onLoadMore(e){
    animalsApi.fetchArticles().then(appendHitsMarkup);
  };


  function appendHitsMarkup (hits){
    const galleryCard = hits.map(item => 
      `<div class="photo-card">
      <a href="${item.largeImageURL}" class="gallery__link">
      <img src="${item.previewURL}" alt="${item.tags}" loading="lazy" width='150' height='100' /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes: ${item.likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${item.views}</b>
      </p>
      <p class="info-item">
        <b>Comments :${item.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${item.downloads}</b>
      </p>
    </div>
  </div>`).join('');
    divGalleryEl.insertAdjacentHTML('beforeend', galleryCard);
    let gallery = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
  };
  
function clearHitsContainer(){
  divGalleryEl.innerHTML = '';
};


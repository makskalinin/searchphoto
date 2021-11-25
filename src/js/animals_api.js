import Notiflix from 'notiflix';
export default class AnimalsApi{
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }
    fetchArticles(){
    const URL = `https://pixabay.com/api/?key=24468544-3d8c73577448d4a3445184243&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40&lang=ru+en`;
    return fetch(URL)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        this.page += 1;
        if(data.hits.length === 0){
            return Notiflix.Notify.failure('Введите корректный запрос!');
        }
        return data.hits;
        
    })
    }

    resetPage(){
        this.page = 1;
    }
    get query(){
        return this.searchQuery;
    }

    set query(newQuery){
        this.searchQuery = newQuery;
    }
}
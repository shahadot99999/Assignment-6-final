// news category menu bar 
const loadNewsCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.news_category ;  
}

//news category diplaybar
const displayNewsCategories = async () =>{
    try{
        const values = await loadNewsCategories();
        const categoriesList =document.getElementById('categories');
        values.forEach(value => {
            const setLi = document.createElement('li');
            setLi.classList.add('nav-item');
            setLi.innerHTML = `
                <a onclick = "loadCategoriesId('${value.category_id}')" class="nav-link active 
                    text-muted px-4  ps-5" aria-current="page" href="#">${value.category_name}</a>
            `;
           
            categoriesList.appendChild(setLi);
        });
    }

    catch(error){
        console.log(error);
    }
}
// news category menu bar 
const loadNewsCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    return data.data.news_category ;  
}

//news category diplaybar
const displayOnlineNewsCategories = async () =>{
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
displayOnlineNewsCategories();

//news categories card body

const loadCategoriesId =async (category_id) =>{
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const num = await fetch(url);
    const data = await num.json();
    displayNewsCategoriesId( data.data);
}

const displayNewsCategoriesId = (datas) =>{
    // input field
    const inputField = document.getElementById('floatingInput');
    inputField.value = datas.length + ' items found for category';

    // data not found
    const notFound = document.getElementById('not-found');
    
    //card area 
    const cardGroups = document.getElementById('card-group');
    cardGroups.innerHTML="";

    // data sort 
    
    const sortArray = [];
    // console.log(sortArray);
    const dataa = datas.sort((a,b) =>{
        return b.total_view -a.total_view;
    });

    if(datas.length>0){
        for(const data of dataa){
            const setDiv = document.createElement('div');
            setDiv.classList.add('card');
            setDiv.classList.add('mb-3');
            setDiv.innerHTML = `
            <div onclick="loadModal('${data._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal" class="row g-0">
            <div class="col-md-4">
              <img src="${data.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.details.length>250?data.details.slice(0,250) + '....' : data.details}</p>
              </div>
              <div class="d-flex">
               <div> 
                    <a href="#"><img src="${data.author.img}" class="ms-lg-5 ms-sm-2 mt-2 border rounded-circle
                      nav-img" alt="Cinque Terre"></a>
                </div>
                <div class="ps-2">
                    <p>${data.author.name? data.author.name : 'no name'} <br> 
                        ${data.author.published_date? data.author.published_date : 'no date'}</p>
                </div>
                <div class="p-lg-2 ps-lg-5 ps-5 mt-sm-3">
                <h6><i class="fa-solid fa-eye"></i> ${data.total_view?data.total_view : 'no view'}</h6>
              </div>
                <div class="text-lg-end w-50 w-sm-25 ps-sm-5 ms-sm-5 mt-sm-3">
                <a href="#"><i class="fa-sharp fa-solid fa-arrow-right"></i></a>
                </div>
                </div>
            </div>
          </div>
            
            `;
            cardGroups.appendChild(setDiv); 
        }
        notFound.classList.add('d-none');
    }
    else{
        notFound.classList.remove('d-none');
    }
    toggleSpinner(false);
}

// set the model
const loadModal =async (news_id) =>{
    try{
     const url =`https://openapi.programming-hero.com/api/news/${news_id}`;
     const res = await fetch(url);
     const data = await res.json();
     const modalTitle = document.getElementById('exampleModalLabel');
     modalTitle.innerText = data.data[0].title.length>40? data.data[0].title.slice(0,35) + '...' :data.data[0].title;
 
     const modalBody =document.getElementById('model-body');
     modalBody.innerHTML = `
     <p>Rating-badge: ${data.data[0].rating.badge}</p>
     <p>Rating-Number: ${data.data[0].rating.number}</p>
     <p>Author Name: ${data.data[0].author.name}</p>
     <p>Viwe: ${data.data[0].total_view}</p>
     <p>Unique-ID: ${data.data[0]._id}</p>
     
     `;
    }
    catch(error){
     console.log(error);
    }
    
 }
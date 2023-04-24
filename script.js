const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
//searchBtn.addEventListener('click', getMealList);
//mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// const getRecipe = async () => {
//     const recipeData = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=eggs`)
//         console.log(recipeData)
//     }

// getRecipe();

let recipeIDList = 0

searchBtn.addEventListener('click', async () => {
    let searchInputTxt = document.getElementById('search-input').value.trim();
    recipeURL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`

    let response = await axios.get(recipeURL)
    console.log(response.data.meals.length)

    recipeIDList = response.data.meals.length

    let html = "";
    for (let i=0; i<response.data.meals.length; i++){
        console.log(response.data.meals[0].idMeal)
        html += `
            <div class = "meal-item" data-id = "${response.data.meals[i].idMeal}">
                <div class = "meal-img">
                    <img src = "${response.data.meals[i].strMealThumb}" alt = "food">
                </div>
                <div class = "meal-name">
                    <h3>${response.data.meals[i].strMeal}</h3>
                    <a href = "#" class = "recipe-btn">Get Recipe</a>
                </div>
            </div>
                `;
            mealList.innerHTML = html;
    }

})

//console.log(recipeIDList)

mealList.addEventListener('click', async(e) => {
    let mealItem = e.target.parentElement.parentElement;
    e.preventDefault
    if(e.target.classList.contains('recipe-btn')){
    //let mealItem = response.data.id
    console.log(mealItem.dataset.id)

    let recipeURL = (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
    let response = await axios.get(recipeURL)
    console.log(response.data.meals[0].strInstructions)
    let html = "";
    html += `
             <h2 class = ""recipe-title">${response.data.meals[0].strMeal}</h2>
               <p class = "recipe-category">Recipe type: ${response.data.meals[0].strCategory}</p>
            <div class = "recipe-instruct">
                <h3>Instructions:</h3>
               <p>${response.data.meals[0].strInstructions}</p>
           </div>
           <div class = "recipe-meal-img">
               <img src = "${response.data.meals[0].strMealThumb}" alt = "">
           </div>
               `;

               mealDetailsContent.innerHTML = html;
               mealDetailsContent.parentElement.classList.add('showRecipe');
}   
})


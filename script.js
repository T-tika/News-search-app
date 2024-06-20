const apikey ='f29bdc15eea94a2298148d6b57c2e49f'

const blogcontainer = document.getElementById("blog-container")
const searchField= document.getElementById('search-input')
const searchButton= document.getElementById('search-button')



async function fetchRandomNews(){
    try{
      const apiUrl =`https://newsapi.org/v2/top-headlines?country=us&ppageSize=10&apikey=${apikey}`
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(response)
     return data.articles;
    }
    catch(error){
     console.error("error fetching random news",error)
     return[]
    }
}

fetchRandomNews()

searchButton.addEventListener("click",async()=>{
    const query =searchField.value.trim()
    if(query!=="")
        try{
        const article= await fetchNewsQuery(query)
        displayBlogs(article)
    }
    catch(error){
console.log("Error fetching news by query",error)
    }
})
async function fetchNewsQuery(query){
    try{
        const apiUrl =`https://newsapi.org/v2/everything?q=${query}&ppageSize=10&apikey=${apikey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(response)
       return data.articles;
      }
      catch(error){
       console.error("error fetching random news",error)
       return[]
      }
}



function displayBlogs(articles){
    blogcontainer.innerHTML = '';
    articles.forEach((article)=>{
        const blogCard = document.createElement("div")
        blogCard.classList.add("blog-card")
        const img = document.createElement("img")
        img.src =article.urlToImage

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length>30? article.title.slice(0,30)+"....": article.title;
        title.textContent =truncatedTitle;
        // title.textContent = article.title;
        console.log(title.textContent);
        // img.alt= articles.title= document.createElement("h2")
        // title.textContet =article.title
        const description = document.createElement ("p")
        const truncatedDes = article.description.length>120? article.title.slice(0,120)+"....": article.description;

        description.textContent=truncatedDes;
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",()=>{
            window.open(article.url,"blank");
        });
        blogcontainer.appendChild(blogCard);
    });
}
    ( async()=>{
try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);

}
catch(error)
{
    console.error("error fetching randodm news",error);

}
    })();
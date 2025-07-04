const searcForm=document.querySelector('form');
const movieContainer=document.querySelector('.movie-container');
const inputBox=document.querySelector('.inputBox');

//Function to fetch Movie Deatils using OMDB API


    const getMovieInfo=async(movie)=>{
        try{
    const myAPIkey="46ee7a3";
    const url=`http://www.omdbapi.com/?apikey=${myAPIkey}&t=${movie}`
    const respone=await fetch(url);
    if(!respone.ok){
        throw new Error("Unable to fetch Movie Data");
    }
    const data=await respone.json();
    
    showMovieData(data);
}

catch(error){
    showErrorMessage("No movie Found!!!");
}
    }


//Function to Show movie Data
const showMovieData=(data)=>{
    movieContainer.innerHTML="";
    movieContainer.classList.remove('noBackground');
    //Use Destructuring Assignment to extract properties from data object
    // we can also write like (data.title,data.actors).....
    const{Title,imdbRating,Genre,Released,Runtime,Actors,Plot,Poster}=data;

    const movieElement=document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML=`<h2>${Title}</h2> <p> <strong>Rating: &#11088 </strong>${imdbRating}</p>`;

    const movieGenreElement=document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element=>{
        const p=document.createElement('p');
        p.innerText=element;
        movieGenreElement.appendChild(p);
    })
    movieElement.appendChild(movieGenreElement);

    //Here we don't want it's replacement so we use movieElement.innerHtml+=....;
    movieElement.innerHTML+= `<p> <strong>Released Date:</strong>${Released}</p>
                            <p> <strong>Duration:</strong>${Runtime}</p>
                            <p> <strong>Cast:</strong>${Actors}</p>
                            <p> <strong>Plot:</strong>${Plot}</p>`;



    //Creating a div for Movie Poster
    const moviePosterElement=document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML= `<img src="${Poster}"/>`;
    movieContainer.appendChild(moviePosterElement); 


    movieContainer.appendChild(movieElement);

}

//Function to display Error Message
const showErrorMessage=(message)=>{
    movieContainer.innerHTML==`<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');
}

//Adding Event Listener to Search Form
searcForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const movieName=inputBox.value.trim();
    if(movieName!==""){
        getMovieInfo(movieName);
    }
    else{
       showErrorMessage("Enter movie name to get movie information");
    }
});

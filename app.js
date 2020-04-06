async function getData(title , type){
    const data = await fetch(`https://www.omdbapi.com/?${type}=${title}&apikey=1c41a392`);
    const jData = await data.json();
    return jData;
}

const noResult = (type)=>{
    document.getElementById('container').innerHTML = ``;

    const boxBody = document.createElement(`div`);
    boxBody.className = `inputSection`;
    
    const title = document.createElement(`div`);
    title.className = `boxTitle`;
    title.style = `padding:1.5rem;`
    type === `noResult` ? title.innerHTML = `Can't find any Result!!!` : title.innerHTML = `Fill the input First!`;
    boxBody.appendChild(title);

    document.getElementById('container').appendChild(boxBody);
}

const searchMovies = (title)=>{
    document.getElementById('container').innerHTML = ``;

    const makeUi = (Data)=>{
        const arrayData = Array.from(Data.Search);
        arrayData.forEach((singleData)=>{
            const {Title,Year,imdbID,Type,Poster} = singleData;
            
            console.log(Title,Year,imdbID,Type,Poster);
            const box = document.createElement(`div`);
            box.className = `box`;

            const img = document.createElement(`img`);
            img.className = `boxImg`;
            img.src = Poster;
            img.alt = `Poster`;
            box.appendChild(img);

            const title = document.createElement(`div`);
            title.className = `boxTitle`;
            const titleA = document.createElement(`a`);
            titleA.innerHTML = Title;
            titleA.href = `https://www.imdb.com/title/${imdbID}/?ref_=ttls_li_tt`;
            titleA.target = `_`;
            title.appendChild(titleA);
            box.appendChild(title);

            const rd = document.createElement(`div`);
            rd.className = `boxSec`;
            rd.innerHTML = `Release date: ${Year}`;
            box.appendChild(rd);

            const id = document.createElement(`div`);
            id.className = `boxSec`;
            id.innerHTML = `imdb ID: ${imdbID}`;
            box.appendChild(id);

            const tp = document.createElement(`div`);
            tp.className = `boxSec`;
            tp.innerHTML = `Type: ${Type}`;
            box.appendChild(tp);

            document.getElementById('container').appendChild(box);
        })
    }

    getData(title,'s')
    .then(Data => makeUi(Data))
    .catch(Err => noResult(`noResult`));
}
const SearchBtn = ()=>{
    const title = document.getElementById(`input`).value;
    const Err = ()=> noResult();
    title != `` ? searchMovies(title): Err();
}

document.getElementById(`submitBtn`).addEventListener(`click`,SearchBtn);

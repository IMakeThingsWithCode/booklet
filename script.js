function hideLoadingBar() {
    loadingbar = document.getElementById("loadingBar");
    loadingbar.style.visibility = "hidden";
};

function showLoadingBar() {
    loadingbar = document.getElementById("loadingBar");
    loadingbar.style.visibility = "visible";
}

function handleData(data) {
    console.log(data);
    books = data.works;
    var container = document.getElementById('titlesCont');
    container.innerHTML = '';

    for (i = 0; i < books.length; i++) {
        if (true) { //check publish date?? can't find a way :/
            console.log(data.works[i].title)
            cover = 'https://covers.openlibrary.org/b/id/' + data.works[i].cover_id + '-M.jpg'
            container.innerHTML += "<button class=\"bookResultCover\" onclick=\"window.location.href='https://openlibrary.org" + data.works[i].key + "'\"><img class=\"coverimg\" src=\"" + cover + "\" / width=" + (window.innerWidth / 8) + " height=" + ((window.innerWidth / 8) * 1.6) + "><p class=\"imgtitle\">" + data.works[i].title + " by " + data.works[i].authors[0].name + "</p></img><div class=\"shade\"></div></button>"; //<a href=\'https://openlibrary.org' + data.works[i].key + '\'>' + data.works[i].title + '<a/>
        }
    }
    hideLoadingBar();
}

async function categorySearch(q, callback) {
    showLoadingBar();
    let response = await fetch('https://openlibrary.org/subjects/' + q + '.json?limit=250');
    let data = await response.json();
    callback(data);
}

function addCategoryBooklet() {
    query = document.getElementById('add').value;
    query = query.replace(' ', '_');
    console.log('<' + query + '>');

    if (query == '') {
        var container = document.getElementById('titlesCont');
        container.innerHTML = '';
        var result = document.getElementById('result');
        result.innerHTML = '';
    }

    categorySearch(query, handleData);
}
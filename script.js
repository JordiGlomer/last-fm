class Song {
    constructor(group, url, title, listeners, genre) {
        this.group = group;
        this.url = url;
        this.title = title;
        this.listeners = listeners;
        this.genre = genre;
    }

    setItemLi() {

    }
    setItemGroupName() {

    }
    setItemSongTitle() {

    }
    setListeners() {

    }
    getNewElement() {

    }
}


const loadGenre = (e) => {
    changeFocus(e);
    let temp = [];
    songs.forEach((i) => {
        if (i.genre.toLowerCase() == e.path[0].innerHTML.toLowerCase()) {
            temp.push(i);
        }
    });
    console.log(temp);
    loadSongs(temp);
};

const loadSongs = (lista) => {

};



const loadTenListened = (e) => {

    changeFocus(e);

    let temp = [];
    temp = [...songs];
    temp.sort((a, b) => {
        if (a.listeners > b.listeners) {
            return 1;
        }
        if (a.listeners < b.listeners) {
            return -1;
        }
        return 0;
    });
    temp.length = 10;
    loadSongs(temp);
};

const loadOverview = () => {
    let overview = document.querySelector('[href="#Overview"]');
    overview.focus();
    document.querySelector(".menu-item-selected").innerHTML = overview.innerHTML;

    loadSongs(songs);
};

const loadBiggest = (e) => {

    changeFocus(e);

    let artistas = [];
    let add = true;
    let temp = [];

    songs.map((e) => {
        add = true;
        artistas.forEach((i) => {

            if (i.group == e.group) {
                i.listeners = parseInt(i.listeners) + parseInt(e.listeners);
                add = false;
            }
        });
        if (add) {

            artistas.push(new Song(e.group, e.url, e.title, e.listeners));
        }
    });

    artistas.sort((a, b) => {
        if (a.listeners < b.listeners) {
            return 1;
        }
        if (a.listeners > b.listeners) {
            return -1;
        }
        return 0;
    });

    songs.map((e) => {
        if (e.group == artistas[0].group) {
            temp.push(e);
        }
    });
    loadSongs(temp);


};

const init = () => {
    fetch("./music.json")
        .then(data => data.json())
        .then(json => {
            json.forEach(i => {
                loadSongs.push(new Song(i.artist.name, i.artist.url, i.name, i.listeners, i.genre));

            });
            console.log("fetch...?");

        });
    document.querySelector('[href="#Overview"]').addEventListener("click", loadOverview);
    document.querySelector('[href="#Top10Listened"]').addEventListener("click", loadTenListened);
    document.querySelector('[href="#Thebiggest"]').addEventListener("click", loadBiggest);
    document.querySelector('[href="#rock"]').addEventListener("click", loadGenre);
    document.querySelector('[href="#hip-hop"]').addEventListener("click", loadGenre);
    document.querySelector('[href="#indie"]').addEventListener("click", loadGenre);
    document.querySelector('[href="#jazz"]').addEventListener("click", loadGenre);
    document.querySelector('[href="#reggae"]').addEventListener("click", loadGenre);
    //document.querySelector('./music.json').addEventListener('click', loadSongs);

};


window.onload = init;

loadOverview();

function changeFocus(e) {
    e.path[0].focus();
    document.querySelector(".menu-item-selected").innerHTML = e.path[0].innerHTML;

}
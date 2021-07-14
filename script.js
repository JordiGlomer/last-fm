class Song {
    constructor(group, url, title, listeners, genre) {
        this.group = group;
        this.url = url;
        this.title = title;
        this.listeners = listeners;
        this.genre = genre;
    }

    setItemLi() {
        let li = document.createElement('li');
        li.classList.add('far', 'fa-play-circle');
        return li;

    }

    setItemGroupName(group, url) {
        let banda = document.createElement('a');
        banda.classList.add('group-name');
        banda.setAttribute('title', 'Ir al grupo');
        banda.setAttribute('href', url);
        let content = document.createTextNode(group);
        banda.appendChild(content);
        return banda;
    }
    setItemSongTitle(title) {
        let tema = document.createElement('a');
        tema.classList.add('song-title');
        let content = document.createTextNode(title);
        tema.appendChild(content);
        return tema;
    }
    setListeners(listeners) {
        let oientes = document.createElement('div');
        let span = document.createElement('span');
        oientes.classList.add('listeners');
        let content = document.createTextNode(listeners);
        let info = document.createTextNode(' listeners');
        oientes.appendChild(content);
        oientes.appendChild(span);
        return oientes;
    }
    getNewElement(group, url, title, listeners) {
        let itemLi = this.setItemLi();
        let itemGrupo = this.setItemGroupName(group, url);
        let itemTema = this.setItemSongTitle(title);
        let itemOientes = this.setListeners(listeners);

        itemLi.appendChild(itemGrupo);
        itemLi.appendChild(itemTema);
        itemLi.appendChild(itemOientes);

        return itemLi;
    }
}
let songs = [];

const loadGenre = (e) => {
   // changeFocus(e);
    let garage = [];
    songs.forEach((i) => {
        if (i.genre.toLowerCase() == e.path[0].innerHTML.toLowerCase()) {
            garage.push(i);
        }
    });
    console.log(garage);
    loadSongs(garage);
};

const loadSongs = (lista) => {
    let div = document.querySelector(".lista");
    div.innerHTML = "";
    for (const obj of lista) {
        let li = obj.getNewElement(obj.group, obj.url, obj.title, obj.listeners);
        div.appendChild(li);
    }

};


const loadTenListened = (e) => {

   // changeFocus(e);

    let garage = [];
    garage = [...songs];
    garage.sort((a, b) => {
        if (a.listeners > b.listeners) {
            return -1;
        }
        if (a.listeners < b.listeners) {
            return 1;
        }
        return 0;
    });
    garage.length = 10;
    loadSongs(garage);
    console.log("top 10");
};

const loadOverview = () => {
    let overview = document.querySelector('[href="#Overview"]');
    overview.focus();
    document.querySelector(".menu-item-selected").innerHTML = overview.innerHTML;

    loadSongs(songs);
    console.log("overview");
};

const loadBiggest = (e) => {

   // changeFocus(e);

    let cracks = [];
    let add = true;
    let garage = [];

    songs.map((e) => {
        add = true;
        cracks.forEach((i) => {
            if (i.group == e.group) {
                i.listeners = parseInt(i.listeners) + parseInt(e.listeners);
                add = false;
            }
        });
        if (add) {
            cracks.push(new Song(e.group, e.url, e.title, e.listeners));
        }

    });

    cracks.sort((a, b) => {
        if (a.listeners < b.listeners) {
            return -1;
        }
        if (a.listeners > b.listeners) {
            return 1;
        }
        return 0;
    });
    songs.map((e) => {
        if (e.group == cracks[0].group) {
            garage.push(e);
        }
    });
    loadSongs(garage);
    console.log("biggest");
};


const init = () => {

    fetch("./music.json")
        .then(data => data.json())
        .then(json => {
            json.forEach(i => {
                songs.push(new Song(i.artist.name, i.artist.url, i.name, i.listeners, i.genre));
            });
            loadOverview();
            console.log('fetch');
        });

    document.querySelector('[href="#Overview"]').addEventListener("click", loadOverview);
    document.querySelector('[href="#Top10Listened"]').addEventListener("click", loadTenListened);
    document.querySelector('[href="#Thebiggest"]').addEventListener("click", loadBiggest);
    document.querySelector('[href="#rock"]').addEventListener("click", loadGenre);
    document.querySelector('[href="#hip-hop"]').addEventListener("click", loadGenre);
    document.querySelector('[href="#indie"]').addEventListener("click", loadGenre);
    document.querySelector('[href="#jazz"]').addEventListener("click", loadGenre);
    document.querySelector('[href="#reggae"]').addEventListener("click", loadGenre);


};


window.onload = init;


function changeFocus(e) {
    e.path[0].focus();
    document.querySelector(".menu-item-selected").innerHTML = e.path[0].innerHTML;

}
const input = document.getElementById('input');
const searchBtn = document.querySelector('.search-btn');
const albumList = document.querySelector('.album-list')
const albumNameList = albumList.querySelectorAll('strong');
const artistName = albumList.querySelectorAll('span');
const getLyricsBtnList1 = albumList.querySelectorAll('button');
const lyricsEl = document.querySelector('.lyric');
const lyricsEl2 = document.querySelector('.lyric2');

document.addEventListener('keydown', event => {
    if (event.keyCode == 13) {
        searchBtn.click();
    }
})
searchBtn.addEventListener('click', () => {
    fetch(`https://api.lyrics.ovh/suggest/${input.value}`)
        .then(res => res.json())
        .then(data => {
            // <-------------showing data to result list---------------->
            for (let i = 0; i < albumNameList.length; i++) {
                let album = data.data[i].album.title;
                let artist = data.data[i].artist.name;

                albumNameList[i].innerText = album;
                artistName[i].innerText = artist;
            }
            
            //  <--------------Get lyrics Button hendeling------------->
            getLyricsBtnList1.forEach((element, index) => {
                element.addEventListener('click', () => {
                    let artist = data.data[index].artist.name;
                    let songTitle = data.data[index].title;
                    lyricsShowFunc(artist, songTitle, index)
                })
            })


            // <---------------- Extra works----------------->
            const searchResult = document.querySelector('.search-result');
            const lyricsName = searchResult.querySelectorAll('.lyrics-name');
            const artistEl = searchResult.querySelectorAll('span');
            const getLyricsBtnList2 = searchResult.querySelectorAll('button')
            const durationEl = document.querySelectorAll('.duration')
            const albumImgEl = document.querySelector('.album-img')

            for (let i = 0; i < 4; i++) {
                let album = data.data[i].album.title;
                let artistName = data.data[i].artist.name;
                let duration = data.data[i].duration;

                lyricsName[i].innerText = album;
                artistEl[i].innerText = artistName;
                durationEl[i].innerText = 'Duration : ' + duration;
            }

            getLyricsBtnList2.forEach((element, index) => {
                element.addEventListener('click', () => {
                    let artist = data.data[index].artist.name;
                    let songTitle = data.data[index].title;
                    let albumImgSrc = data.data[index].album.cover_medium;

                    albumImgEl.src = albumImgSrc;
                    lyricsShowFunc(artist, songTitle, index)
                })
            })
        })
})
const titleEl1 = document.getElementById('title1');
const titleEl2 = document.getElementById('title2');
lyricsEl.innerHTML = null;
lyricsEl2.innerHTML = null;

// <-----------showing lyrlics into lyrics section------->
const lyricsShowFunc = (artist, songTitle, index) => {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`)
        .then(response => response.json())
        .then(data => {
            lyricsEl.innerHTML = data.lyrics;
            lyricsEl2.innerHTML = data.lyrics;
            titleEl1.innerText = artist + " - " + songTitle;
            titleEl2.innerText = artist + " - " + songTitle;

            if (index <= 5) window.scrollBy(0, 700);
            else if (5 < index && index < 8) window.scrollBy(0, 400);
        })
}
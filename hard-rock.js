const input = document.getElementById('input');
const searchBtn = document.querySelector('.search-btn');
const albumList = document.querySelector('.album-list')
const albumNameList = albumList.querySelectorAll('strong');
const artistName = albumList.querySelectorAll('span');
const getLyricsBtnList1 = albumList.querySelectorAll('button');
const lyricsEl = document.querySelector('.lyric');
const lyricsEl2 = document.querySelector('.lyric2');
console.log(getLyricsBtnList1)
document.addEventListener('keydown', event => {
    if (event.keyCode == 13) {
        searchBtn.click();
    }
})
searchBtn.addEventListener('click', () => {
    fetch(`https://api.lyrics.ovh/suggest/${input.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            for (let i = 0; i < albumNameList.length; i++) {
                let album = data.data[i].album.title;
                let artist = data.data[i].artist.name;

                albumNameList[i].innerText = album;
                artistName[i].innerText = artist;
            }

            getLyricsBtnList1.forEach((element, index) => {
                element.addEventListener('click', () => {
                    let artist = data.data[index].artist.name;
                    let songTitle = data.data[index].title;
                    lyricsShowFunc(artist, songTitle, index)
                    
                    if(index  <= 5) window.scrollBy(0, 700);
                    else if(5 < index && index < 8 ) window.scrollBy(0, 400);
                    else if(index > 7)window.scroll(0, 200)
                })
            });

            // //  Extra works
            // const searchResult = document.querySelector('.search-result');
            // const lyricsName = searchResult.querySelectorAll('.lyrics-name');
            // const artistEl = searchResult.querySelectorAll('span');
            // const getLyricsBtnList2 = searchResult.querySelectorAll('button')
        
            // for (let i = 0; i < 4; i++) {
            //     let album = data.data[i].album.title;
            //     let artistName = data.data[i].artist.name;
            //     lyricsName[i].innerText = album;
            //     artistEl[i].innerText = artistName;
            // }
            // getLyricsBtnList2.forEach((element, index) => {
            //     element.addEventListener('click', () => {
            //         let artist = data.data[index].artist.name;
            //         let songTitle = data.data[index].title;
            //         lyricsShowFunc(artist, songTitle, index)
            //         // window.scrollBy(0, 700);
            //     })
            // })
        })
})
  const titleEl1 = document.getElementById('title1');
  const titleEl2= document.getElementById('title2');

const lyricsShowFunc = (artist, songTitle, index) => {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`)
        .then(response => response.json())
        .then(data => {
            lyricsEl.innerHTML = data.lyrics;
            lyricsEl2.innerHTML = data.lyrics;
            titleEl1.innerText = artist + " - " + songTitle;
            titleEl2.innerText = artist + " - " + songTitle; 
        })
}

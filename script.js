console.log("Welcome to Spotify");

//initializing the variables
let songIndex = 0;
let audioElement = new Audio('songs/song1.mp3');


let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('MyProgressBar');
let myGif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

let songs = [
    {songName: "Roots", filePath: "songs/song1.mp3", coverPath:"cover1.png"},
    {songName: "Who says", filePath: "songs/song2.mp3", coverPath:"covers/who_says.jpg"},
    {songName: "Feel me", filePath: "songs/song3.mp3", coverPath:"covers/feel me.jpg"},
    {songName: "Baby", filePath: "songs/song4.mp3", coverPath:"covers/baby_song.jpg"},
    {songName: "Single soon", filePath: "songs/song5.mp3", coverPath:"covers/single_soon.jpg"},
]

//handling play/pause click:-
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        myGif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        myGif.style.opacity = 0;
    }
    
})
// audioElement.play()

//listen to events

audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //updating the seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        // console.log(e.target);      //by this i got the element which is clicked by user
        makeAllPlays();
        
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/song${songIndex}.mp3`;
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex<5) songIndex++;
    else songIndex = 1;
    audioElement.src = `songs/song${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex>1) songIndex--;
    else songIndex = 5;
    audioElement.src = `songs/song${songIndex}.mp3`;
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

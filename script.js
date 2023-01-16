let $nowPlaying = document.querySelector('.now-playing');
let $trackArt   = document.querySelector('.track-art');
let $trackName  = document.querySelector('.track-name');
let $trackArtist= document.querySelector('.track-artist');

let $playPause = document.querySelector('.playpause-track');
let $nextBtn = document.querySelector('.next-track');
let $prevBtn = document.querySelector('.prev-track');

let $seekSlider = document.querySelector('.seek-slider');
let $volumeSlider = document.querySelector('.volume-slider');
let $currTime     = document.querySelector('.current-time');
let $totalDuration     = document.querySelector('.total-duration');
let $wave     = document.querySelector('.wave');
let $randomIcon     = document.querySelector('.fa-random');
let currTrack = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const musicList = [
    {
        img: 'images/music01.jpg',
        name: 'A Certain Romance',
        artist: 'Arctic Monkeys',
        music: 'songs/music 01.mp3'
    },
    {
        img: 'images/music02.png',
        name: 'Time',
        artist: 'Pink Floyd',
        music: 'songs/music 02.mp3'
    },
    {
        img: 'images/music03.jpg',
        name: 'This Side of Paradise',
        artist: 'Coyote Theory',
        music: 'songs/music 03.mp3'
    }
]

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset ();

    currTrack.src = musicList[track_index].music;
    currTrack.load();

    $trackArt.style.backgroundImage = "url("+ musicList[track_index].img +")";
    $trackName.textContent = musicList[track_index].name;
    $trackArtist.textContent = musicList[track_index].artist;
    $nowPlaying.textContent = "Tocando Musica " + (track_index +1) + " de " + musicList.length;

    updateTimer = setInterval(setUpdate, 1000);

    currTrack.addEventListener('ended', $nextBtn);
    random_bg_color();
}

function random_bg_color() {
    let hex = ['01','02','03','04','05','06','07','08','09','a','b','c','d','e'];
    let a;

    function populate(a){
        for (let i=0; i<6; i++){
            let x = Math.round(Math.random() + 14);
            let y = hex[x];
            a +=y;
        }
        return a;
    }
    let color1 = populate('#');
    let color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear gradient (' + angle+',' + color1+ ', ' + color2 + ")";
    document.body.style.background = gradient;
}

function reset(){
    $currTime.textContent = "00:00";
    $totalDuration.textContent = "00:00";
    $seekSlider.value = 0;
}

function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    $randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    $randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
   let current_index = track_index;
   loadTrack(current_index);
   playTrack();
}
function playPauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    currTrack.play();
    isPlaying = true;
    $trackArt.classList.add('rotate');
    $wave.classList.add('loader');
    $playPause.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>'
}

function pauseTrack(){
    currTrack.pause();
    isPlaying = false;
    $trackArt.classList.remove('rotate');
    $wave.classList.remove('loader');
    $playPause.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if (track_index < musicList.length -1 && isRandom === false) {
        track_index += 1;
    }
    else if (track_index < musicList.length -1 && isRandom === true) {
        let random_index = Number.parseInt(Math.random() * musicList.length);
        track_index = random_index;
    }
    else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if (track_index > 0) {
        track_index -=1;
    }
    else {
        track_index = musicList.length -1;
    }
    loadTrack(track_index)
    playTrack();
}
function seekTo(){
    let seekTo = currTrack.duration * ($seekSlider.value / 100);
    currTrack.currentTime = seekTo;
}
function setVolume() {
    currTrack.volume = $volumeSlider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if (!isNaN(currTrack.duration)){
        seekPosition = currTrack.currentTime * (100 / currTrack.duration);
        $seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currTrack.currentTime / 60);
        let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currTrack.duration / 60);
        let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

        if (currentSeconds < 10) {currentSeconds = "0" + currentSeconds;}
        if (durationSeconds < 10) {durationSeconds = "0" + durationSeconds;}
        if (currentMinutes < 10) {currentMinutes = "0" + currentMinutes;}
        if (durationMinutes < 10) {durationMinutes = "0" + durationMinutes;}

        $currTime.textContent = currentMinutes + ":" + currentSeconds;
        $totalDuration.textContent = durationMinutes + ':' + durationSeconds;
    }
}
import music from '../data/music.json' with {type: 'json'};

const audio = document.querySelector('audio');
const playButton = document.querySelector('.play');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const repeatButton = document.querySelector('.repeat');
const artistName = document.querySelector('.artist-name');
const songName = document.querySelector('.song-name');
const playerImage = document.querySelector('.audio-player');
const mainImage = document.querySelector('.main-background-image');
const progressBarWrapper = document.querySelector('.progress-bar-wrapper');
const progressBar = document.querySelector('.progress-bar');
const playerList = document.querySelector('.audio-player-list ul');
const activeSongClass = 'activeSong';
const songs = music;

let songIndex = 0;
let isPlaying = false;
let isRepeating = false;
let playerListItems = [];
let isDragging = false;

function loadSong(song) {
    const previousSong = findSongListItemByClassName(playerListItems, activeSongClass);
    const nextSong = findSongListItemById(playerListItems, song.id)

    audio.src = song.src;
    artistName.textContent = song.artist;
    songName.textContent = song.title;
    playerImage.setAttribute("style", `background-image:url(${song.img});`);
    mainImage.setAttribute("style", `background-image:url(${song.img});`);
    previousSong?.classList.remove(activeSongClass);
    nextSong.classList.add(activeSongClass);
    nextSong.scrollIntoView();
}

function findSongListItemById(playerListItems, id) {
    return Array.from(playerListItems).find(item => item.id == id);
}

function findSongListItemByClassName(playerListItems, className) {
    return Array.from(playerListItems).find(item => item.classList.contains(className));
}

function loadSongList(songs) {
    let songlist = "";
    songs.forEach(element => {
        songlist += `<li id="${element.id}">${element.artist} - ${element.title}</li>`
    });
    playerList.innerHTML = songlist;
    playerListItems = document.querySelectorAll('.audio-player-list ul li');
    loadSong(songs[songIndex]);
}

function playSong() {
    audio.play();
    isPlaying = true;
    playButton.innerHTML = '<img src="./assets/icon/pause.svg" alt="pause">';
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playButton.innerHTML = '<img src="./assets/icon/play.svg" alt="play">';
}

function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function prevButtonClick() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextButtonClick() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function toggleRepeat() {
    isRepeating = !isRepeating;
    audio.loop = isRepeating;
    repeatButton.classList.toggle('active');
}

function updateProgressBar() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    const currentTime = isNaN(audio.currentTime) || audio.currentTime == null 
    ? `0:00` 
    : `${Math.floor(audio.currentTime / 60)}:${String(Math.floor(audio.currentTime % 60)).padStart(2, '0')}`;
    const duration = isNaN(audio.duration) || audio.duration == null 
    ? `0:00` 
    : `${Math.floor(audio.duration / 60)}:${String(Math.floor(audio.duration % 60)).padStart(2, '0')}`;

    progressBar.style.width = `${progressPercent}%`;
    progressBar.innerHTML = `<pre> ${currentTime} / ${duration}</pre>`
}

function setProgress(e) {
    const width = progressBarWrapper.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function setDragging(value) {
    isDragging = value;
}

function onMouseMove(e) {
    if (isDragging) {
        const rect = progressBarWrapper.getBoundingClientRect();
        const clickX = e.clientX - rect.left;

        if (clickX >= 0 && clickX <= rect.width) {
            setProgress({ offsetX: clickX });
        }
    }
}

function autoPlay() {
    if (!isRepeating) {
        nextButton.click();
    }
}

export function player() {
    loadSongList(songs);
    playButton.addEventListener('click', () => togglePlayPause());
    prevButton.addEventListener('click', () => prevButtonClick());
    nextButton.addEventListener('click', () => nextButtonClick());
    progressBarWrapper.addEventListener('click', (e) => setProgress(e));
    repeatButton.addEventListener('click', () => toggleRepeat());
    audio.addEventListener('ended', () => autoPlay());
    audio.addEventListener('timeupdate', () => updateProgressBar());
    progressBarWrapper.addEventListener('mousedown', () => setDragging(true));
    document.addEventListener('mouseup', () => setDragging(false));
    document.addEventListener('mousemove', (e) => onMouseMove(e));
}
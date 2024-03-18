let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;


let trilha_atual = document.createElement('audio');

let track_list = [
  {
    name: "After Hours",
    artist: "the weeknd",
    image: "./img/hq720.jpg",
    path: "./music/360ytmp3.com_320kbps-the-weeknd-after-hours-slowed-reverb.mp3"
  },
  {
  name: "Something in the way",
    artist: "Nirvana",
    image: "./img/hqdefault.jpg",
    path: "./music/360ytmp3.com_320kbps-nirvana-something-in-the-way-audio.mp3"},
  {
    name: "human",
    artist: "Rag'n'Bone Man",
    image: "./img/human.jpg",
    path: "./music/360ytmp3.com_320kbps-ragnbone-man-human-official-video.mp3",
  },
  {
    name:"Paradise",
    artist:"Coldplay",
    image:"./img/coldplay.jpg",
    path:"./music/360ytmp3.com_320kbps-coldplay-paradise-official-video.mp3"
  }
];

function random_bg_color() {

  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  trilha_atual.src = track_list[track_index].path;
  trilha_atual.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "Tocando " + (track_index + 1) + " de " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  trilha_atual.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  trilha_atual.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  trilha_atual.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}



function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = trilha_atual.duration * (seek_slider.value / 100);
  trilha_atual.currentTime = seekto;
}

function setVolume() {
  trilha_atual.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(trilha_atual.duration)) {
    seekPosition = trilha_atual.currentTime * (100 / trilha_atual.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(trilha_atual.currentTime / 60);
    let currentSeconds = Math.floor(trilha_atual.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(trilha_atual.duration / 60);
    let durationSeconds = Math.floor(trilha_atual.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}



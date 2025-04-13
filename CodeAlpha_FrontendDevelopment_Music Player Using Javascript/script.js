const songs = [
    { title: "Song 1", artist: "Artist 1", src: "song1.mp3" },
    { title: "Song 2", artist: "Artist 2", src: "song2.mp3" },
    { title: "Song 3", artist: "Artist 3", src: "song3.mp3" }
];

let currentSongIndex = 0;
const audioPlayer = document.getElementById('audio-player');
const playButton = document.getElementById('play-btn');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const volumeControl = document.getElementById('volume');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const audioSource = document.getElementById('audio-source');
const progressBar = document.getElementById('progress-bar');


function updatePlayer() {
    const song = songs[currentSongIndex];
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    audioSource.src = song.src;
    audioPlayer.load();  
    audioPlayer.play();
    playButton.textContent = 'Pause';
    updateProgressBar();
}


function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playButton.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playButton.textContent = 'Play';
    }
}


function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updatePlayer();
}


function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updatePlayer();
}


function adjustVolume() {
    audioPlayer.volume = volumeControl.value / 100;
}


function updateProgressBar() {
    setInterval(() => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;
    }, 500);
}


progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = newTime;
});


playButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', playNextSong);
prevButton.addEventListener('click', playPrevSong);
volumeControl.addEventListener('input', adjustVolume);


updatePlayer();

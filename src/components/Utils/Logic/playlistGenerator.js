import React from 'react'

const playlistGenerator = () => {
  const playlist = [];

  // Loop through the songs
  for (const song of songs) {
    // Get the song's emotion score
    const emotionScore = song.emotionScore;

    // If the song's emotion score matches the desired emotion, add it to the playlist
    if (emotionScore === emotion) {
      playlist.push(song);
    }
  }

  // Return the playlist
  return playlist;
}

const songs = [
  {
    title: "Happier",
    artist: "Marshmello",
    emotionScore: 10,
  },
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    emotionScore: 8,
  },
  {
    title: "All I Want for Christmas Is You",
    artist: "Mariah Carey",
    emotionScore: 7,
  },
  {
    title: "Yesterday",
    artist: 'The Beatles',
    emotionScore: 5,
  },
  {
    title: "Hallelujah",
    artist: 'Leonard Cohen',
    emotionScore: 3,
  },
];

const playlist = generatePlaylist(10, songs);

console.log(playlist)

export default playlistGenerator
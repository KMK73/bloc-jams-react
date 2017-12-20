import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props){
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
       album: album,
       currentSong: album.songs[0],
       isPlaying: false
    };

    // initiate an audio element
    /* Notice that we're not assigning audioElement to the component's state.
    This is because changes to state (and props) trigger a re-render of the DOM,
    but our  <audio> element doesn't need to be attached to the DOM.
    We will need to access the audio element from within class methods, however, so we assign it to this.
    */
    this.audioElement = document.createElement('audio');

    // set the first song to the first song in the album array
    this.audioElement.src = album.songs[0].audioSrc;
  }

  play() {
      this.audioElement.play();
      this.setState({ isPlaying: true });
  }

  pause() {
       this.audioElement.pause();
       this.setState({ isPlaying: false });
  }

  setSong(song){
    this.audioElement.src = song.audioSrc;
    this.setState({
      currentSong: song
    });
  }

  handleSongClick(song) {
     const isSameSong = this.state.currentSong === song;

     if(this.state.isPlaying && isSameSong){
       this.pause();
     } else {
       if (!isSameSong) { this.setSong(song); }
       this.play();
     }
  }

  handlePrevClick() {
    // find the index of the current song
    const currentIndex = this.state.album.songs.findIndex(
      (song) =>
        this.state.currentSong === song
    );
    // return if the current song is the first song Math.max to ensure no negative numbers
    const newIndex = Math.max(0, currentIndex-1);

    // call setSong with new indexed song
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    // play song
    this.play();
  }

  handleNextClick() {
    // find the next song from current
    const currentIndex = this.state.album.songs.findIndex(
      song => this.state.currentSong === song
    );

    // get new index for next song
    const nextIndex = Math.max(this.state.album.songs.length, currentIndex + 1);

    // set song to make state currentSong
    this.setSong(this.state.album.songs[nextIndex]);

    //play song
    this.play(); 
  }


  render() {
    return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" alt="cover" src={this.state.album.albumCover} />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
           <colgroup>
             <col id="song-number-column" />
             <col id="song-title-column" />
             <col id="song-duration-column" />
           </colgroup>
           <tbody>
             {
               this.state.album.songs.map(
                 (song, index) =>
                 <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                     <td className="song-actions">
                       <button>
                         <span className="song-number">{index + 1}</span>
                         <span className="ion-play"></span>
                         <span className="ion-pause"></span>
                       </button>
                     </td>
                      <td>{song.title}</td>
                      <td>{song.duration}</td>
                  </tr>
              )}
           </tbody>
         </table>
         <PlayerBar isPlaying={this.state.isPlaying}
           currentSong={this.state.currentSong}
           handleSongClick={ () => this.handleSongClick(this.state.currentSong)}
           handlePrevClick= { () => this.handlePrevClick()}
           />
      </section>
    );
  }
}

export default Album;

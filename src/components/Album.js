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
       currentTime: 0,
       duration: album.songs[0].duration,
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
    // set start volume to 50
    this.audioElement.volume = 0.5;
  }

  componentDidMount() {
    this.eventListeners = {
        timeupdate: e => {
          this.setState({ currentTime: this.audioElement.currentTime });
        },
        durationchange: e => {
          this.setState({ duration: this.audioElement.duration });
        }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
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
      (song) => this.state.currentSong === song
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
    // const nextIndex = Math.max(this.state.album.songs.length, currentIndex + 1);
    const nextSongIndex = currentIndex + 1;
    if (nextSongIndex >= this.state.album.songs.length) { return; }

    // set song to make state currentSong
    this.setSong(this.state.album.songs[nextSongIndex]);

    //play song
    this.play();
  }

  handleTimeChange(e) {
    //calculate new time in the song
    const newTime = this.audioElement.duration * e.target.value;

    // set the current time property to new time
    this.audioElement.currentTime = newTime;

    //update the state currentTime
    this.setState({
      currentTime: newTime
    });
  }

  handleVolumeChange(e){
    // calculate the new volume from event
    this.audioElement.volume = e.target.value;
  }

  formatTime(secondsTime) {

     let minutes = Math.floor(secondsTime / 60);
     minutes = (minutes >= 10) ? minutes : "0" + minutes;
     let seconds = Math.floor(secondsTime % 60);
     seconds = (seconds >= 10) ? seconds : "0" + seconds;

     if(seconds === "0NaN"){
       return "-:--";
     }
     return minutes + ":" + seconds;
   }

  render() {
    return (
      <section className="album">
        <div className="mdl-grid">
            <section id="album-info" className="mdl-cell-stretch mdl-cell--6-col mdl-cell--12-col-tablet  mdl-cell--12-col-phone">

                  <div className="demo-card-wide mdl-card mdl-shadow--2dp" style={{background: "url(" + this.state.album.albumCover + ") center / cover"}}>
                    <div className="mdl-card__supporting-text">
                        <h2 className="mdl-card__title-text">{this.state.album.title}</h2>
                        <h4>{this.state.album.artist}</h4>
                        <span>{this.state.album.releaseInfo}</span>
                    </div>
                  </div>
            </section>
            <section id="songs" className=" mdl-cell-stretch mdl-cell--6-col mdl-cell--12-col-tablet  mdl-cell--12-col-phone">
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
                             <span className="song-number">{index + 1}</span>
                         </td>
                         <td>
                           {this.state.currentSong === song && this.state.isPlaying ? (
                             <i className="material-icons">pause_circle_filled</i>
                           ) : (
                             <i className="material-icons">play_circle_filled</i>
                           )}
                         </td>
                          <td>{song.title}</td>
                          <td>{this.formatTime(song.duration)}</td>
                      </tr>
                  )}
               </tbody>
             </table>
         </section>
       </div>
       <PlayerBar isPlaying={this.state.isPlaying}
         currentSong={this.state.currentSong}
         handleSongClick={ () => this.handleSongClick(this.state.currentSong)}
         handlePrevClick= { () => this.handlePrevClick()}
         handleNextClick={ () => this.handleNextClick()}
         currentTime={this.formatTime(this.audioElement.currentTime)}
         duration={this.formatTime(this.audioElement.duration)}
         currentVolume={this.audioElement.volume}
         handleTimeChange= { (e) => this.handleTimeChange(e) }
         handleVolumeChange= { (e) => this.handleVolumeChange(e) }
         />
    </section>
    );
  }
}

export default Album;

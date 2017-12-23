import React, { Component} from 'react';

class PlayerBar extends Component {
  render(){
    return(
      <section className="player-bar fixed">
        <div className="mdl-grid">
          <div className="mdl-layout-spacer"></div>

          <section id="time-control" className="mdl-cell--3-col mdl-cell--3-col-tablet  mdl-cell--3-col-phone">
            <input className="mdl-slider mdl-js-slider" type="range"
                value={(this.props.currentTime / this.props.duration) || 0} min="0" max="1" step="0.01"
                onChange={this.props.handleTimeChange} />
              <div className="current-time">{this.props.currentTime}</div>
              {/*<input type="range" className="seek-bar"  value={(this.props.currentTime / this.props.duration) || 0}
              min="0" max="1" step="0.01"  onChange={this.props.handleTimeChange}/> */}
              <div className="total-time">{this.props.duration}</div>
          </section>

          <section id="buttons"  className="mdl-cell--6-col mdl-cell--6-col-tablet  mdl-cell--6-col-phone">
            <i className="material-icons" onClick={this.props.handlePrevClick}>skip_previous</i>

            <i className="material-icons" onClick={this.props.handleSongClick}>{this.props.isPlaying ? 'pause_circle_filled' : 'play_circle_filled'}</i>

             <i className="material-icons" onClick={this.props.handleNextClick}>skip_next</i>

          </section>

          <section id="volume-control"  className="mdl-cell--3-col mdl-cell--3-col-tablet  mdl-cell--3-col-phone">
              <input className="mdl-slider mdl-js-slider" type="range"
                  value={this.props.currentVolume} onChange={this.props.handleVolumeChange}
                  min="0" max="1" step="0.01" />
          </section>
        </div>
      </section>

    );
  }
}

export default PlayerBar;

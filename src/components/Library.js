import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';

class Library extends Component {
    constructor(props){
      super(props);
      // set the state object
      this.state = {
        albums: albumData
      };
    }

    render() {
      return (
        <section className='library'>
          {
            this.state.albums.map(
              (album, index) =>

              //template literal to build a
              // unique link path for each album based on a base URL,
              // /album/ and the album's slug property.

                <Link to={`/album/${album.slug}`} key={index}>
                  <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title">
                      <h2 className="mdl-card__title-text">Welcome</h2>
                    </div>

                    <div className="mdl-card__supporting-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Mauris sagittis pellentesque lacus eleifend lacinia...
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                      <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                        Get Started
                      </a>
                    </div>
                    <div className="mdl-card__menu">
                      <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                        <i className="material-icons">share</i>
                      </button>
                    </div>
                  </div>

                  <img src={album.albumCover} alt={album.title} />
                  <div>{album.title}</div>
                  <div>{album.artist}</div>
                  <div>{album.songs.length} songs</div>
                </Link>

            )
          }
        </section>
      );
    }
}

export default Library;

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
          <section>
            <h3>Music Collection</h3>
          </section>
          <div className="mdl-grid">
          {
            this.state.albums.map(
              (album, index) =>

              //template literal to build a
              // unique link path for each album based on a base URL,
              // /album/ and the album's slug property.
              <div className="mdl-cell  mdl-cell--6-col mdl-cell--12-col-tablet  mdl-cell--12-col-phone"  key={index}>
                <Link to={`/album/${album.slug}`}>
                  <div className="card-wide mdl-card mdl-shadow--2dp" style={{background: "url(" + album.albumCover + ") center / cover"}}>
                    <div className="mdl-card__title">
                      <h2 className="mdl-card__title-text">{album.title}</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                      <div className="float-left">
                        <h4>{album.artist}</h4>
                      </div>
                      <div className="float-right">
                        <h5>Songs: {album.songs.length}</h5>
                      </div>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                      <div className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                        Go To Album
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          }
          </div>
        </section>
      );
    }
}

export default Library;

import React from 'react';

const Landing = () => (
    <section className="library">
      <h1 className="hero-title">Turn the music up!</h1>

      <section className="selling-points mdl-grid">

        <div class="demo-card-square mdl-card mdl-shadow--2dp">
          <div id="card1" class="mdl-card__title mdl-card--expand">
            <h2 class="mdl-card__title-text">Choose your music</h2>
          </div>
          <div class="mdl-card__supporting-text">
            The world is full of music; why should you have to listen to music that someone else chose?
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/library">
              View Music
            </a>
          </div>
        </div>

        <div class="demo-card-square mdl-card mdl-shadow--2dp">
          <div id="card2" class="mdl-card__title mdl-card--expand">
            <h2 class="mdl-card__title-text">Unlimited, streaming, ad-free</h2>
          </div>
          <div class="mdl-card__supporting-text">
          No arbitrary limits. No distractions.
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/library">
              View Music
            </a>
          </div>
        </div>

        <div class="demo-card-square mdl-card mdl-shadow--2dp">
          <div id="card3" class="mdl-card__title mdl-card--expand">
            <h2 class="mdl-card__title-text">Mobile enabled</h2>
          </div>
          <div class="mdl-card__supporting-text">
            Listen to your music on the go. This streaming service is available on all mobile platforms.
          </div>
          <div class="mdl-card__actions mdl-card--border">
            <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="/library">
                View Music
            </a>
          </div>
        </div>

      </section>

    </section>
);

export default Landing;

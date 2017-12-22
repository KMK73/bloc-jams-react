import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import './scss/App.scss'; // or `.scss` if you chose scss

class App extends Component {
  render() {
    return (
      <div className="App">

        <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <header class="mdl-layout__header">
            <div class="mdl-layout__header-row">
              <span class="mdl-layout-title">Bloc Jams</span>

              <div class="mdl-layout-spacer"></div>

              <nav class="mdl-navigation mdl-layout--large-screen-only">
                <Link to='/' className="mdl-navigation__link">Landing</Link>
                <Link to='/library' className="mdl-navigation__link">Library</Link>
              </nav>
            </div>
          </header>
          <div class="mdl-layout__drawer">
            <span class="mdl-layout-title">Bloc Jams</span>
            <nav class="mdl-navigation">
              <Link to='/' className="mdl-navigation__link">Landing</Link>
              <Link to='/library' className="mdl-navigation__link">Library</Link>
            </nav>
          </div>
          <main class="mdl-layout__content">
            <div class="page-content">
              <Route exact path="/" component={Landing} />
              <Route path="/library" component={Library} />
              <Route path="/album/:slug" component={Album}/>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";

import ArtistsList from "./containers/ArtistsList/ArtistsList";
import SingleArtist from "./containers/SingleArtist/SingleArtist";
import SingleAlbum from "./containers/SingleAlbum/SingleAlbum";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import TrackHistory from "./containers/TrackHistory/TrackHistory";


class App extends Component {
  render() {
    return (
      <>
          <header>
            <Toolbar/>
          </header>
        <Container style={{marginTop: '20px'}}>
          <Switch>
            <Route path="/" exact component={ArtistsList} />
            <Route path="/register" exact component={Register}/>
            <Route path="/track_history" exact component={TrackHistory} />
            <Route path="/login" exact component={Login}/>
            <Route path="/albums/:id/:le" exact component={SingleAlbum} />
            <Route path="/artists/:id" exact component={SingleArtist} />
          </Switch>
        </Container>
        </>
    );
  }
}

export default App;

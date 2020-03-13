import React, {Component} from 'react';
import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";
import ArtistsList from "./containers/ArtistsList/ArtistsList";
import SingleArtist from "./containers/SingleArtist/SingleArtist";
import SingleAlbum from "./containers/SingleAlbum/SingleAlbum";


class App extends Component {
  render() {
    return (
        <Container style={{marginTop: '20px'}}>
          <Switch>
            <Route path="/" exact component={ArtistsList} />
            <Route path="/albums/:id/:le" exact component={SingleAlbum} />
            <Route path="/artists/:id" exact component={SingleArtist} />
          </Switch>
        </Container>
    );
  }
}

export default App;
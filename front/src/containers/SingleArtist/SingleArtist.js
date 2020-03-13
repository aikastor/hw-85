import React, {Component} from 'react';
import {getArtistAlbums, getArtistName} from "../../store/actions/albumActions";
import {connect} from "react-redux";
import {Button, Card, CardBody, CardGroup, CardImg, CardText, CardTitle, Row} from "reactstrap";
import imageNotAvailable from "../../assets/images/image_not_available.jpg";
import {apiURL} from "../../constants";
import {Link} from "react-router-dom";

class SingleArtist extends Component {
  async componentDidMount() {
    await this.props.fetchAlbums(this.props.match.params.id);
    await this.props.fetchArtistName(this.props.match.params.id)
  }

  render() {
    return (
        <>
          <h2>{this.props.artist}</h2>
        <Row>
          <CardGroup>
        {this.props.albums.map(item => {
            let image = imageNotAvailable;

            if (item.image) {
              image = apiURL + '/uploads/' + item.image;
            }
            return (

                <Card key={item._id}>
                  <CardImg top src={image} width="80%" alt="Card image cap" />
                  <CardBody>
                    <CardTitle><h4>{item.title}</h4></CardTitle>
                    <CardText>
                      <b>Year: </b> {item.year}
                      <br/>
                      <b>Tracks in album: </b> {item.tracksQnt}
                    </CardText>
                    <Button
                      color="primary"
                      tag={Link}
                      to={'/albums/' + item._id}
                    >
                      See track list >>
                    </Button>
                  </CardBody>
                </Card>

            )
          }
        )}
          </CardGroup>
      </Row>
      </>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albums.albums,
  artist: state.albums.artist
});

const mapDispatchToProps = dispatch => ({
  fetchArtistName: (artistID) => dispatch(getArtistName(artistID)),
  fetchAlbums: (artistID) => dispatch(getArtistAlbums(artistID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleArtist);
import React, {Component} from 'react';
import {fetchArtists} from "../../store/actions/artistActions";
import {connect} from "react-redux";
import {Button, Card, CardBody, CardImg, CardText, CardTitle, Col, Row} from "reactstrap";
import imageNotAvailable from '../../assets/images/image_not_available.jpg';
import {apiURL} from "../../constants";
import {Link} from "react-router-dom";

class ArtistsList extends Component {

  componentDidMount() {
    this.props.fetchArtists();
  }

  render() {
    return (
      <><Row>
        {this.props.artists.map(item => {
          let image = imageNotAvailable;

          if (item.image) {
            image = apiURL + '/uploads/' + item.image;
          }
          return (
            <Col key={item._id} xs={4}>
            <Card >
                <CardImg top src={image} alt="Card image cap" />
                <CardBody>
                  <CardTitle>{item.name}</CardTitle>
                  <CardText>{item.info ? item.info : null}</CardText>
                  <Button
                    color="primary"
                    tag={Link}
                    to={'/artists/' + item._id}
                  >
                    See albums
                  </Button>
                </CardBody>
              </Card>
          </Col>
            )
          }
        )}
      </Row>
      </>
    );
  }
}
const mapStateToProps = state => ({
  artists: state.artists.artists
});

const mapDispatchToProps = dispatch => ({
  fetchArtists: () => dispatch(fetchArtists())
});
export default connect(mapStateToProps, mapDispatchToProps)(ArtistsList);
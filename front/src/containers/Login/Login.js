import React, {Component} from 'react';
import {Alert, Button, Col, Form, FormGroup} from "reactstrap";
import {loginUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FormElement from "../UI/Form/FormElement";

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  inputChangeHandler = event => {
    console.log('in input changer');

    this.setState({
      [event.target.name] : event.target.value
    })
  };

  submitFormHandler = event => {
    event.preventDefault();
    this.props.loginUser({...this.state})
  };

  render() {
    return (
      <>
       <h2>Login</h2>
        {this.props.error && (<Alert color="danger">{this.props.error.error}</Alert>)}
        <Form onSubmit={this.submitFormHandler}>
          <FormElement
            propertyName="username"
            title="username"
            value={this.state.username} onChange={this.inputChangeHandler}
            type="text"
            autoComplete="current-username"
            placeholder="enter username you registered with"
          />
          <FormElement
            propertyName="password"
            title="password"
            value={this.state.password} onChange={this.inputChangeHandler}
            type="password"
            autoComplete="current-password"
            placeholder="enter password"
          />
          <FormGroup row>
            <Col sm={{offset: 2, size: 10}}>
              <Button type="submit" color="primary">
                Log in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.users.loginLoading,
  error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
  loginUser: (userData) =>dispatch(loginUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
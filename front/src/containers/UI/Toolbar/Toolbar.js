import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap';
import {useSelector} from "react-redux";

const Toolbar = () => {
  const user = useSelector(state => state.users.user);

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={RouterNavLink} to="/">Artists</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/register" exact>Sign Up</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouterNavLink} to="/login" exact>Login</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Toolbar;
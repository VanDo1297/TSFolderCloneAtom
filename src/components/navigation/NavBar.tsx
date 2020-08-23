import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {RouteComponentProps, withRouter} from "react-router";
import withSystemState, {InjectedSystemStateProps} from "../hocs/WithSystemState";

type NavBarProps = RouteComponentProps & InjectedSystemStateProps;

class NavBar extends Component<NavBarProps,any> {
    logOut = () =>{
        this.props.removeToken();
        this.props.history.push("/");
    };

    goTo = (destination:string) =>{
        this.props.history.push(destination);
    };

    render() {
        return(
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Bohe</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={()=>this.goTo("/home")}>Home</Nav.Link>
                    <Nav.Link onClick={()=>this.goTo("/cards")}>Cards</Nav.Link>
                    <Nav.Link onClick={()=>this.goTo("/charges")}>Charges</Nav.Link>
                    <Nav.Link onClick={()=>this.goTo("/subscriptions")}>Subscriptions</Nav.Link>
                    <Nav.Link onClick={()=>this.goTo("/invoices")}>Invoices</Nav.Link>
                    <Nav.Link onClick={this.logOut}>Log Out</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default withSystemState(withRouter(NavBar));
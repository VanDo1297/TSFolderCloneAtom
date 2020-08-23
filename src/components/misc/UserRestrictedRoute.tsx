import React from 'react'
import { RouteProps, Redirect, Route } from 'react-router-dom'
import withSystemState, { InjectedSystemStateProps } from "../hocs/WithSystemState";

type UserRestrictedRouteProps = RouteProps & InjectedSystemStateProps;

class UserRestrictedRoute extends React.Component<UserRestrictedRouteProps, any> {

    render() {
        let tokenSet = this.props.systemState.token.length > 0;
        let CompType = this.props.component as React.ComponentClass;

        return (
            <Route render={(props) => {
                if (this.props.path !== props.location.pathname) {
                    return null;
                }
                if (tokenSet) {
                    return (<CompType {...props} />);
                } else {
                    return (<Redirect to="/" />);
                }
            }} />
        );
    }
}

export default withSystemState(UserRestrictedRoute);
import React from 'react';
import renderer from 'react-test-renderer';
import NavBar from "../../../components/navigation/NavBar";
import {createStore} from "redux";
import {rootReducer} from "../../../store";
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";

test('Renders Correctly', () => {
    const store = createStore(rootReducer);
    const component = renderer.create(
        <Provider store={store}>
            <Router>
                <NavBar/>
            </Router>
        </Provider>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
import React from 'react';
import renderer from 'react-test-renderer';
import AvailableProduct from "../../../components/misc/AvailableProduct";

test('Renders Correctly', () => {
    const component = renderer.create(
        <AvailableProduct title={"Test"} id={"SomeID"} price={123} purchaseText={"Purchase"} onPurchase={()=>false}/>,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    console.log(tree);
});
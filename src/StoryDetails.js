import React, { Component } from 'react';
import { Text } from "react-native";
import JSONPretty from 'react-json-pretty';

export default class StoryDetails extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <JSONPretty id="json-pretty" data={this.props.route.params.storyDetails}></JSONPretty>
        )

    }
}

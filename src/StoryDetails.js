import React, { Component } from 'react';
import { Text } from "react-native";

export default class StoryDetails extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        return (
            <Text style={{padding: 20}}>{JSON.stringify(this.props.route.params.storyDetails)}</Text>
        )

    }
}

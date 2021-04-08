import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class MyWebView extends Component {

    constructor(props) {
        super(props)
    }


    render() {
        return <WebView source={{ uri: this.props.route.params.url }} />;
    }


}
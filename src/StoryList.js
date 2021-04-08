import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from "react-native";
import { API_URL } from './Const';
import moment from 'moment';

var apiCalling = false;     //Flag variable to check if the api call is running or not.

export default class StoryList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            pageIndex: 0,   // pageIndex to pass as parameter while calling the story list api.
            storyList: []
        }
    }

    /*
    componentDidMount loads before the view load.    
    */
    componentDidMount() {
        this.callStoryListAPICall();    //API to get the story list
    }

    callStoryListAPICall = () => {
        apiCalling = true;

        fetch(API_URL + this.state.pageIndex)
            .then((response) => response.json())
            .then((storyList) => {

                console.log('storylist :>>>', JSON.stringify(storyList))

                if (storyList.hits != undefined && storyList.hits.length > 0) {
                    apiCalling = false;
                    this.setState({
                        pageIndex: this.state.pageIndex + 1,
                        storyList: [...this.state.storyList, ...storyList.hits]
                    })
                }
                setTimeout(() => {
                    if (!apiCalling) {
                        this.callStoryListAPICall()
                    }
                }, 10000);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View>
                <FlatList
                    extraData={this.state}
                    data={this.state.storyList}
                    keyExtractor={(item, index) => index}
                    renderItem={this.storyItem}
                    onEndReachedThreshold={0.9}
                    onEndReached={() => {
                        this.callStoryListAPICall()
                    }}
                />
            </View>
        )
    }

    storyItem = (storyItem, index) => {

        /*
            moment used to parse the date to the string format in well manner.
        */
        let date = moment(storyItem.item.created_at).format('DD MMM yyyy hh:mm:ss a');

        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('StoryDetails', { storyDetails: storyItem.item })}
                style={styles.storyItem}>
                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{storyItem.item.title}</Text>

                {storyItem.item.url == null ? null :
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('MyWebView', { url: storyItem.item.url })}>
                        <Text style={{ color: 'blue', marginTop: 10 }}>{storyItem.item.url}</Text>
                    </TouchableOpacity>}


                <Text style={{ marginTop: 10 }}>Author: {storyItem.item.author}</Text>
                <Text style={{ marginTop: 10 }}>{date}</Text>
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({

    storyItem: {
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 5,
        borderColor: 'white',
        padding: 10,
        margin: 10
    }
})
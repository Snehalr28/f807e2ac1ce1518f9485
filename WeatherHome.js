/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { TextInput } from 'react-native-gesture-handler';

class WeatherHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            CountryName: ""
        }

    }
    submitCountry = async () => {
        // console.warn(this.state.CountryName);
        try {
            let response = await fetch("https://restcountries.eu/rest/v2/name/" + this.state.CountryName);
            let json = await response.json();
            console.log(json);
            this.props.navigation.navigate(
                "WeatherDetails", {
                    Data: json[0],
                    Capital: json[0].capital
                }
            );
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <View>
                <TextInput
                    style={styles.textInputStyle


                    }
                    placeholder="Enter Country"
                    onChangeText={CountryName => {
                        this.setState({ CountryName })
                    }}
                >

                </TextInput>
                <View style={{ marginTop: 20, backgroundColor: "black" }}>
                    <Button
                        title="Submit"
                        disabled={!this.state.CountryName}
                        onPress={this.submitCountry}
                    >

                    </Button>
                </View>
            </View>
        );
    }

};

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: Colors.lighter,
    },
    textInputStyle: {
        alignSelf: "center",
        width: 250,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "gray",
        fontSize: 18,
        height: 50,
        margin: 20,
        padding: 10,
        marginTop: 40
    },
    engine: {
        position: 'absolute',
        right: 0,
    },
    body: {
        backgroundColor: Colors.white,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});

export default WeatherHome;

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
  Button,
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Svg, {SvgUri} from "react-native-svg";
class WeatherDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            DataFromHome:{},
            Capital:"",
            WeatherData:{},
            boolButton:false,
            iconName:null
        }
    this.state.DataFromHome = this.props.navigation.state.params.Data;
    this.state.Capital = this.props.navigation.state.params.Capital;

    }

    getWeatherInfo= async ()=>{
        console.warn(this.state.Capital);
       try{
       let response = await fetch("http://api.weatherstack.com/current?access_key=07067dbb203a0081e6cb543bb5599d87&query="+this.state.Capital);
       let json = await response.json();
       let icon = json.current.weather_icons;
       console.warn(icon[0]);
       this.setState({WeatherData:json});
       this.setState({boolButton:true});
       this.setState({iconName:icon[0]});
       
       }catch(error){
        console.log(error);
       }
    }

  reapeatLabel = (title,dataPass) =>{
return(
    <View style={{flexDirection:"row",alignSelf:"center"}}>
   <Text style={{fontSize:18, margin:10}}>
     {title}
       </Text>
       <Text style={{fontSize:18, margin:10}}>
       {dataPass}
       </Text>
       </View>
)
  }
  
    render(){
        console.warn(this.state.Capital);
        const arrOfLatlong = this.state.DataFromHome.latlng;
    return (
   <View>
<SvgUri
width={150}
height={100}
style={
    {
        alignSelf:"center",
        margin:20,

    }

}
uri={this.state.DataFromHome.flag}

/>
       {this.reapeatLabel("Capital:",this.state.DataFromHome.capital)}
       {this.reapeatLabel("Population:",this.state.DataFromHome.population)}
       {this.reapeatLabel("Latitude",arrOfLatlong[0])}
       {this.reapeatLabel("Longitude:",arrOfLatlong[1])}
       <View style={{marginTop:20,backgroundColor:"black"}}>
        <Button
        title="Capital Weather"
        //disabled={!this.state.CountryName}
        onPress={this.getWeatherInfo}
        >

            </Button>
        </View>
{this.state.boolButton?
        <View>
        {this.reapeatLabel("Temperature:",this.state.WeatherData.current.temperature)}
       {this.reapeatLabel("Wind Speed:",this.state.WeatherData.current.wind_speed)}
       {this.reapeatLabel("Percipitation:",this.state.WeatherData.current.precip)}
       <Image
       source={{uri:this.state.iconName}}
       style={{width:100,aspectRatio:1,backgroundColor:"green",alignSelf:"center",margin:10}}
       />
</View>:<View/>}
     </View>

      );
  }
  
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
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

export default WeatherDetails;

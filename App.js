import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [temperature, settemperature] = useState(null);
  const [weather, setweather] = useState(null);
  const [icon, seticon] = useState(null);
  const [Caption, setCaption] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  

  let text = 'Waiting..';
  let Latitude='';
  let Longitude='';
  if (errorMsg) {
    text = errorMsg;
   
    
  } else if (location) {
    text='Coordinate';
    Longitude = JSON.stringify(location.coords.longitude);
    Latitude = JSON.stringify(location.coords.latitude);
   
  }


  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&APPID=8a1d86bd5dbd6b037530d0c3cf21f09e&units=metric`
  )
    .then(response => response.json())
    .then(data => {
      // console.log(json);
      let temp=data.main.temp;
      settemperature(temp);
      let weather1=data.weather[0].main;
      setweather(weather1); 
      let variable=weather1

      if(variable=='Clouds'){
        var icon=require('./components/cloudy.png');
        var subs='Have a good day!'
        seticon(icon);
        setCaption(subs);
      }
      else if(variable=='Rain'){
        var icon=require('./components/rain.png');
        var subs='Its raining outside. Stay home!'
        seticon(icon);
        setCaption(subs);
      }

      else if(variable=='Clear'){
        var icon=require('./components/sunny.png');
        var subs='Its sunny day!'
        seticon(icon);
        setCaption(subs);
      }

      else if(variable=='Drizzle'){
        var icon=require('./components/drizzle.png');
        var subs='Lets have some coffee'
        seticon(icon);
        setCaption(subs);
      }
      else if(variable=='Haze'){
        var icon=require('./components/haze.png');
        var subs='Be carefull'
        seticon(icon);
        setCaption(subs);
      }


    });

    let variable = function(){
     
     }
    
   return (
    <View  style={[styles.container, { backgroundColor: 'skyblue'}]}>
     
      <Text >Nor Aimie Nadia binti Yusrin (1710006)</Text>
      <Image style={styles.image} source={icon} />
      <Text style={styles.Temp}>{temperature}º</Text>
      <Text style={styles.text2}>{weather}</Text>
      <Text style={styles.text2}> {Caption}</Text>

    
    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    marginTop:40
  
  },

  text2: {
    fontSize:35
  },
  
  image: {
    marginTop:50,
    height:300,
    width:300,
  },

  Temp:{
    fontSize:30
  }
 
});
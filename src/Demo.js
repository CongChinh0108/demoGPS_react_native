import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  PermissionsAndroid,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
const config = {
  skipPermissionRequests: false, // Tự động yêu cầu quyền
  authorizationLevel: 'whenInUse', //  Yêu cầu quyền "whenInUse"
  enableBackgroundLocationUpdates: false, //  Không cho phép cập nhật vị trí trong nền
  forceRequestLocation: true, // Thêm dòng này để yêu cầu GPS chính xác hơn
};
Geolocation.setRNConfiguration(config);
const Demo = () => {
  const Permissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const [currentLocation, setCurrentLocation] = useState(null);
  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({latitude, longitude});
        console.log('Current Location: ', latitude, longitude);
      },
      error => Alert.alert('Error', error.message),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 0},
    );
  };

  const openMaps = () => {
    if (currentLocation) {
      const {latitude, longitude} = currentLocation;
      const url = `https://maps.google.com/?q=${latitude},${longitude}`;
      Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot get current location');
    }
  };

  return (
    <View style={styles.container}>
      <Text>
        Vĩ độ: {currentLocation ? currentLocation.latitude : 'Loading...'}
      </Text>
      <Text>
        Kinh độ: {currentLocation ? currentLocation.longitude : 'Loading...'}
      </Text>
      {currentLocation ? (
        <TouchableOpacity onPress={openMaps} style={styles.button}>
          <Text>Open Maps</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={Permissions} style={styles.button}>
          <Text>Get Location</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {padding: 10, alignItems: 'center', backgroundColor: 'green'},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 20,
  },
});

export default Demo;

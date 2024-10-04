import {StyleSheet, Button, TextInput, View, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import Sound from 'react-native-sound';
const Speech = () => {
  const API_KEY = '0yhRTFxjROChudLBB4SIWUplLG3OsZn4';
  const [audioUrl, setAudioUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const textToConvert =
    'Khám phá một vòng trung tâm Sài Gòn – Thành phố Hồ Chí Minh từ những công trình kiến trúc cổ kính đến những địa chỉ đỏ. Hành trình “Theo dấu chân chiến sĩ” sẽ đưa bạn trải nghiệm trọn vẹn từng phút giây khi được hòa mình cùng dòng chảy lịch sử vẻ vang một thời và tìm hiểu về từng bước chuyển mình của thành phố với những thử thách đầy bất ngờ! Hãy cùng nhau giải mã những câu đố, hoàn thành các nhiệm vụ, và khám phá những điều thú vị về lịch sử, văn hóa của thành phố.';
  const handleTextToSpeech = async () => {
    try {
      const response = await axios.post(
        'https://api.fpt.ai/hmi/tts/v5',
        textToConvert,
        {
          headers: {
            'api-key': API_KEY,
            'Content-Type': 'application/json',
            voice: 'lannhi',
            speed: '0',
            format: 'mp3',
          },
        },
      );

      if (response.data.error === 0) {
        setAudioUrl(response.data.async);
      } else {
        Alert.alert('Lỗi', response.data.message);
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      Alert.alert('Lỗi', 'Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handlePlayAudio = () => {
    if (audioUrl) {
      const sound = new Sound(audioUrl, null, error => {
        if (error) {
          console.error('Lỗi khi tải âm thanh:', error);
          Alert.alert('Lỗi', 'Không thể tải file âm thanh.');
        } else {
          sound.play(success => {
            if (!success) {
              console.error('Lỗi khi phát âm thanh.');
              Alert.alert('Lỗi', 'Không thể phát file âm thanh.');
            }
          });
        }
      });
    } else {
      Alert.alert('Thông báo', 'Vui lòng chuyển đổi văn bản trước.');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        gap: 20,
      }}>
      <Text>{textToConvert}</Text>
      <Button title="Chuyển đổi văn bản" onPress={handleTextToSpeech} />
      <Button title="Phát âm thanh" onPress={handlePlayAudio} />
      {audioUrl && <Text>{audioUrl}</Text>}
    </View>
  );
};

export default Speech;

const styles = StyleSheet.create({});

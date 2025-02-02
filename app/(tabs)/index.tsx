import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import SongCard from '../SongCard';
import Loader from '@/components/Loader';
export default function TabTwoScreen() {
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState([]);
  const [loading, SetLoading] = useState(false)
  const display = async () => {
    SetLoading(true)
    try {
      const res = await fetch(`https://jiosaavnapi-backend.onrender.com/song/?query=${inputText}`, { method: 'GET' });
      // console.log(res)
      const json = await res.json();
      // console.log(json)
      if (Array.isArray(json)) {
        setData(json);
      }
      else {
        setData([json]);
      }
      SetLoading(false)
      // console.log(data)
    } catch (error) { console.error(error); }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>
        Search
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your song name or you can past song link from jio savan"
        value={inputText}
        onChangeText={setInputText}
        returnKeyType="search" // Changes the "Enter" key to "Search"
        onSubmitEditing={display} // Called when the "Search" key is pressed
      />
      {loading ? <Loader /> :
        data.map((item, index) => (<SongCard key={index} title={item.song} image={item.image} artist={item.singers} url={item.media_url} />))}
    </View>


  );
}
const styles = StyleSheet.create({
  Heading: {
    color: "white",
    fontSize: 34,
    marginTop: 30,
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    color: "white",
    height: 40,
    borderRadius: 100,
    backgroundColor: "#333",
  },
  displayText: {
    fontSize: 18,
    color: "white",
  },
});

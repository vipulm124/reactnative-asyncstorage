import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function App(){
  const[input, setInput] = useState('');
  const[input2, setInput2] = useState('');

  const[errorMessage, setErrorMessage] = useState('');

  let STORAGE_KEY = '@user_input';

  const readData = async () => {
    try{
      setInput('');
      setErrorMessage('');
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if(value !== null){
        setInput(value);
      }
    }
    catch(e){
      setErrorMessage('Failed to fetch input from storage');
      // Alert('Failed to fetch input from storage');
    }
  }

  useEffect(() => {
    readData();
  },[])

  const saveData = async (input:string) => {
    try{

      if(input !== null){
        await AsyncStorage.setItem(STORAGE_KEY, input);
        setErrorMessage('Data successfully saved');
      }
    }
    catch(e){
      setErrorMessage('Failed to save the data to the storage');

    }
    
  }

  function onChangeText(value:string){
    setInput(value)
  }

  const onSubmitEditing = () =>{
    if(!input) return;

    saveData(input);
    setInput('');
  }

  const clearStorage = async () => {
    try{
      setErrorMessage('');
      await AsyncStorage.clear();
      setErrorMessage('Storage successfully cleared!')
      setInput('');

    }
    catch(e){
      setErrorMessage('Failed to clear the async storage.')
    }
  }

return(
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>AsyncStorage React Native</Text>
    </View>
    <View style={styles.panel}>
      <Text style={styles.label}>Enter your input here:</Text>
      <TextInput
      style={styles.inputField}
      value={input}
      placeholder="Enter"
      onChangeText={onChangeText}
      />
      <Text style={styles.text}>Your input is: {input}</Text>
      <Pressable style={styles.button} onPress={onSubmitEditing}>
        <Text style={styles.buttonText}>Save Data.</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={clearStorage}>
        <Text style={styles.buttonText}>Clear Storage</Text>
      </Pressable>
      <Text>{errorMessage}</Text>
    </View>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    backgroundColor: '#dcdcdc',
    paddingTop: 48,
    paddingBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
  },
  panel: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 20,
  },
  text: {
    fontSize: 24,
    paddingTop: 10,
  },
  inputField: {
    backgroundColor: '#fff',
    height: 44,
    borderWidth: 1,
    borderColor: '#333',
    width: '100%',
    padding: 10,
    marginTop: 12,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#444',
  },
});

export default App;
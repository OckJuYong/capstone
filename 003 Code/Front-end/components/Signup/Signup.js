// components/Signup.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function Signup({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    console.log('회원가입 시도:', name, email, password);
    navigation.navigate('Home');
  };

  return (
    <View>
      <Text>회원가입</Text>
      
      <TextInput
        placeholder="이름"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      
      <TextInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity onPress={handleSignup}>
        <Text>회원가입</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text>이미 계정이 있나요? 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}
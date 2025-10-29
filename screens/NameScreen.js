import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardingAvoidingView, Platform } from 'react-native';

export default function NameScreen({ navigation }) {
    const [name, setName] = useState('');

    const handleNext = () => {
        if (name.trim() === '') {
            alert("Por favor, digite o seu nome.");
            return;
        }
        navigation.navigate('Service', { clientName: name });
    };

    return (
        <KeyboardingAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >

        <Text style={styles.title}>Qual o seu nome?</Text>
        <TextInput
        style={styles.input}
        placeholder='Digite o seu nome'
        value={name}
        onChangeText={setName}
        />

        <Button title='Próximo' onPress={handleNext} />
        </KeyboardingAvoidingView>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fafafa',
        padding: 20,
    },
    title: {
        fontSize:22,
        fontWeight:'600',
        marginBottom:20,
    },
    input: {
        width:'90%',
        height:50,
        borderWidth:1,
        borderColor:'#ccc',
        borderRadius:10,
        paddingHorizontal:15,
        fontSize:18,
        marginBottom:20,
        backgroundColor:'#fff',
    },
});
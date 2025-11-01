import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Flatlist } from 'react-native';

const services = [
    { id: '1', name: 'Corte Tradicional' },
    { id: '2', name: 'Barba' },
    { id: '3', name: 'Corte + Sombrancelha' },
    { id: '4', name: 'Corte + Barba + Sombrancelha' },
    { id: '5', name: 'Sombrancelha' },
    { id: '6', name: 'Pigmentação - Cabelo ou Barba' },
    { id: '7', name: 'Luzes + Corte' },
    { id: '8', name: 'Platinado + Corte' },
    { id: '9', name: 'Pezinho' },
    { id: '10', name: 'Depilação Nasal' },
    { id: '11', name: 'Depilação Orelha' },
    { id: '12', name: 'Limpeza Profunda' },
];

export default function ServiceScreen({ route, navigation }) {
    const { clientName } = route.params;
    const [selectedService, setSeletedService] = useState(null);

    const handleNext = () => {
        if (!selectedService) {
            alert("Escolha um serviço antes de continuar.");
            return;
                    }
                
        navigation.navigate('Schedule', { clientName, selectedService });
    };

    return(
        <View style={styles.container}>
            <Text style={styles.greentig}>Olá {clientName}!</Text>
            <Text style={styles.title}>Escolha o serviço desejado:</Text>

            <Flatlist
            data={services}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TouchableOpacity
                style={[
                    styles.option,
                    selectedService === item.name && styles.optionSelected,
                ]}

                onPress={() => setSeletedService(item.name)}
                >
                    <Text
                    style={[
                        styles.optionText,
                        selectedService === item.name && styles.optionTextSelected,
                    ]}
                    >
                        {item.name}
                        </Text>
                        </TouchableOpacity>
            )}
            />

            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    greeting: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight:'600',
        marginBottom:20,
    },
    option: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 10,
    },
    optionSelected: {
        backgroundColor: '#2ecc',
        borderColor: '#27ae',
    },
    optionText: {
        fontSize: 16,
    },
    optionTextSelected: {
        color:'#fff',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});


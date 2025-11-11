import React, { useEffect, useState } from 'react';
import { View, Text, Flatlist, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import db from './lib/db';

export default function SelectService() {
    const [services, setServices] = useState([]);
    const router = useRouter();
    
    // Carrega serviços do SQLite

}
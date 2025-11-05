import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import db, { initDB } from "./lib/db";
import * as Crypto from "expo-crypto";
import { useRouter } from "expo-router";

export default function Register() {
    const [name, setName ] = useState("");
    const [email, setEmail ] = useState("");
    const [password, setPassword ] = useState("");
    const [role, setRole ] = useState("client");
    const router = useRouter();

    const register = async () => {
        if (!name || !password ) return Alert.alert("Preencha com seu nome e senha");
        const hash = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);

        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO users(name, email, password_hash, role) VALUES (?, ?, ?, ?);`,
                [name, email || null, hash, role],
                (_, result) => {
                    Alert.alert("Cadastrado", "Cadastro realizado com sucesso!", [{ text: OK, onPress: () => router.replace('/login')}]);
                },

                (_, error) => {
                    console.error(error);
                    Alert.alert("Erro", "Não foi possível cadastrar. Verifique o email.")
                }
            );
        });
    };

    return (
        <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Criar conta</Text>
      <TextInput placeholder="Nome" value={name} onChangeText={setName} style={{borderWidth:1, padding:10, marginBottom:10}}/>
      <TextInput placeholder="Email (opcional)" value={email} onChangeText={setEmail} keyboardType="email-address" style={{borderWidth:1, padding:10, marginBottom:10}}/>
      <TextInput placeholder="Senha" value={password} onChangeText={setPassword} secureTextEntry style={{borderWidth:1, padding:10, marginBottom:10}}/>
      <View style={{flexDirection:'row', marginBottom:10}}>
        <TouchableOpacity onPress={()=>setRole('client')} style={{padding:10, backgroundColor: role==='client' ? '#3498db':'#ddd', marginRight:10}}>
          <Text>Cliente</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setRole('barber')} style={{padding:10, backgroundColor: role==='barber' ? '#3498db':'#ddd'}}>
          <Text>Barbeiro</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={register} style={{padding:15, backgroundColor:'#2ecc71', alignItems:'center', borderRadius:8}}>
        <Text style={{color:'#fff'}}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
    );
}
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function NameScreen() {
  const [name, setName] = useState("");
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Qual é o seu nome?</Text>

      <TextInput
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          width: "100%",
          padding: 10,
          borderRadius: 8,
          marginBottom: 20,
        }}
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        disabled={!name.trim()}
        onPress={() => router.push({ pathname: "/service", params: { name } })}
        style={{
          backgroundColor: name.trim() ? "#3498db" : "#ccc",
          padding: 15,
          borderRadius: 10,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}
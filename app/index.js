import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#F5F5F5' }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Bem-vindo à Marcão Barbershop</Text>
      <TouchableOpacity
        onPress={() => router.push("/selectService")}
        style={{ backgroundColor: "#3498db", padding: 15, borderRadius: 10 }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { openDB } from '../lib/db';

export default function SelectService() {
  const [services, setServices] = useState([]);
  const router = useRouter();

  // Carrega serviços do banco (ou insere padrões)
  useEffect(() => {
    (async () => {
      const db = await openDB();

      // Verifica se já existem serviços
      const existing = await db.getAllAsync('SELECT * FROM services');
      if (existing.length === 0) {
        await db.runAsync('INSERT INTO services (name, price) VALUES (?, ?)', ['Corte simples', 35]);
        await db.runAsync('INSERT INTO services (name, price) VALUES (?, ?)', ['Barba', 25]);
        await db.runAsync('INSERT INTO services (name, price) VALUES (?, ?)', ['Corte + Barba', 50]);
      }

      const rows = await db.getAllAsync('SELECT * FROM services');
      setServices(rows);
    })();
  }, []);

  const handleSelectService = (service) => {
    router.push({
      pathname: 'schedule',
      params: {
        serviceId: service.id,
        serviceName: service.name,
        servicePrice: service.price,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha seu corte 💈</Text>

      {services.length === 0 ? (
        <Text style={styles.empty}>Nenhum serviço cadastrado.</Text>
      ) : (
        <FlatList
          data={services}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleSelectService(item)}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8fa',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
    textAlign: 'center',
  },
  empty: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  price: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
  },
});
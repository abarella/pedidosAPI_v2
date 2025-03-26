import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [loading3, setLoading3] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://10.0.12.116:3000/pedidos/producaohoje/');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Erro ao buscar dados 1:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchData2 = async () => {
      try {
        setLoading2(true);
        const response = await fetch('http://10.0.12.116:3000/pedidos/producaoamanha/');
        const json = await response.json();
        setData2(json);
      } catch (error) {
        console.error('Erro ao buscar dados 2:', error);
      } finally {
        setLoading2(false);
      }
    };

    const fetchData3 = async () => {
      try {
        setLoading3(true);
        const response = await fetch('http://10.0.12.116:3000/pedidos/nfandamento/');
        const json = await response.json();
        setData3(json);
      } catch (error) {
        console.error('Erro ao buscar dados 3:', error);
      } finally {
        setLoading3(false);
      }
    };

    fetchData();
    fetchData2();
    fetchData3();

    const intervalId1 = setInterval(fetchData, 10000);
    const intervalId2 = setInterval(fetchData2, 10000);
    const intervalId3 = setInterval(fetchData3, 10000);

    return () => {
      clearInterval(intervalId1);
      clearInterval(intervalId2);
      clearInterval(intervalId3);
    };
  }, []);

  if (loading || loading2 || loading3) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produção de Hoje</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>ID</Text>
        <Text style={styles.headerCell}>Lote</Text>
        <Text style={styles.headerCell}>Série</Text>
        <Text style={styles.headerCell}>Qtde</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.p110prod.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.p110prod}</Text>
            <Text style={styles.cell}>{item.p110lote}</Text>
            <Text style={styles.cell}>{item.p110serie}</Text>
            <Text style={styles.cell}>{item.regs}</Text>
          </View>
        )}
      />

      <Text style={styles.title}>Produção de Amanhã</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>ID</Text>
        <Text style={styles.headerCell}>Lote</Text>
        <Text style={styles.headerCell}>Série</Text>
        <Text style={styles.headerCell}>Qtde</Text>
      </View>
      <FlatList
        data={data2}
        keyExtractor={(item) => item.p110prod.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.p110prod}</Text>
            <Text style={styles.cell}>{item.p110lote}</Text>
            <Text style={styles.cell}>{item.p110serie}</Text>
            <Text style={styles.cell}>{item.regs}</Text>
          </View>
        )}
      />

    <Text style={styles.title}>NFs Agora</Text>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>Emissor</Text>
        <Text style={styles.headerCell}>Tentativas</Text>
        <Text style={styles.headerCell}>Chave</Text>
        <Text style={styles.headerCell}>Serie</Text>
      </View>
      <FlatList
        data={data3}
        keyExtractor={(item) => item.nNf}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{item.emissor}</Text>
            <Text style={styles.cell}>{item.tentativas}</Text>
            <Text style={styles.cell}>{item.p110chve}</Text>
            <Text style={styles.cell}>{item.p110serie}</Text>
          </View>
        )}
      />


    </View>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color:"#c0c0c0",
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default App;

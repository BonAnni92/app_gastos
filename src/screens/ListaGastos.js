import { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { carregarGastos, salvarGastos } from '../storage';

function formatarValor(valor) {
  const [inteiro, centavos] = valor.toFixed(2).split('.');
  return 'R$ ' + inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + centavos;
}

export default function ListaGastos({ navigation }) {
  const [gastos, setGastos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      carregarGastos().then((lista) => setGastos(lista));
    }, [])
  );

  const total = gastos.reduce((soma, gasto) => soma + gasto.valor, 0);

  async function excluir(id) {
    const novaLista = gastos.filter((gasto) => gasto.id !== id);
    setGastos(novaLista);
    await salvarGastos(novaLista);
  }

  return (
    <View style={styles.fundo}>
      <View style={styles.container}>
        <View style={styles.caixaTotal}>
          <Text style={styles.textoTotal}>Total gasto</Text>
          <Text style={styles.valorTotal}>{formatarValor(total)}</Text>
          <Text style={styles.quantidade}>
            {gastos.length} {gastos.length === 1 ? 'gasto' : 'gastos'}
          </Text>
        </View>

        <FlatList
          data={gastos}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 16 }}
          ListEmptyComponent={
            <Text style={styles.vazio}>Nenhum gasto cadastrado ainda.</Text>
          }
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.infoItem}>
                <Text style={styles.descricao}>{item.descricao}</Text>
                <Text style={styles.valor}>{formatarValor(item.valor)}</Text>
              </View>
              <TouchableOpacity
                style={styles.botaoExcluir}
                onPress={() => excluir(item.id)}
              >
                <Text style={styles.textoExcluir}>Excluir</Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={() => navigation.navigate('Novo')}
        >
          <Text style={styles.textoAdicionar}>+ Adicionar gasto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: '#eef2f7', alignItems: 'center' },
  container: { flex: 1, width: '100%', maxWidth: 480, padding: 20 },
  caixaTotal: {
    backgroundColor: '#1e3a5f',
    paddingVertical: 24,
    borderRadius: 16,
    marginBottom: 20,
    alignItems: 'center',
  },
  textoTotal: { color: '#c9d6e8', fontSize: 15 },
  valorTotal: { color: '#fff', fontSize: 34, fontWeight: 'bold', marginVertical: 4 },
  quantidade: { color: '#c9d6e8', fontSize: 13 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  infoItem: { flex: 1 },
  descricao: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  valor: { fontSize: 15, color: '#2563eb', marginTop: 2, fontWeight: '500' },
  botaoExcluir: {
    borderWidth: 1,
    borderColor: '#ef4444',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  textoExcluir: { color: '#ef4444', fontWeight: '600', fontSize: 13 },
  botaoAdicionar: {
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  textoAdicionar: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  vazio: { textAlign: 'center', color: '#6b7280', marginTop: 30, fontSize: 15 },
});
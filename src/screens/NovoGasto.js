import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { carregarGastos, salvarGastos } from '../storage';

export default function NovoGasto({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [erro, setErro] = useState('');

  async function salvar() {
    const numero = parseFloat(valor.replace(',', '.'));

    if (descricao.trim() === '') {
      setErro('Informe a descrição do gasto.');
      return;
    }
    if (isNaN(numero) || numero <= 0) {
      setErro('Informe um valor maior que zero.');
      return;
    }

    const novoGasto = {
      id: Date.now().toString(),
      descricao: descricao.trim(),
      valor: numero,
    };

    const lista = await carregarGastos();
    await salvarGastos([...lista, novoGasto]);

    navigation.goBack();
  }

  return (
    <View style={styles.fundo}>
      <View style={styles.container}>
        <View style={styles.cartao}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Almoço"
            placeholderTextColor="#9ca3af"
            value={descricao}
            onChangeText={(texto) => {
              setDescricao(texto);
              setErro('');
            }}
          />

          <Text style={styles.label}>Valor (R$)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 25,90"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
            value={valor}
            onChangeText={(texto) => {
              setValor(texto);
              setErro('');
            }}
          />

          {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

          <TouchableOpacity style={styles.botao} onPress={salvar}>
            <Text style={styles.textoBotao}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fundo: { flex: 1, backgroundColor: '#eef2f7', alignItems: 'center' },
  container: { flex: 1, width: '100%', maxWidth: 480, padding: 20 },
  cartao: { backgroundColor: '#fff', borderRadius: 16, padding: 20 },
  label: { fontSize: 15, fontWeight: '600', color: '#374151', marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  erro: {
    color: '#b91c1c',
    backgroundColor: '#fee2e2',
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
    fontSize: 14,
  },
  botao: {
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
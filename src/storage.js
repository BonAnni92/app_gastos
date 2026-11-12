import AsyncStorage from '@react-native-async-storage/async-storage';
 
const CHAVE = '@app_gastos:lista';
 
export async function carregarGastos() {
  try {
    const json = await AsyncStorage.getItem(CHAVE);
    return json ? JSON.parse(json) : [];
  } catch (erro) {
    console.log('Erro ao carregar gastos:', erro);
    return [];
  }
}
 
export async function salvarGastos(lista) {
  try {
    await AsyncStorage.setItem(CHAVE, JSON.stringify(lista));
  } catch (erro) {
    console.log('Erro ao salvar gastos:', erro);
  }
}
 
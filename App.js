import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListaGastos from './src/screens/ListaGastos';
import NovoGasto from './src/screens/NovoGasto';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1e3a5f' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#eef2f7' },
        }}
      >
        <Stack.Screen
          name="Lista"
          component={ListaGastos}
          options={{ title: 'Meus Gastos' }}
        />
        <Stack.Screen
          name="Novo"
          component={NovoGasto}
          options={{ title: 'Novo Gasto' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
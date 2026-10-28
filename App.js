import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RestaurantProvider, useRestaurant} from './src/store/RestaurantContext';
import DishFormScreen from './src/screens/DishFormScreen';
import DishListScreen from './src/screens/DishListScreen';
import InvoiceListScreen from './src/screens/InvoiceListScreen';
import OrderScreen from './src/screens/OrderScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import TableMapScreen from './src/screens/TableMapScreen';
import colors from './src/theme/colors';

const Stack = createNativeStackNavigator();

function HeaderButton({label, onPress}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={({pressed}) => [
        styles.headerButton,
        pressed && styles.headerButtonPressed,
      ]}>
      <Text style={styles.headerButtonText}>{label}</Text>
    </Pressable>
  );
}

function AppNavigator() {
  const {loading} = useRestaurant();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTintColor: colors.white,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          contentStyle: styles.content,
        }}>
        <Stack.Screen
          name="TableMap"
          component={TableMapScreen}
          options={({navigation}) => ({
            title: 'Sơ đồ bàn',
            headerLeft: () => (
              <HeaderButton
                label="Hoá đơn"
                onPress={() => navigation.navigate('InvoiceList')}
              />
            ),
            headerRight: () => (
              <HeaderButton
                label="Thực đơn"
                onPress={() => navigation.navigate('DishList')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="InvoiceList"
          component={InvoiceListScreen}
          options={{title: 'Hoá đơn'}}
        />
        <Stack.Screen
          name="DishList"
          component={DishListScreen}
          options={({navigation}) => ({
            title: 'Thực đơn',
            headerRight: () => (
              <HeaderButton
                label="+ Thêm món"
                onPress={() => navigation.navigate('DishForm', {})}
              />
            ),
          })}
        />
        <Stack.Screen
          name="DishForm"
          component={DishFormScreen}
          options={({route}) => ({
            title: route.params?.dishId ? 'Sửa món' : 'Thêm món',
          })}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={({route}) => ({title: `Bàn ${route.params.tableNumber}`})}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={({route}) => ({
            title: route.params?.readOnly ? 'Chi tiết hoá đơn' : 'Thanh toán',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
      />
      <RestaurantProvider>
        <AppNavigator />
      </RestaurantProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  content: {
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
  },
  headerButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerButtonPressed: {
    opacity: 0.6,
  },
  headerButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

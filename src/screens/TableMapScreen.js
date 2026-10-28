import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {INVOICE_STATUS, TABLE_COUNT} from '../constants';
import {useRestaurant} from '../store/RestaurantContext';
import {formatPrice} from '../utils/format';
import {getInvoiceLines, getTotals} from '../utils/invoice';
import {styles} from './TableMapScreen.styles';

const TABLES = Array.from({length: TABLE_COUNT}, (_, index) => index + 1);

export default function TableMapScreen({navigation}) {
  const {dishes, invoices} = useRestaurant();

  const renderTable = ({item}) => {
    const invoice = invoices.find(
      record =>
        record.tableNumber === item &&
        record.status === INVOICE_STATUS.SERVING,
    );
    const occupied = Boolean(invoice);
    const itemCount = invoice
      ? invoice.items.reduce((sum, line) => sum + line.quantity, 0)
      : 0;
    const total = invoice
      ? getTotals(getInvoiceLines(invoice, dishes)).total
      : 0;

    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Order', {tableNumber: item})
        }
        style={({pressed}) => [
          styles.card,
          occupied ? styles.cardOccupied : styles.cardEmpty,
          pressed && styles.cardPressed,
        ]}>
        <View style={styles.cardHeader}>
          <Text
            style={[
              styles.tableNumber,
              occupied && styles.tableNumberOccupied,
            ]}>
            Bàn {item}
          </Text>
          <Text
            style={[
              styles.statusText,
              occupied ? styles.statusTextOccupied : styles.statusTextEmpty,
            ]}>
            {occupied ? 'Có khách' : 'Trống'}
          </Text>
        </View>

        {occupied ? (
          <>
            <Text style={styles.metaText}>{itemCount} món</Text>
            <Text style={styles.totalText}>{formatPrice(total)}</Text>
          </>
        ) : (
          <Text style={styles.metaText}>Nhấn để gọi món</Text>
        )}
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <FlatList
        data={TABLES}
        keyExtractor={item => String(item)}
        renderItem={renderTable}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}


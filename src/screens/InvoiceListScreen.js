import React from 'react';
import {FlatList, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import {INVOICE_STATUS} from '../constants';
import {useRestaurant} from '../store/RestaurantContext';
import {formatPrice} from '../utils/format';
import {getInvoiceLines, getTotals} from '../utils/invoice';
import {styles} from './InvoiceListScreen.styles';

export default function InvoiceListScreen({navigation}) {
  const {dishes, invoices} = useRestaurant();

  const renderInvoice = ({item}) => {
    const paid = item.status === INVOICE_STATUS.PAID;
    const itemCount = item.items.reduce((sum, line) => sum + line.quantity, 0);
    const {total} = getTotals(getInvoiceLines(item, dishes));

    return (
      <Card
        onPress={() =>
          paid
            ? navigation.navigate('Payment', {
                invoiceId: item.id,
                readOnly: true,
              })
            : navigation.navigate('Order', {tableNumber: item.tableNumber})
        }>
        <View style={styles.cardHeader}>
          <Text style={styles.tableNumber}>Bàn {item.tableNumber}</Text>
          <Text
            style={[
              styles.statusText,
              paid ? styles.statusTextPaid : styles.statusTextServing,
            ]}>
            {item.status}
          </Text>
        </View>

        <Text style={styles.createdAt}>Tạo lúc {item.createdAt}</Text>

        <View style={styles.cardFooter}>
          <Text style={styles.metaText}>{itemCount} món</Text>
          <Text style={styles.totalText}>{formatPrice(total)}</Text>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <FlatList
        data={invoices}
        keyExtractor={item => item.id}
        renderItem={renderInvoice}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <EmptyState
            title="Chưa có hoá đơn"
            message="Hoá đơn sẽ xuất hiện khi bạn gọi món tại sơ đồ bàn."
          />
        }
      />
    </SafeAreaView>
  );
}


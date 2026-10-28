import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import {INVOICE_STATUS} from '../constants';
import {useRestaurant} from '../store/RestaurantContext';
import colors from '../theme/colors';
import {formatNumber, formatPrice, onlyDigits} from '../utils/format';
import {getInvoiceLines, getTotals} from '../utils/invoice';
import {styles} from './PaymentScreen.styles';

export default function PaymentScreen({navigation, route}) {
  const {invoiceId} = route.params;
  const {dishes, invoices, payInvoice} = useRestaurant();
  const headerHeight = useHeaderHeight();
  const [cash, setCash] = useState('');

  const invoice = invoices.find(item => item.id === invoiceId);

  if (!invoice) {
    return (
      <SafeAreaView style={styles.screen} edges={['bottom']}>
        <EmptyState
          title="Không tìm thấy hoá đơn"
          message="Hoá đơn không tồn tại hoặc đã bị xoá."
        />
      </SafeAreaView>
    );
  }

  const lines = getInvoiceLines(invoice, dishes);
  const {subtotal, vat, total} = getTotals(lines);
  const paid = invoice.status === INVOICE_STATUS.PAID;
  const cashNumber = Number(cash) || 0;
  const change = cashNumber - total;
  const notEnoughCash = cashNumber > 0 && cashNumber < total;
  const canPay =
    invoice.status === INVOICE_STATUS.SERVING &&
    invoice.items.length > 0 &&
    cashNumber >= total;

  const handlePay = () => {
    if (!canPay) {
      return;
    }
    payInvoice(invoice.id);
    Alert.alert(
      'Thanh toán thành công',
      `Bàn ${invoice.tableNumber} đã thanh toán ${formatPrice(total)}.`,
      [{text: 'Đồng ý', onPress: () => navigation.popToTop()}],
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior="padding"
        keyboardVerticalOffset={headerHeight}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">
          <Card>
            <View style={styles.headerRow}>
              <Text style={styles.tableTitle}>Bàn {invoice.tableNumber}</Text>
              <Text style={styles.statusText}>{invoice.status}</Text>
            </View>
            <Text style={styles.createdAt}>Tạo lúc {invoice.createdAt}</Text>
          </Card>

          <Card>
            <Text style={styles.cardTitle}>Chi tiết hoá đơn</Text>
            {lines.length === 0 ? (
              <Text style={styles.emptyText}>Hoá đơn chưa có món nào.</Text>
            ) : (
              lines.map(line => (
                <View key={line.id} style={styles.line}>
                  <View style={styles.lineInfo}>
                    <Text style={styles.lineName}>{line.name}</Text>
                    <Text style={styles.lineMeta}>
                      {line.quantity} × {formatPrice(line.unitPrice)}
                    </Text>
                  </View>
                  <Text style={styles.lineTotal}>
                    {formatPrice(line.lineTotal)}
                  </Text>
                </View>
              ))
            )}
          </Card>

          <Card>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tạm tính</Text>
              <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>VAT 8%</Text>
              <Text style={styles.summaryValue}>{formatPrice(vat)}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Tổng cộng</Text>
              <Text style={styles.totalValue}>{formatPrice(total)}</Text>
            </View>
          </Card>

          {paid ? (
            <View style={styles.paidNotice}>
              <Text style={styles.paidNoticeText}>
                Hoá đơn đã được thanh toán.
              </Text>
            </View>
          ) : (
            <>
              <Card>
                <Text style={styles.label}>Tiền khách đưa (VNĐ)</Text>
                <TextInput
                  value={cash ? formatNumber(cash) : ''}
                  onChangeText={value => setCash(onlyDigits(value))}
                  placeholder="Nhập số tiền khách đưa"
                  placeholderTextColor={colors.muted}
                  keyboardType="numeric"
                  style={[styles.input, notEnoughCash && styles.inputError]}
                />
                {notEnoughCash ? (
                  <Text style={styles.errorText}>
                    Tiền khách đưa nhỏ hơn tổng cộng
                  </Text>
                ) : null}

                <View style={styles.changeRow}>
                  <Text style={styles.changeLabel}>Tiền thừa</Text>
                  <Text
                    style={[
                      styles.changeValue,
                      notEnoughCash && styles.changeValueError,
                    ]}>
                    {formatPrice(Math.max(change, 0))}
                  </Text>
                </View>
              </Card>

              <AppButton
                label="Xác nhận thanh toán"
                onPress={handlePay}
                disabled={!canPay}
              />
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


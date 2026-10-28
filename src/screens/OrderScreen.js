import React from 'react';
import {Pressable, SectionList, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import {CATEGORIES} from '../constants';
import {useRestaurant} from '../store/RestaurantContext';
import {formatPrice} from '../utils/format';
import {getInvoiceLines, getTotals} from '../utils/invoice';
import {styles} from './OrderScreen.styles';

export default function OrderScreen({navigation, route}) {
  const {tableNumber} = route.params;
  const {dishes, getActiveInvoice, changeQuantity} = useRestaurant();

  const invoice = getActiveInvoice(tableNumber);
  const lines = getInvoiceLines(invoice, dishes);
  const {subtotal} = getTotals(lines);

  const sections = CATEGORIES.map(category => ({
    title: category,
    data: dishes.filter(dish => dish.category === category),
  })).filter(section => section.data.length > 0);

  const getQuantity = dishId =>
    invoice?.items.find(item => item.dishId === dishId)?.quantity ?? 0;

  const renderDish = ({item}) => {
    const quantity = getQuantity(item.id);

    return (
      <View style={[styles.card, !item.available && styles.cardUnavailable]}>
        <View style={styles.dishInfo}>
          <Text style={styles.dishName}>{item.name}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
            {!item.available ? (
              <Text style={styles.unavailableText}>Hết món</Text>
            ) : null}
          </View>
        </View>

        <View style={styles.stepper}>
          <Pressable
            onPress={() => changeQuantity(tableNumber, item.id, -1)}
            disabled={quantity === 0}
            hitSlop={6}
            style={({pressed}) => [
              styles.stepButton,
              quantity === 0 && styles.stepButtonDisabled,
              pressed && quantity > 0 && styles.stepButtonPressed,
            ]}>
            <Text
              style={[
                styles.stepSymbol,
                quantity === 0 && styles.stepSymbolDisabled,
              ]}>
              −
            </Text>
          </Pressable>

          <Text style={styles.quantity}>{quantity}</Text>

          <Pressable
            onPress={() => changeQuantity(tableNumber, item.id, 1)}
            disabled={!item.available}
            hitSlop={6}
            style={({pressed}) => [
              styles.stepButton,
              !item.available && styles.stepButtonDisabled,
              pressed && item.available && styles.stepButtonPressed,
            ]}>
            <Text
              style={[
                styles.stepSymbol,
                !item.available && styles.stepSymbolDisabled,
              ]}>
              +
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const canPay = Boolean(invoice && invoice.items.length > 0);

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={renderDish}
        renderSectionHeader={({section}) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={
          <EmptyState
            title="Thực đơn đang trống"
            message="Vào màn hình Thực đơn để thêm món."
          />
        }
      />

      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerLabel}>Tạm tính</Text>
          <Text style={styles.footerValue}>{formatPrice(subtotal)}</Text>
        </View>
        <AppButton
          label="Thanh toán"
          onPress={() =>
            navigation.navigate('Payment', {invoiceId: invoice.id})
          }
          disabled={!canPay}
          style={styles.payButton}
        />
      </View>
    </SafeAreaView>
  );
}


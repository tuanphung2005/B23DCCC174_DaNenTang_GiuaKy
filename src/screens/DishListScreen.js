import React from 'react';
import {
  Alert,
  Pressable,
  SectionList,
  Switch,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import EmptyState from '../components/EmptyState';
import {CATEGORIES, INVOICE_STATUS, TABLE_COUNT} from '../constants';
import {useRestaurant} from '../store/RestaurantContext';
import colors from '../theme/colors';
import {formatPrice} from '../utils/format';
import {styles} from './DishListScreen.styles';

export default function DishListScreen({navigation}) {
  const {dishes, invoices, setDishAvailable, deleteDish} = useRestaurant();

  const occupiedTables = new Set(
    invoices
      .filter(invoice => invoice.status === INVOICE_STATUS.SERVING)
      .map(invoice => invoice.tableNumber),
  ).size;

  const sections = CATEGORIES.map(category => ({
    title: category,
    data: dishes.filter(dish => dish.category === category),
  })).filter(section => section.data.length > 0);

  const confirmDelete = dish => {
    const isInUse = invoices.some(
      invoice =>
        invoice.status === INVOICE_STATUS.SERVING &&
        invoice.items.some(item => item.dishId === dish.id),
    );

    if (isInUse) {
      Alert.alert(
        'Không thể xoá',
        `"${dish.name}" đang có trong hoá đơn "Đang phục vụ".`,
      );
      return;
    }

    Alert.alert('Xoá món', `Bạn có chắc muốn xoá "${dish.name}"?`, [
      {text: 'Huỷ', style: 'cancel'},
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: () => deleteDish(dish.id),
      },
    ]);
  };

  const renderDish = ({item}) => (
    <Pressable
      onPress={() => navigation.navigate('DishForm', {dishId: item.id})}
      onLongPress={() => confirmDelete(item)}
      style={({pressed}) => [
        styles.card,
        !item.available && styles.cardUnavailable,
        pressed && styles.cardPressed,
      ]}>
      <View style={styles.cardInfo}>
        <Text style={styles.dishName}>{item.name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          {!item.available ? (
            <Text style={styles.unavailableText}>Hết món</Text>
          ) : null}
        </View>
      </View>
      <Switch
        value={item.available}
        onValueChange={value => setDishAvailable(item.id, value)}
        trackColor={{false: colors.border, true: colors.success}}
        thumbColor={colors.white}
      />
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          {dishes.length} món · {occupiedTables}/{TABLE_COUNT} bàn có khách
        </Text>
        <Text style={styles.summaryHint}>
          Nhấn để sửa · Nhấn giữ để xoá
        </Text>
      </View>

      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={renderDish}
        renderSectionHeader={({section}) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionCount}>{section.data.length}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={
          <EmptyState
            title="Thực đơn đang trống"
            message='Nhấn "+ Thêm món" để tạo món đầu tiên.'
          />
        }
      />
    </SafeAreaView>
  );
}


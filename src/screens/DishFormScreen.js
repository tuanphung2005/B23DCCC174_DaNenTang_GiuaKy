import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import {CATEGORIES} from '../constants';
import {useRestaurant} from '../store/RestaurantContext';
import colors from '../theme/colors';
import {formatNumber, onlyDigits} from '../utils/format';
import {styles} from './DishFormScreen.styles';

export default function DishFormScreen({navigation, route}) {
  const {dishes, addDish, updateDish} = useRestaurant();
  const headerHeight = useHeaderHeight();
  const dishId = route.params?.dishId;
  const dish = dishes.find(item => item.id === dishId);

  const [name, setName] = useState(dish?.name ?? '');
  const [price, setPrice] = useState(dish ? String(dish.price) : '');
  const [category, setCategory] = useState(dish?.category ?? 'Món chính');
  const [errors, setErrors] = useState({});

  const validate = values => {
    const nextErrors = {};
    const trimmedName = values.name.trim();

    if (!trimmedName) {
      nextErrors.name = 'Vui lòng nhập tên món';
    } else if (
      dishes.some(
        item =>
          item.id !== dishId &&
          item.name.trim().toLowerCase() === trimmedName.toLowerCase(),
      )
    ) {
      nextErrors.name = 'Tên món này đã tồn tại';
    }

    const priceNumber = Number(values.price);
    if (!values.price || !Number.isFinite(priceNumber) || priceNumber <= 0) {
      nextErrors.price = 'Giá phải lớn hơn 0';
    } else if (priceNumber % 1000 !== 0) {
      nextErrors.price = 'Giá phải là bội số của 1.000';
    }

    return nextErrors;
  };

  const updateField = (field, value) => {
    const next = {name, price, category, [field]: value};
    if (field === 'name') {
      setName(value);
    } else if (field === 'price') {
      setPrice(value);
    } else {
      setCategory(value);
    }

    if (Object.keys(errors).length > 0) {
      setErrors(validate(next));
    }
  };

  const handleSave = () => {
    const nextErrors = validate({name, price, category});
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const data = {
      name: name.trim(),
      category,
      price: Number(price),
    };

    if (dish) {
      updateDish(dish.id, data);
    } else {
      addDish({...data, available: true});
    }
    navigation.goBack();
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
          <View style={styles.card}>
            <Text style={styles.label}>Tên món</Text>
            <TextInput
              value={name}
              onChangeText={value => updateField('name', value)}
              placeholder="Ví dụ: Phở bò"
              placeholderTextColor={colors.muted}
              autoCapitalize="words"
              style={[styles.input, errors.name && styles.inputError]}
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}

            <Text style={[styles.label, styles.labelSpaced]}>Giá bán (VNĐ)</Text>
            <TextInput
              value={price ? formatNumber(price) : ''}
              onChangeText={value => updateField('price', onlyDigits(value))}
              placeholder="Ví dụ: 65.000"
              placeholderTextColor={colors.muted}
              keyboardType="numeric"
              style={[styles.input, errors.price && styles.inputError]}
            />
            {errors.price ? (
              <Text style={styles.errorText}>{errors.price}</Text>
            ) : (
              <Text style={styles.hint}>Giá phải là bội số của 1.000</Text>
            )}

            <Text style={[styles.label, styles.labelSpaced]}>Loại món</Text>
            <View style={styles.categories}>
              {CATEGORIES.map(item => {
                const selected = item === category;
                return (
                  <Pressable
                    key={item}
                    onPress={() => updateField('category', item)}
                    style={({pressed}) => [
                      styles.categoryButton,
                      selected && styles.categorySelected,
                      pressed && styles.categoryPressed,
                    ]}>
                    <Text
                      style={[
                        styles.categoryText,
                        selected && styles.categoryTextSelected,
                      ]}>
                      {item}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <AppButton
            label={dish ? 'Lưu thay đổi' : 'Thêm món'}
            onPress={handleSave}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


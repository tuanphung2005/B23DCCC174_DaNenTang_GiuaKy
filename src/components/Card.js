import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import colors, {radius, spacing} from '../theme/colors';

export default function Card({children, onPress, style}) {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.card,
          pressed && styles.pressed,
          style,
        ]}>
        {children}
      </Pressable>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  pressed: {
    backgroundColor: colors.primarySoft,
  },
});

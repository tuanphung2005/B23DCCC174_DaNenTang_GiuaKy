import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import colors, {radius, spacing} from '../theme/colors';

export default function AppButton({label, onPress, disabled, style, textStyle}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      <Text style={[styles.label, disabled && styles.disabledLabel, textStyle]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  pressed: {
    backgroundColor: colors.primaryDark,
    opacity: 0.9,
  },
  disabled: {
    backgroundColor: colors.border,
  },
  label: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
  disabledLabel: {
    color: colors.muted,
  },
});

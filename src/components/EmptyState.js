import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import colors, {spacing, typography} from '../theme/colors';

export default function EmptyState({title, message}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl * 2,
  },
  title: {
    ...typography.h2,
    color: colors.muted,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  message: {
    ...typography.small,
    textAlign: 'center',
  },
});

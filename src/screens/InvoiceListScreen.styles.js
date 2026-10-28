import {StyleSheet} from 'react-native';
import {common} from '../styles/common';
import colors, {spacing, typography} from '../theme/colors';

export const styles = StyleSheet.create({
  screen: common.screen,
  listContent: common.listContent,
  cardHeader: common.rowBetween,
  tableNumber: {
    ...typography.h2,
  },
  statusText: common.statusText,
  statusTextServing: {
    color: colors.primary,
  },
  statusTextPaid: {
    color: colors.success,
  },
  createdAt: common.createdAt,
  cardFooter: {
    ...common.rowBetween,
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  metaText: common.metaText,
  totalText: common.totalText,
});

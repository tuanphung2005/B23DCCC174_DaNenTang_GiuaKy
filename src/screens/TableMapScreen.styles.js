import {StyleSheet} from 'react-native';
import {common} from '../styles/common';
import colors, {radius, spacing, typography} from '../theme/colors';

export const styles = StyleSheet.create({
  screen: common.screen,
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  row: {
    gap: spacing.md,
  },
  card: {
    flex: 1,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  cardEmpty: {
    backgroundColor: colors.card,
    borderColor: colors.border,
  },
  cardOccupied: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },
  cardPressed: {
    opacity: 0.75,
  },
  cardHeader: {
    ...common.rowBetween,
    marginBottom: spacing.sm,
  },
  tableNumber: {
    ...typography.h2,
  },
  tableNumberOccupied: {
    color: colors.primary,
  },
  statusText: common.statusText,
  statusTextEmpty: {
    color: colors.muted,
  },
  statusTextOccupied: {
    color: colors.primary,
  },
  metaText: common.metaText,
  totalText: {
    ...common.totalText,
    marginTop: spacing.xs,
  },
});

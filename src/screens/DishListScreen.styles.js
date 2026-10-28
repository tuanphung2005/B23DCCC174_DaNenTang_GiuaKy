import {StyleSheet} from 'react-native';
import {common} from '../styles/common';
import colors, {radius, spacing, typography} from '../theme/colors';

export const styles = StyleSheet.create({
  screen: common.screen,
  summary: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  summaryText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  summaryHint: {
    color: colors.white,
    fontSize: 12,
    marginTop: spacing.xs,
    opacity: 0.85,
  },
  listContent: common.listContent,
  sectionHeader: {
    ...common.rowBetween,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: common.sectionTitle,
  sectionCount: {
    ...typography.caption,
    color: colors.muted,
    fontWeight: '700',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  cardUnavailable: {
    opacity: 0.55,
  },
  cardPressed: {
    backgroundColor: colors.primarySoft,
  },
  cardInfo: {
    flex: 1,
    paddingRight: spacing.md,
  },
  dishName: common.dishName,
  metaRow: common.metaRow,
  price: common.price,
  unavailableText: common.unavailableText,
});

import {StyleSheet} from 'react-native';
import {common} from '../styles/common';
import colors, {radius, spacing, typography} from '../theme/colors';

export const styles = StyleSheet.create({
  flex: common.flex,
  screen: common.screen,
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  headerRow: common.rowBetween,
  tableTitle: {
    ...typography.h1,
  },
  statusText: {
    ...common.statusText,
    color: colors.success,
  },
  createdAt: common.createdAt,
  cardTitle: {
    ...typography.h2,
    marginBottom: spacing.sm,
  },
  emptyText: {
    ...typography.small,
    paddingVertical: spacing.sm,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lineInfo: {
    flex: 1,
  },
  lineName: {
    ...typography.body,
    fontWeight: '600',
  },
  lineMeta: {
    ...typography.caption,
    marginTop: 2,
  },
  lineTotal: {
    ...typography.body,
    fontWeight: '600',
  },
  summaryRow: {
    ...common.rowBetween,
    paddingVertical: spacing.xs,
  },
  summaryLabel: {
    ...typography.small,
  },
  summaryValue: {
    ...typography.body,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  totalLabel: {
    ...typography.body,
    fontWeight: '700',
  },
  totalValue: {
    ...typography.h1,
    color: colors.primary,
  },
  label: common.label,
  input: common.input,
  inputError: common.inputError,
  errorText: common.errorText,
  changeRow: {
    ...common.rowBetween,
    marginTop: spacing.md,
  },
  changeLabel: {
    ...typography.body,
    fontWeight: '600',
  },
  changeValue: {
    ...typography.h2,
    color: colors.success,
  },
  changeValueError: {
    color: colors.danger,
  },
  paidNotice: {
    backgroundColor: colors.successSoft,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  paidNoticeText: {
    ...typography.body,
    color: colors.success,
    fontWeight: '600',
    textAlign: 'center',
  },
});

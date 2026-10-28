import {StyleSheet} from 'react-native';
import {common} from '../styles/common';
import colors, {radius, spacing, typography} from '../theme/colors';

export const styles = StyleSheet.create({
  screen: common.screen,
  listContent: {
    ...common.listContent,
    paddingBottom: spacing.lg,
  },
  sectionTitle: {
    ...common.sectionTitle,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardUnavailable: {
    opacity: 0.55,
  },
  dishInfo: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  dishName: common.dishName,
  metaRow: common.metaRow,
  price: common.price,
  unavailableText: common.unavailableText,
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
  stepButtonPressed: {
    backgroundColor: colors.primarySoft,
  },
  stepButtonDisabled: {
    borderColor: colors.border,
  },
  stepSymbol: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 22,
  },
  stepSymbolDisabled: {
    color: colors.border,
  },
  quantity: {
    ...typography.body,
    fontWeight: '700',
    minWidth: 30,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  footerTotal: {
    flex: 1,
  },
  footerLabel: {
    ...typography.caption,
  },
  footerValue: {
    ...typography.h2,
    color: colors.primary,
    marginTop: 2,
  },
  payButton: {
    paddingHorizontal: spacing.xl,
  },
});

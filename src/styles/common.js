import {StyleSheet} from 'react-native';
import colors, {radius, spacing, typography} from '../theme/colors';

export const common = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    flexGrow: 1,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.primary,
  },
  dishName: {
    ...typography.body,
    fontSize: 16,
    fontWeight: '600',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  price: {
    ...typography.small,
    color: colors.primary,
    fontWeight: '700',
  },
  unavailableText: {
    color: colors.danger,
    fontSize: 12,
    fontWeight: '700',
    marginLeft: spacing.sm,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
  createdAt: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  metaText: {
    ...typography.small,
  },
  totalText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
  },
  label: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});

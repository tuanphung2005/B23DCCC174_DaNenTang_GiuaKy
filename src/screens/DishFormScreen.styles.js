import {StyleSheet} from 'react-native';
import {common} from '../styles/common';
import colors, {radius, spacing, typography} from '../theme/colors';

export const styles = StyleSheet.create({
  flex: common.flex,
  screen: common.screen,
  content: {
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  label: common.label,
  labelSpaced: {
    marginTop: spacing.lg,
  },
  input: common.input,
  inputError: common.inputError,
  errorText: common.errorText,
  hint: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  categorySelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  categoryPressed: {
    opacity: 0.7,
  },
  categoryText: {
    ...typography.small,
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: colors.primary,
  },
});

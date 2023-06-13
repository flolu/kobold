export const classes = (...classes: (string | boolean | undefined)[]) =>
  classes.filter(Boolean).join(' ')

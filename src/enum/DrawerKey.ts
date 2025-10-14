export const DrawerKey = {
  TEACHERSTAFFDETAIL: 'TEACHERSTAFFDETAIL',
} as const;

export type DrawerKey = typeof DrawerKey[keyof typeof DrawerKey];

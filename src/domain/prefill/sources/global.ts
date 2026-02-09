import type { PrefillDataSource } from '../types';

export const globalSource: PrefillDataSource = {
  id: 'global',
  label: 'Global',
  getGroups: () => [
    {
      label: 'User',
      options: [
        { key: 'global:user.email', label: 'user.email' },
        { key: 'global:user.id', label: 'user.id' },
      ],
    },
    {
      label: 'Organization',
      options: [{ key: 'global:org.name', label: 'org.name' }],
    },
  ],
};

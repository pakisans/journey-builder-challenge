import type { PrefillDataSource } from '../types';

export const staticSource: PrefillDataSource = {
  id: 'static',
  label: 'Static',
  getGroups: () => [
    {
      label: 'Question',
      options: [
        { key: 'static.yes', label: 'Yes' },
        { key: 'static.no', label: 'No' },
      ],
    },
  ],
};

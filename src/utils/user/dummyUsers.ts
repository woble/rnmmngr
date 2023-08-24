import { User } from './user.types';

export const dummyUsers: User[] = [
  {
    avatarUrl: 'https://i.pravatar.cc/150?u=admin@example.com',
    email: 'admin@example.com',
    name: 'Admin',
    permissions: {
      canDelete: true,
      canModify: true,
    },
  },
  {
    avatarUrl: 'https://i.pravatar.cc/150?u=editor@example.com',
    email: 'editor@example.com',
    name: 'Editor',
    permissions: {
      canDelete: false,
      canModify: true,
    },
  },
  {
    avatarUrl: 'https://i.pravatar.cc/150?u=viewer@example.com',
    email: 'viewer@example.com',
    name: 'Viewer',
    permissions: {
      canDelete: false,
      canModify: false,
    },
  },
];

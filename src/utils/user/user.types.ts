export type User = {
  readonly avatarUrl: string;
  readonly name: string;
  readonly email: string;
  readonly permissions: UserPermissions;
};

export type UserPermissions = {
  readonly canCreate: boolean;
  readonly canModify: boolean;
  readonly canDelete: boolean;
};

interface Organisation {
  id: string;
  name: string;
  rcs?: string;
  type: string;
  createdAt?: Date;
  updatedAt?: Date;
  deleted?: boolean; 
  deletedAt?: Date;
  subscriptions?: Subscription[];
  currentSubscription?: Subscription;
  stripeId?: string;
  organisationModules?: Module[];
  user?: User[];
  owner?: User;
}

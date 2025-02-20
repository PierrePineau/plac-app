interface Subscription {
  id: number;
  organisation: Organisation[];
  plan?: Plan[];
  renewalFrequency: string;
  autoRenew: boolean;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  startAt?: Date;
  endAt?: Date;
  stripeId?: string;
}

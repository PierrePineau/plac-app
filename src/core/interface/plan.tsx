interface Plan {
  id: number;
  name: string;
  reference: string;
  description?: string;
  enable: boolean;
  custom: boolean;
  price: number;
  renewalFrequency?: string;
  stripeId: string;
  position: number;
  maxDevice: number;
  modules?: Module[];
}

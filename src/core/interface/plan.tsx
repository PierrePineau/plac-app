interface Plan {
  id: number;
  reference: string;
  name: string;
  price: number;
  description?: string;
  renewalFrequency?: string;
  modules: Module[];
  enable: boolean;
}

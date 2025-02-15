interface Address {
  id: number;
  uuid: string;
  country?: string | null;
  state?: string | null;
  city?: string | null;
  postcode?: string | null;
  street?: string | null;
  compl?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

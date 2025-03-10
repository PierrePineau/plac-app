interface User {
  id: number;
  uuid: string;
  email: string;
  deleted?: boolean;
  deletedAt?: Date;
  enable?: boolean;
  firstname: string;
  lastname: string;
  phone: string;
  userOrganisations?: Organisation[];
  userPreferences?: Preference[];
  roles?: string[];
  avatar?: string;
  endOfSheets?: any[];
  pointage?: any[];
}

interface Preference {
  id: number;
  value: string;
  preferenceSettings?: Setting[];
}

interface Setting {
  id: number;
  reference: string;
  name: string;
}

interface User {
  id: number;
  uuid: string;
  email: string;
  roles: string;
  deleted?: boolean;
  deletedAt?: Date;
  enable: boolean;
  userOrganisations?: Organisation[];
  userPreferences?: Preference[];
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

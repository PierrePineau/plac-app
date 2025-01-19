import { mockEmployes } from "./employee";
import { mockModules } from "./module";

export const mockOrganisations: Organisation[] = [
  {
    id: 1,
    uuid: '123e4567-e89b-12d3-a456-426614174001',
    name: 'Organisation One',
    createdAt: new Date('2025-01-01T10:00:00Z'),
    updatedAt: new Date('2025-01-02T15:30:00Z'),
    deletedAt: undefined,
    employes: [mockEmployes[0], mockEmployes[1]],
    organisationModules: [mockModules[0]],
  },
  {
    id: 2,
    uuid: '123e4567-e89b-12d3-a456-426614174002',
    name: 'Organisation Two',
    createdAt: new Date('2025-02-01T10:00:00Z'),
    updatedAt: new Date('2025-02-02T15:30:00Z'),
    deletedAt: undefined,
    employes: [mockEmployes[2], mockEmployes[3]],
    organisationModules: [mockModules[1]],
  },
  {
    id: 3,
    uuid: '123e4567-e89b-12d3-a456-426614174003',
    name: 'Organisation Three',
    createdAt: new Date('2025-03-01T10:00:00Z'),
    updatedAt: new Date('2025-03-02T15:30:00Z'),
    deletedAt: undefined,
    employes: [mockEmployes[4]],
    organisationModules: [mockModules[2]],
  },
];

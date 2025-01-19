import { mockOrganisations } from "./organisation";

export const mockUsers: User[] = [
  {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174001",
    email: "user1@example.com",
    roles: ["ROLE_USER"],
    deleted: false,
    createdAt: new Date("2025-01-01T10:00:00Z"),
    updatedAt: new Date("2025-01-02T15:30:00Z"),
    enable: true,
    userOrganisations: [mockOrganisations[0], mockOrganisations[1]]
  },
  {
    id: 2,
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    email: "user2@example.com",
    roles: ["ROLE_ADMIN"],
    deleted: false,
    createdAt: new Date("2025-02-01T10:00:00Z"),
    updatedAt: new Date("2025-02-02T15:30:00Z"),
    enable: true,
    userOrganisations: [mockOrganisations[2]]
  },
  {
    id: 3,
    uuid: "123e4567-e89b-12d3-a456-426614174003",
    email: "user3@example.com",
    roles: ["ROLE_MANAGER"],
    deleted: true,
    deletedAt: new Date("2025-03-01T12:00:00Z"),
    createdAt: new Date("2025-03-01T10:00:00Z"),
    updatedAt: new Date("2025-03-02T15:30:00Z"),
    enable: false,
    userOrganisations: []
  }
];

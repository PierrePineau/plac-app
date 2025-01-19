import { mockOrganisations } from "./organisation";

export const mockClients: Client[] = [
  {
    id: "123e4567-e89b-12d3-a456-426614174001",
    email: "client1@example.com",
    firstname: "John",
    lastname: "Doe",
    phone: "123-456-7890",
    createdAt: new Date("2025-01-01T10:00:00Z"),
    updatedAt: new Date("2025-01-02T15:30:00Z"),
    archived: false,
    deleted: false,
    organisationClients: [mockOrganisations[0], mockOrganisations[1]]
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174002",
    email: "client2@example.com",
    firstname: "Jane",
    lastname: "Smith",
    phone: "987-654-3210",
    createdAt: new Date("2025-02-01T10:00:00Z"),
    updatedAt: new Date("2025-02-02T15:30:00Z"),
    archived: false,
    deleted: false,
    organisationClients: [mockOrganisations[2]]
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174003",
    email: "client3@example.com",
    firstname: "Alice",
    lastname: "Johnson",
    phone: "555-555-5555",
    createdAt: new Date("2025-03-01T10:00:00Z"),
    updatedAt: new Date("2025-03-02T15:30:00Z"),
    archived: true,
    deleted: false,
    organisationClients: []
  }
];

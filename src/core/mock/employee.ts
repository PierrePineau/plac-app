import { mockOrganisations } from "./organisation";

export const mockEmployes: Employe[] = [
  {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174001",
    email: "employe1@example.com",
    username: "employe1",
    firstname: "John",
    lastname: "Doe",
    roles: ["ROLE_EMPLOYE", "ROLE_USER"],
    organisations: [mockOrganisations[0], mockOrganisations[1]]
  },
  {
    id: 2,
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    email: "employe2@example.com",
    username: "employe2",
    firstname: "Jane",
    lastname: "Smith",
    roles: ["ROLE_MANAGER"],
    organisations: [mockOrganisations[2]]
  },
  {
    id: 3,
    uuid: "123e4567-e89b-12d3-a456-426614174003",
    email: "employe3@example.com",
    username: "employe3",
    firstname: "Alice",
    lastname: "Johnson",
    roles: ["ROLE_EMPLOYE"],
    organisations: []
  },
  {
    id: 4,
    uuid: "123e4567-e89b-12d3-a456-426614174004",
    email: "employe4@example.com",
    username: "employe4",
    firstname: "Bob",
    lastname: "Williams",
    roles: ["ROLE_ADMIN"],
    organisations: [mockOrganisations[1]]
  },
  {
    id: 5,
    uuid: "123e4567-e89b-12d3-a456-426614174005",
    email: "employe5@example.com",
    username: "employe5",
    firstname: "Charlie",
    lastname: "Brown",
    roles: ["ROLE_USER"],
    organisations: []
  }
];

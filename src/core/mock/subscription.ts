import { mockOrganisations } from "./organisation";

export const mockSubscriptions: Subscription[] = [
  {
    id: 1,
    organisationSubscriptions: [mockOrganisations[0], mockOrganisations[1]]
  },
  {
    id: 2,
    organisationSubscriptions: [mockOrganisations[2]]
  },
  {
    id: 3,
    organisationSubscriptions: []
  }
];

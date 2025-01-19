import { mockModules } from "./module";

export const mockPlans: Plan[] = [
  {
    id: 1,
    reference: "PLAN001",
    name: "Basic Plan",
    price: 9.99,
    description: "This is the basic plan.",
    renewalFrequency: "Monthly",
    modules: [mockModules[0], mockModules[1]],
    enable: true
  },
  {
    id: 2,
    reference: "PLAN002",
    name: "Standard Plan",
    price: 19.99,
    description: "This is the standard plan.",
    renewalFrequency: "Quarterly",
    modules: [mockModules[2], mockModules[3]],
    enable: true
  },
  {
    id: 3,
    reference: "PLAN003",
    name: "Premium Plan",
    price: 29.99,
    description: "This is the premium plan.",
    renewalFrequency: "Yearly",
    modules: [mockModules[4]],
    enable: false
  }
];

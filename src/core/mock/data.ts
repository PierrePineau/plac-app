// Data admin mock
export const mockAdmins: Admin[] = [
  {
    id: 1,
    email: "admin1@example.com",
    roles: ["ROLE_ADMIN"],
    password: "hashedPassword1"
  },
  {
    id: 2,
    email: "admin2@example.com",
    roles: ["ROLE_SUPER_ADMIN"],
    password: "hashedPassword2"
  },
  {
    id: 3,
    email: "admin3@example.com",
    roles: ["ROLE_ADMIN", "ROLE_MODERATOR"],
    password: "hashedPassword3"
  },
  {
    id: 4,
    email: "admin4@example.com",
    roles: ["ROLE_ADMIN"],
    password: "hashedPassword4"
  },
  {
    id: 5,
    email: "admin5@example.com",
    roles: ["ROLE_USER"],
    password: "hashedPassword5"
  }
];

// Address mock
export const mockAddresses: Address[] = [
  {
    id: 1,
    uuid: "c1a0fc9b-1f5c-4e25-bd95-c5b4b45061d1",
    country: "France",
    state: "Île-de-France",
    city: "Paris",
    postcode: "75001",
    street: "Rue de Rivoli",
    compl: "Appartement 42",
    createdAt: new Date("2025-01-01T10:00:00Z"),
    updatedAt: new Date("2025-01-02T15:30:00Z")
  },
  {
    id: 2,
    uuid: "a7e3ff85-dfae-4293-9a36-8fa6e2e5c9f1",
    country: "Germany",
    state: "Bavaria",
    city: "Munich",
    postcode: "80331",
    street: "Marienplatz",
    compl: null,
    createdAt: new Date("2025-01-05T12:00:00Z"),
    updatedAt: null
  }
];

// Organisation mock (without circular dependencies initially)
export const mockOrganisations: Organisation[] = [
  {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174001",
    name: "Organisation One",
    createdAt: new Date("2025-01-01T10:00:00Z"),
    updatedAt: new Date("2025-01-02T15:30:00Z"),
    deletedAt: undefined,
    employes: [],
    organisationModules: []
  },
  {
    id: 2,
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    name: "Organisation Two",
    createdAt: new Date("2025-02-01T10:00:00Z"),
    updatedAt: new Date("2025-02-02T15:30:00Z"),
    deletedAt: undefined,
    employes: [],
    organisationModules: []
  },
  {
    id: 3,
    uuid: "123e4567-e89b-12d3-a456-426614174003",
    name: "Organisation Three",
    createdAt: new Date("2025-03-01T10:00:00Z"),
    updatedAt: new Date("2025-03-02T15:30:00Z"),
    deletedAt: undefined,
    employes: [],
    organisationModules: []
  }
];

// Employee mock (without circular dependencies initially)
export const mockEmployes: Employe[] = [
  {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174001",
    email: "employe1@example.com",
    username: "employe1",
    firstname: "John",
    lastname: "Doe",
    roles: ["ROLE_EMPLOYE", "ROLE_USER"],
    organisations: []
  },
  {
    id: 2,
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    email: "employe2@example.com",
    username: "employe2",
    firstname: "Jane",
    lastname: "Smith",
    roles: ["ROLE_MANAGER"],
    organisations: []
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
  }
];

// Add relations between employes and organisations
mockOrganisations[0].employes = [mockEmployes[0]];
mockOrganisations[1].employes = [mockEmployes[1]];
mockEmployes[0].organisations = [mockOrganisations[0]];
mockEmployes[1].organisations = [mockOrganisations[1]];

//client mock
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

// module mock
export const mockModules: Module[] = [
  { id: 1, reference: "MOD001", name: "Module One", enable: true },
  { id: 2, reference: "MOD002", name: "Module Two", enable: false },
  { id: 3, reference: "MOD003", name: "Module Three", enable: true },
  { id: 4, reference: "MOD004", name: "Module Four", enable: false },
  { id: 5, reference: "MOD005", name: "Module Five", enable: true }
];

// plan mock
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

// note mock
export const mockNotes: Note[] = [
  {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174001",
    name: "Note One",
    content: "This is the content of Note One.",
    createdAt: new Date("2025-01-01T10:00:00Z"),
    updatedAt: new Date("2025-01-02T15:30:00Z"),
    projects: []
  },
  {
    id: 2,
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    name: "Note Two",
    content: "This is the content of Note Two.",
    createdAt: new Date("2025-02-01T10:00:00Z"),
    updatedAt: new Date("2025-02-02T15:30:00Z"),
    projects: []
  },
  {
    id: 3,
    uuid: "123e4567-e89b-12d3-a456-426614174003",
    name: "Note Three",
    content: "This is the content of Note Three.",
    createdAt: new Date("2025-03-01T10:00:00Z"),
    updatedAt: new Date("2025-03-02T15:30:00Z"),
    projects: []
  }
];

// project mock
export const mockProjects: Project[] = [
  {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174001",
    reference: "PRJ-001",
    name: "Project One",
    notes: [mockNotes[0], mockNotes[1]],
    files: []
  },
  {
    id: 2,
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    reference: "PRJ-002",
    name: "Project Two",
    notes: [mockNotes[2]],
    files: []
  },
  {
    id: 3,
    uuid: "123e4567-e89b-12d3-a456-426614174003",
    reference: "PRJ-003",
    name: "Project Three",
    notes: [],
    files: []
  }
];

// file mock
export const mockFiles: ProjectFile[] = [
  {
    id: 1,
    url: "https://example.com/file1.pdf",
    name: "File One",
    type: "application/pdf",
    meta: { author: "John Doe", pages: 10 },
    ext: "pdf",
    size: 1.5,
    createdAt: new Date("2025-01-01T10:00:00Z"),
    viewedAt: new Date("2025-01-02T10:00:00Z"),
    updatedAt: new Date("2025-01-02T10:00:00Z"),
    organisations: [],
    projects: [mockProjects[0]]
  },
  {
    id: 2,
    url: "https://example.com/file2.png",
    name: "File Two",
    type: "image/png",
    meta: { resolution: "1920x1080" },
    ext: "png",
    size: 2.3,
    createdAt: new Date("2025-02-01T12:00:00Z"),
    viewedAt: undefined,
    updatedAt: new Date("2025-02-02T12:00:00Z"),
    organisations: [],
    projects: []
  },
  {
    id: 3,
    url: "https://example.com/file3.docx",
    name: "File Three",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    meta: { words: 500 },
    ext: "docx",
    size: 1.2,
    createdAt: new Date("2025-03-01T14:00:00Z"),
    viewedAt: new Date("2025-03-01T16:00:00Z"),
    updatedAt: new Date("2025-03-02T14:00:00Z"),
    organisations: [],
    projects: [mockProjects[1], mockProjects[2]]
  }
];

// Assign back references
mockNotes[0].projects = [mockProjects[0]];
mockNotes[1].projects = [mockProjects[0]];
mockNotes[2].projects = [mockProjects[1]];

mockProjects[0].files = [mockFiles[0]];
mockProjects[1].files = [mockFiles[1]];
mockProjects[2].files = [mockFiles[2]];

//status mock
export const mockStatuses: Status[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 }
];

//subscription mock
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

//user mock
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

// notification mock
export const mockNotifications: Notif[] = [
  {
    id: 1,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: new Date("2024-04-23T18:15:00"),
    read: false,
    sender: mockEmployes[0]
  },
  {
    id: 2,
    message: "Vestibulum at semper nibh. Vestibulum sagittis mi at enim.",
    createdAt: new Date("2025-01-23T18:15:00"),
    read: true,
    sender: mockEmployes[1]
  },
  {
    id: 3,
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    createdAt: new Date("2024-04-23T18:15:00"),
    read: false,
    sender: mockEmployes[0]
  },
  {
    id: 4,
    message: "Vestibulum at semper nibh. Vestibulum sagittis mi at enim.",
    createdAt: new Date("2025-01-23T18:15:00"),
    read: true,
    sender: mockEmployes[1]
  }
];

// yard mock
export const mockYards = [
  {
    id: 1,
    reference: "YRD-001",
    code: 1001,
    name: "Construction Maison A",
    description: "Construction d’une maison moderne avec piscine.",
    address: "123 Rue de la Paix, Paris, France",
    archived: false,
    deleted: false,
    client: "Client A",
    medias: ["image1.jpg", "image2.jpg"],
    files: ["document1.pdf"],
    notes: [mockNotes[0], mockNotes[1]]
  },
  {
    id: 2,
    reference: "YRD-002",
    code: 1002,
    name: "Rénovation Appartement B",
    description: "Rénovation complète d’un appartement.",
    address: "456 Boulevard Haussmann, Paris, France",
    archived: false,
    deleted: false,
    client: "Client B",
    medias: ["image3.jpg", "image4.jpg"],
    files: ["document2.pdf"],
    notes: [mockNotes[2], mockNotes[1]]
  },
  {
    id: 3,
    reference: "YRD-003",
    code: 1003,
    name: "Aménagement Jardin C",
    description: "Création d’un jardin paysager.",
    address: "789 Avenue Victor Hugo, Paris, France",
    archived: true,
    deleted: false,
    client: "Client C",
    medias: ["image5.jpg"],
    files: ["document3.pdf"],
    notes: []
  },
  {
    id: 4,
    reference: "YRD-004",
    code: 1004,
    name: "Extension Maison D",
    description: "Ajout d’une extension à une maison existante.",
    address: "321 Rue Lafayette, Lyon, France",
    archived: false,
    deleted: false,
    client: "Client D",
    medias: [],
    files: ["document4.pdf"],
    notes: []
  },
  {
    id: 5,
    reference: "YRD-005",
    code: 1005,
    name: "Construction Immeuble E",
    description: "Construction d’un immeuble résidentiel.",
    address: "654 Rue Saint-Denis, Lille, France",
    archived: false,
    deleted: false,
    client: "Client E",
    medias: ["image6.jpg", "image7.jpg"],
    files: ["document5.pdf"],
    notes: []
  },
  {
    id: 6,
    reference: "YRD-006",
    code: 1006,
    name: "Réparation Toiture F",
    description: "Réparation et isolation de la toiture.",
    address: "987 Rue République, Marseille, France",
    archived: false,
    deleted: true,
    client: "Client F",
    medias: ["image8.jpg"],
    files: ["document6.pdf"],
    notes: []
  },
  {
    id: 7,
    reference: "YRD-007",
    code: 1007,
    name: "Rénovation Bureau G",
    description: "Modernisation des bureaux.",
    address: "123 Rue Gambetta, Bordeaux, France",
    archived: true,
    deleted: false,
    client: "Client G",
    medias: [],
    files: ["document7.pdf"],
    notes: []
  },
  {
    id: 8,
    reference: "YRD-008",
    code: 1008,
    name: "Aménagement Intérieur H",
    description: "Décoration intérieure d’une villa.",
    address: "456 Rue Voltaire, Nantes, France",
    archived: false,
    deleted: false,
    client: "Client H",
    medias: ["image9.jpg", "image10.jpg"],
    files: ["document8.pdf"],
    notes: []
  },
  {
    id: 9,
    reference: "YRD-009",
    code: 1009,
    name: "Construction Garage I",
    description: "Construction d’un garage pour deux voitures.",
    address: "789 Rue Molière, Toulouse, France",
    archived: false,
    deleted: false,
    client: "Client I",
    medias: [],
    files: ["document9.pdf"],
    notes: []
  },
  {
    id: 10,
    reference: "YRD-010",
    code: 1010,
    name: "Aménagement Combles J",
    description: "Transformation des combles en pièce habitable.",
    address: "321 Rue Zola, Strasbourg, France",
    archived: false,
    deleted: true,
    client: "Client J",
    medias: ["image11.jpg"],
    files: ["document10.pdf"],
    notes: []
  }
];

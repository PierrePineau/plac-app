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

//status mock
export const mockStatuses: Status[] = [
  { id: 1, label: "En pause", color: "#6C757D" },
  { id: 2, label: "Terminé", color: "#28A745" },
  { id: 3, label: "En cours", color: "#007BFF" },
  { id: 4, label: "Annulé", color: "#DC3545" }
];

export const mockMedia: Media[] = [
  { id: 1, label: "travaux fini", image: "/asset/img/yard.jpeg" }
];

//project mock
export const mockProjects: Project[] = [
  {
    id: 1,
    uuid: "123e4567-e89b-12d3-a456-426614174001",
    reference: "PRJ-001",
    name: "Développement Plateforme Web",
    description: "Création d'une plateforme web robuste et évolutive.",
    localisation: "7 Rue Marie-Amélie Cambell, Angers",
    notes: [mockNotes[0], mockNotes[1]],
    organisaton: mockOrganisations[0],
    medias: [mockMedia[0]],
    files: [],
    status: mockStatuses[0],
    createAt: new Date("2025-01-01T10:00:00Z"),
    updateAt: new Date("2025-01-02T15:30:00Z")
  },
  {
    id: 2,
    uuid: "123e4567-e89b-12d3-a456-426614174002",
    reference: "PRJ-002",
    name: "Migration Infrastructure",
    description: "Migration complète vers une nouvelle infrastructure cloud.",
    localisation: "1600 Amphitheatre Parkway, Mountain View, CA",
    notes: [mockNotes[2]],
    medias: [mockMedia[0]],
    organisaton: mockOrganisations[1],
    files: [],
    status: mockStatuses[0],
    createAt: new Date("2025-02-01T10:00:00Z"),
    updateAt: new Date("2025-02-02T15:30:00Z")
  },
  {
    id: 3,
    uuid: "123e4567-e89b-12d3-a456-426614174003",
    reference: "PRJ-003",
    name: "Rénovation Infrastructure",
    localisation: "10 Avenue des Champs-Élysées, Paris",
    description:
      "Amélioration de l'infrastructure existante pour plus de performance.",
    notes: [],
    medias: [mockMedia[0]],
    organisaton: mockOrganisations[2],
    files: [],
    status: mockStatuses[0],
    createAt: new Date("2025-03-01T10:00:00Z"),
    updateAt: new Date("2025-03-02T15:30:00Z")
  },
  {
    id: 4,
    uuid: "123e4567-e89b-12d3-a456-426614174004",
    reference: "PRJ-004",
    name: "Développement Application Mobile",
    description:
      "Conception d'une application mobile native pour Android et iOS.",
    notes: [],
    medias: [mockMedia[0]],
    organisaton: mockOrganisations[0],
    files: [],
    status: mockStatuses[0],
    createAt: new Date("2025-01-05T12:00:00Z"),
    updateAt: new Date("2025-01-10T15:30:00Z"),
    localisation: "10 Avenue des Champs-Élysées, Paris"
  },
  {
    id: 5,
    uuid: "123e4567-e89b-12d3-a456-426614174005",
    reference: "PRJ-005",
    name: "Recherche & Développement IA",
    description:
      "Exploration et prototypage de solutions basées sur l'intelligence artificielle.",
    notes: [mockNotes[0], mockNotes[0], mockNotes[0], mockNotes[0]],
    medias: [
      mockMedia[0],
      mockMedia[0],
      mockMedia[0],
      mockMedia[0],
      mockMedia[0]
    ],
    organisaton: mockOrganisations[1],
    files: [],
    status: mockStatuses[2],
    createAt: new Date("2025-01-15T10:00:00Z"),
    updateAt: new Date("2025-01-20T10:00:00Z"),
    localisation: "10 Avenue des Champs-Élysées, Paris"
  },
  {
    id: 6,
    uuid: "123e4567-e89b-12d3-a456-426614174006",
    reference: "PRJ-006",
    name: "Analyse des Données",
    description:
      "Analyse approfondie des données pour améliorer les prises de décision.",
    notes: [mockNotes[0]],
    medias: [mockMedia[0]],
    organisaton: mockOrganisations[2],
    files: [],
    status: mockStatuses[0],
    createAt: new Date("2025-01-25T10:00:00Z"),
    updateAt: new Date("2025-01-30T10:00:00Z"),
    localisation: "10 Avenue des Champs-Élysées, Paris"
  },
  {
    id: 7,
    uuid: "123e4567-e89b-12d3-a456-426614174007",
    reference: "PRJ-007",
    name: "Déploiement Cloud",
    description:
      "Déploiement d'une infrastructure entièrement cloud pour un client.",
    notes: [],
    medias: [mockMedia[0]],
    organisaton: mockOrganisations[0],
    files: [],
    status: mockStatuses[0],
    createAt: new Date("2025-02-05T10:00:00Z"),
    updateAt: new Date("2025-02-10T10:00:00Z"),
    localisation: "10 Avenue des Champs-Élysées, Paris"
  },
  {
    id: 8,
    uuid: "123e4567-e89b-12d3-a456-426614174008",
    reference: "PRJ-008",
    name: "Refonte Site E-commerce",
    description:
      "Amélioration du design et des performances d'un site e-commerce.",
    notes: [],
    medias: [mockMedia[0]],
    organisaton: mockOrganisations[1],
    files: [],
    status: mockStatuses[2],
    createAt: new Date("2025-02-15T10:00:00Z"),
    updateAt: new Date("2025-02-20T10:00:00Z"),
    localisation: "10 Avenue des Champs-Élysées, Paris"
  },
  {
    id: 9,
    uuid: "123e4567-e89b-12d3-a456-426614174009",
    reference: "PRJ-009",
    name: "Formation Interne",
    description:
      "Organisation de sessions de formation interne pour les employés.",
    notes: [],
    medias: [mockMedia[0]],
    organisaton: mockOrganisations[2],
    files: [],
    status: mockStatuses[1],
    createAt: new Date("2025-02-25T10:00:00Z"),
    updateAt: new Date("2025-03-01T10:00:00Z"),
    localisation: "10 Avenue des Champs-Élysées, Paris"
  },
  {
    id: 10,
    uuid: "123e4567-e89b-12d3-a456-426614174010",
    reference: "PRJ-010",
    name: "Audit Sécurité",
    description: "Audit complet de la sécurité des systèmes informatiques.",
    notes: [],
    medias: [mockMedia[0]],
    organisaton: mockOrganisations[0],
    files: [],
    status: mockStatuses[3],
    createAt: new Date("2025-03-05T10:00:00Z"),
    updateAt: new Date("2025-03-10T10:00:00Z"),
    localisation: "10 Avenue des Champs-Élysées, Paris"
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

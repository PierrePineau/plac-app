export const mockMediaTypes = [
  {
    id: 1,
    reference: "IMAGE",
    name: "Image",
    color: "#FF5733"
  },
  {
    id: 2,
    reference: "VIDEO",
    name: "Video",
    color: "#33C4FF"
  },
  {
    id: 3,
    reference: "DOCUMENT",
    name: "Document",
    color: "#28A745"
  }
];

export const mockMedias = [
  {
    id: 1,
    type: 1,
    type_reference: "IMAGE",
    alt: 1,
    meta: []
  },
  {
    id: 2,
    type: 2,
    type_reference: "VIDEO",
    alt: 2,
    meta: []
  },
  {
    id: 3,
    type: 3,
    type_reference: "DOCUMENT",
    alt: 3,
    meta: []
  },
  {
    id: 4,
    type: 1,
    type_reference: "IMAGE",
    alt: 4,
    meta: []
  }
];

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
    notes: [
      {
        id: 1,
        title: "Réunion de chantier",
        description:
          "Planification des étapes pour la prochaine phase du projet.",
        date: "2025-01-15",
        time: "10:00"
      },
      {
        id: 2,
        title: "Inspection de sécurité",
        description: "Vérification des mesures de sécurité sur le site.",
        date: "2025-01-16",
        time: "14:00"
      }
    ]
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
    notes: [
      {
        id: 3,
        title: "Livraison des matériaux",
        description:
          "Réception et stockage des matériaux pour la construction.",
        date: "2025-01-17",
        time: "08:30"
      }
    ]
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

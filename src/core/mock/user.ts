export const mockUsers = [
  {
    id: 1,
    token: "abc123def456",
    device: 1,
    username: "jdoe",
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@example.com",
    roles: "admin",
    enable: true,
    disabled: false
  },
  {
    id: 2,
    token: "xyz789ghi012",
    device: 2,
    username: "asmith",
    firstname: "Anna",
    lastname: "Smith",
    email: "anna.smith@example.com",
    roles: "user",
    enable: true,
    disabled: false
  },
  {
    id: 3,
    token: "lmn456opq789",
    device: 3,
    username: "bmiller",
    firstname: "Bob",
    lastname: "Miller",
    email: "bob.miller@example.com",
    roles: "moderator",
    enable: false,
    disabled: true
  }
];

export const mockDevices = [
  {
    id: 1,
    data: '{"type": "laptop", "brand": "Dell"}',
    enable: true
  },
  {
    id: 2,
    data: '{"type": "smartphone", "brand": "Apple"}',
    enable: true
  },
  {
    id: 3,
    data: '{"type": "tablet", "brand": "Samsung"}',
    enable: false
  }
];

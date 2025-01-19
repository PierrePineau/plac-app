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

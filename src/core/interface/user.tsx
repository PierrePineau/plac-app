interface User {
  id: number;
  token: string;
  device: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  roles: string;
  enable: boolean;
  disabled: boolean;
}

interface Device {
  id: number;
  data: string;
  enable: boolean;
}

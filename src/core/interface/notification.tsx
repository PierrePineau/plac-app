interface Notif {
  id: number;
  message: string;
  createdAt: Date;
  read: boolean;
  sender: Employe;
}

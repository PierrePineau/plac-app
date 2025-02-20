interface Module {
  id: number;
  reference: string;
  name: string;
  enable: boolean;
  position: number;
  organisations?: Organisation[];
  plans?: Plan[];
}

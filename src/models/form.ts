export interface IFormInput {
  name: string;
  preparation_time: string;
  type: string;
  options: {
    name: string;
    type: string;
    value: any;
    required: boolean;
  }[];
}

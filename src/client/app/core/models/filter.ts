export class Filter {
  public name: string;
  public type: string | number | string[] | number[];
  public values?: string[] | number[];
  public field: string;
}

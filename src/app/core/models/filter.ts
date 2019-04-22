export class FilterType {
  public static readonly String: string = 'string';
  public static readonly Number: string = 'number';
  public static readonly Select: string = 'select';
}

export class Filter {
  public name: string;
  public field: string;
  public type: string;
  public values?: any[];
  public value?: any;
}

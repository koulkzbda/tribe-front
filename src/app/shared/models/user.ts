export class User {
  public readonly id: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public roles: string[];
  public token: string;
  public firstSystemCreated: boolean;

  constructor(
    id: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    roles?: string[],
    token?: string,
    firstSystemCreated?: boolean,
  ) {
    this.id = id;
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.roles = roles || ['ROLE_USER'];
    this.token = token;
    this.firstSystemCreated = firstSystemCreated;
  }
}

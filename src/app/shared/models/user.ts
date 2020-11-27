export class User {
  public firstName: string;
  public lastName: string;
  public email: string;
  public roles: string[];

  constructor(
    firstName?: string,
    lastName?: string,
    email?: string,
    roles?: string[],
  ) {
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.email = email || '';
    this.roles = roles || ['ROLE_USER'];
  }
}

import jwt from 'jsonwebtoken';

export default class Token {

  public readonly adminRole: string = 'ROLE_ADMIN'

  decodeToken(token: string): any {
    return jwt.decode(token);
  }

  getRoleNameByToken(token: string): string | null {
    const data = this.decodeToken(token);
    return data['roles'] ?? null;
  }

  isAdmin(token: string): boolean {
    const roles = this.getRoleNameByToken(token);
    if (!roles) return false;
    const roleArray = roles?.split('|');
    return roleArray.indexOf(this.adminRole) >= 0 ? true : false
  }

}

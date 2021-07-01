export default class Token {
    readonly adminRole: string;
    decodeToken(token: string): any;
    getRoleNameByToken(token: string): string | null;
    isAdmin(token: string): boolean;
}

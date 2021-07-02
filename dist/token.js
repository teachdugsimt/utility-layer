"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor() {
        this.adminRole = 'ROLE_ADMIN';
    }
    decodeToken(token) {
        return jsonwebtoken_1.default.decode(token);
    }
    getRoleNameByToken(token) {
        var _a;
        const data = this.decodeToken(token);
        return (_a = data['roles']) !== null && _a !== void 0 ? _a : null;
    }
    isAdmin(token) {
        const roles = this.getRoleNameByToken(token);
        if (!roles)
            return false;
        const roleArray = roles === null || roles === void 0 ? void 0 : roles.split('|');
        return roleArray.indexOf(this.adminRole) >= 0 ? true : false;
    }
}
exports.default = Token;
//# sourceMappingURL=token.js.map
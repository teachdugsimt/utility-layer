"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const provinces_1 = require("../constants/provinces");
class Address {
    constructor() {
        this.findProvince = (address) => {
            if (!address)
                return null;
            const list = [...provinces_1.provinceListTh, ...provinces_1.provinceListEn];
            const province = list.find((l) => address.includes(l.label));
            return (province === null || province === void 0 ? void 0 : province.label) || address;
        };
    }
}
exports.default = Address;
//# sourceMappingURL=address.js.map
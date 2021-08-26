import { provinceListEn, provinceListTh } from 'constants/provinces';
import jwt from 'jsonwebtoken';

export default class Address {
  findProvince = (address?: string | null) => {
    if (!address) return null;
    const list = [...provinceListTh, ...provinceListEn];
    const province = list.find((l) => address.includes(l.label));
    return province?.label || address;
  };
}

export interface Group {
  groupId: number;
  groupName: string;
  groupLocation: string;
  groupDesc: string;
}

export interface Member {
  userId: number;
  fullname: string;
  email: string;
}

export interface Scout {
  groupId: number;
  userId: number;
  fullname: string;
  email: string;
}

export interface Inventory {
  productId: number;
  name: string;
  cost: number;
  weight: number;
  salePrice: number;
  desc: string;
  quantity: number;
  groupId: number;
}

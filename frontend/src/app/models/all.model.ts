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

export interface Notification {
  name: string,
  message: string,
  receiverUserId: number,
  groupId: number,
  issueDate: Date,
  expirationDate: Date
}

export interface Sale {
  saleId: number;
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  saleDate: string;
}

export interface detailedSale {
  groupId: string;
  scoutName: string;
  productName: string;
  quantity: number;
  price: number;
  saleDate: Sale;
}

export interface Event {
  eventId: number;
  evnTitle: string;
  evnStartDate: Date;
  evnEndDate: Date;
  evnLoc: string;
  evnDesc: string;
}

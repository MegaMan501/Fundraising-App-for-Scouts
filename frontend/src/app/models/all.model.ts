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


interface Member {
  id: number;
  avatar: string;
}

export interface Team {
  id: number;
  name: string;
  members: Member[];
  createdAt: string;
  isProgress: boolean;
  dday: string;
}

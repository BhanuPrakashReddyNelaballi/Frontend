export interface Notification {
    id: number;
    member:{
        memberId: number;
    };
    message: string;
    date: string;  // ISO date
    read: boolean;
  }
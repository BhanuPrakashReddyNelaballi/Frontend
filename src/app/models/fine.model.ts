export interface Fine {
  fineID: number;
  amount: number;
  status: 'PENDING' | 'PAID';
  member:{
    memberId:number;
  };
}
export interface BorrowingTransaction {
  transactionID: number;
  borrowDate: string;
  returnDate?: string;
  status: 'BORROWED' | 'RETURNED';

  book: {
    bookId: number;
    title?: string;
  };
  member:{
    memberId: number;
  };
}

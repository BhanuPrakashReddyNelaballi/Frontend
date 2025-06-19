export interface BorrowingDto {
    transactionId: number;
    bookId: number;
    memberId: number;
    borrowDate: string;    // ISO date string
    returnDate?: string;   // ISO date string or undefined
    status: 'BORROWED' | 'RETURNED' ;
  }
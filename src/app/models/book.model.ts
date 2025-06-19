// src/app/models/book.model.ts
export interface Book {
  bookId: number;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  yearPublished: number;
  availableCopies: number;
}

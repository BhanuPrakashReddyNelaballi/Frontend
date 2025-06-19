// src/app/components/admin-manage-books/admin-manage-books.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-manage-books',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './manage-books.component.html',
  styleUrls: ['./manage-books.component.css'],
})
export class ManageBooksComponent implements OnInit {
  sidebarOpen = true;
  adminName = '';

  books: Book[] = [];
  filtered: Book[] = [];
  searchField: 'all' | 'bookId' | 'title' | 'author' | 'genre' | 'yearPublished' = 'all';
  searchTerm = '';

  showAdd = false;
  newBook: Partial<Book> = {
    title: '',
    author: '',
    genre: '',
    isbn: '',
    yearPublished: new Date().getFullYear(),
    availableCopies: 1,
  };

  editingId: number | null = null;
  editAvailable = 0;

  constructor(private bookSvc: BookService, private router: Router,private authService: AuthService) {}

  ngOnInit() {
    this.adminName = localStorage.getItem('userName') || 'Admin';
    this.loadBooks();
  }

  loadBooks() {
    this.bookSvc.getBooks().subscribe({
      next: (list) => {
        this.books = list;
        this.applyFilter();
      },
      error: (e) => console.error(e),
    });
  }

  applyFilter() {
    const t = this.searchTerm.toLowerCase();
    this.filtered = this.books.filter(b => {
      switch (this.searchField) {
        case 'bookId': return b.bookId.toString().includes(t);
        case 'title': return b.title.toLowerCase().includes(t);
        case 'author': return b.author.toLowerCase().includes(t);
        case 'genre': return b.genre.toLowerCase().includes(t);
        case 'yearPublished': return b.yearPublished.toString().includes(t);
        default:
          return b.bookId.toString().includes(t)
            || b.title.toLowerCase().includes(t)
            || b.author.toLowerCase().includes(t)
            || b.genre.toLowerCase().includes(t)
            || b.yearPublished.toString().includes(t);
      }
    });
  }

  saveNew() {
    this.bookSvc.addBook(this.newBook).subscribe({
      next: () => {
        this.showAdd = false;
        this.newBook = {
          title: '',
          author: '',
          genre: '',
          isbn: '',
          yearPublished: new Date().getFullYear(),
          availableCopies: 1,
        };
        this.loadBooks();
      },
      error: (e) => console.error(e),
    });
  }

  startEdit(b: Book) {
    this.editingId = b.bookId;
    this.editAvailable = b.availableCopies;
  }
  cancelEdit() {
    this.editingId = null;
  }
  updateCopies(id: number) {
    this.bookSvc.updateCopies(id, this.editAvailable).subscribe({
      next: () => {
        this.cancelEdit();
        this.loadBooks();
      },
      error: (e) => console.error(e),
    });
  }

  deleteBook(b: Book) {
    if (confirm(`Delete book “${b.title}”?`)) {
      this.bookSvc.deleteBook(b.bookId).subscribe({
        next: () => this.loadBooks(),
        error: (e) => console.error(e),
      });
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  navigate(path: string): void {
    this.router.navigateByUrl(path);
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.clearSession();
        this.router.navigate(['/login']);
      },
      error: () => {
        this.authService.clearSession();
        this.router.navigate(['/login']);
      }
    });
  }
}

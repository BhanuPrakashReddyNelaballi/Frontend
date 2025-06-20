import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';
import { TransactionsService } from '../../services/transactions.service';
import { Book } from '../../models/book.model';
import { AuthService } from '../../services/auth.service';
import { BorrowBook } from '../../models/borrow-book.model';
 
@Component({
  selector: 'app-member-browse',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search-browse.component.html',
  styleUrls: ['./search-browse.component.css']
})
export class SearchBrowseComponent implements OnInit {
  books: Book[] = [];
  filtered: Book[] = [];
  searchField: 'all' | 'title' | 'author' | 'genre' = 'all';
  searchTerm = '';
  sidebarOpen = true;
  memberName = '';
  memberId!: number;
  constructor(
    private bookSvc: BookService,
    private txnSvc: TransactionsService,
    private router: Router,
    private authService: AuthService
  ) {}
 
  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: profile => {
        this.memberName = profile?.name || 'Guest';
        this.memberId = profile.id;
        this.loadBooks();
      },
      error: err => console.error('Failed to load profile:', err)
    });
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
 
  applyFilter(): void {
    const t = this.searchTerm.toLowerCase();
    this.filtered = this.books.filter(b => {
      switch(this.searchField) {
        case 'title': return b.title.toLowerCase().includes(t);
        case 'author': return b.author.toLowerCase().includes(t);
        case 'genre': return b.genre.toLowerCase().includes(t);
        default:
          return b.title.toLowerCase().includes(t)
            || b.author.toLowerCase().includes(t)
            || b.genre.toLowerCase().includes(t);
      }
    });
  }
 
  borrow(book: Book): void {
    const dto={memberId:this.memberId, bookId:book.bookId}
    this.txnSvc.borrowBook(dto)
      .subscribe({
        next: () => {
          alert(`Borrowed "${book.title}" successfully!`);
          this.loadBooks();
        },
        error: err => alert('Borrow failed: ' + err.error || err.message)
      });
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
 
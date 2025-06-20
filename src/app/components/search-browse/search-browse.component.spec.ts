import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBrowseComponent } from './search-browse.component';

describe('SearchBrowseComponent', () => {
  let component: SearchBrowseComponent;
  let fixture: ComponentFixture<SearchBrowseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBrowseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBrowseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

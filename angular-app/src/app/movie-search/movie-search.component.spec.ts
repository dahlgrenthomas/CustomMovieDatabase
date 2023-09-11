import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchComponent } from './movie-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MovieSearchComponent', () => {
  let component: MovieSearchComponent;
  let fixture: ComponentFixture<MovieSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieSearchComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule]

    });
    fixture = TestBed.createComponent(MovieSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

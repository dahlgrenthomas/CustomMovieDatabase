import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInfoComponent } from './movie-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';

describe('MovieInfoComponent', () => {
  let component: MovieInfoComponent;
  let fixture: ComponentFixture<MovieInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatCardModule],
      declarations: [MovieInfoComponent]
    });
    fixture = TestBed.createComponent(MovieInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

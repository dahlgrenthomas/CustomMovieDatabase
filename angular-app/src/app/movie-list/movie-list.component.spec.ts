import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Movie } from '../movie.model';

describe('MovieListComponent', () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MovieListComponent]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(MovieListComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openMovie Should navigate to the movie pages when passed an ID', () => {
    const id = 1;
    spyOn(router, 'navigate');

    component.openMovie(id);
    fixture.detectChanges();
    
    expect(router.navigate).toHaveBeenCalledWith(['movies/' + id]);
  });
  it('removeFromUserList should call removeFromList and then call getUserMovieListIds', () => {
    const id = 1;

    component.removeFromUserList(id);
    const req = httpTestingController.expectOne('http://localhost:8080/api/movies/featured');

    const req2 = httpTestingController.expectOne('http://localhost:8080/api/user/removefromlist/1');

    // Assert that the request is a GET.
    expect(req2.request.method).toEqual('DELETE');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req2.flush('');

    const req3 = httpTestingController.expectOne('http://localhost:8080/api/user/usermovies');

    expect(req3.request.method).toEqual('GET');

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
  it('addToUserList should call addToList and then call getUserMovieListIds', () => {
    const id = 1;

    component.addToUserList(id);
    const req = httpTestingController.expectOne('http://localhost:8080/api/movies/featured');

    const req2 = httpTestingController.expectOne('http://localhost:8080/api/user/movieadd/1');

    // Assert that the request is a GET.
    expect(req2.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req2.flush('');

    const req3 = httpTestingController.expectOne('http://localhost:8080/api/user/usermovies');

    expect(req3.request.method).toEqual('GET');

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('getMovieSearch should take in params and then return a set of movies', () => {
    const testData: Movie[] = [{ title: 'Test Data', overview: 'test', id: 2, poster: 'poster' }, { title: 'Test 2', overview: 'test2', id: 1, poster: 'poster2' }];

    const reqNgOnInit = httpTestingController.expectOne('http://localhost:8080/api/movies/featured');
    component.getMovies();

    const req = httpTestingController.expectOne('http://localhost:8080/api/movies/featured');


    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);

    expect(component.movies).toEqual(testData);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
});

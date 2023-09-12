import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSearchComponent } from './movie-search.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of } from 'rxjs';
import { Movie } from '../movie.model';

describe('MovieSearchComponent', () => {
  let component: MovieSearchComponent;
  let fixture: ComponentFixture<MovieSearchComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieSearchComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule],
      providers: [
        HttpClient,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({
              "movie": 'movie',
              "genre": 'action',
              "year": '2000'
            })
          }
        }
      ],

    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(MovieSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should get params from the url in NgOnInit and call getMovieSearch', () => {


    const req = httpTestingController.expectOne('http://localhost:8080/api/movies/moviesearch?movie=movie&year=2000&genre=action');

    expect(req.request.method).toEqual('GET');

    //Expect ng.OnInit to detect the change of queryParams
    route.queryParams = of({movie: 'testing', genre: 'drama', year: '2007' });
    component.ngOnInit();

    const req2 = httpTestingController.expectOne('http://localhost:8080/api/movies/moviesearch?movie=testing&year=2007&genre=drama');

    // Assert that the request is a GET.
    expect(req2.request.method).toEqual('GET');

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('onSubmit should navigate to a URL based on the form values', () => {
    let formBuilder = new FormBuilder();

    component.searchForm = formBuilder.group({
      title: 'test',
      year: '2005',
      genre: 'thriller'
    });
    spyOn(router, 'navigate');

    component.onSubmit();
    fixture.detectChanges();
    // !! change expectation !!
    expect(router.navigate).toHaveBeenCalledWith(['search'], { queryParams: { "movie": 'test', "year": '2005', "genre":  'thriller'} });


  });

  it('removeFromUserList should call removeFromList and then call getUserMovieListIds', () => {
    const id = 1;

    component.removeFromUserList(id);
    const req = httpTestingController.expectOne('http://localhost:8080/api/movies/moviesearch?movie=movie&year=2000&genre=action');

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
    const req = httpTestingController.expectOne('http://localhost:8080/api/movies/moviesearch?movie=movie&year=2000&genre=action');

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

  it('openMovie Should navigate to the movie pages when passed an ID', () => {
    const id = 1;
    spyOn(router, 'navigate');

    component.openMovie(id);
    fixture.detectChanges();
    // !! change expectation !!
    expect(router.navigate).toHaveBeenCalledWith(['movies/' + id]);
  });

  it('getMovieSearch should take in params and then return a set of movies', () => {
    const testData: Movie[] = [{ title: 'Test Data', overview: 'test', id: 2, poster: 'poster' }, { title: 'Test 2', overview: 'test2', id: 1, poster: 'poster2' }];
    const testParams = new HttpParams()
      .set('movie', 'test2')
      .set('year', '2002')
      .set("genre", "thriller");

    component.getMovieSearch(testParams);
    const reqNgOnInit = httpTestingController.expectOne('http://localhost:8080/api/movies/moviesearch?movie=movie&year=2000&genre=action');

    const req = httpTestingController.expectOne('http://localhost:8080/api/movies/moviesearch?movie=test2&year=2002&genre=thriller');


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

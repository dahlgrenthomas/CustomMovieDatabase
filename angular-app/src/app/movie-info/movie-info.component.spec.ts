import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieInfoComponent } from './movie-info.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../movie.model';

describe('MovieInfoComponent', () => {
  let component: MovieInfoComponent;
  let fixture: ComponentFixture<MovieInfoComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, MatCardModule],
      declarations: [MovieInfoComponent],
      providers: [
        HttpClient,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              "id": 5,
            })
          }
        }
      ]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(MovieInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should get the id param from the url in NgOnInit and call getMovie', () => {


    const req = httpTestingController.expectOne('http://localhost:8080/api/movies/5');

    expect(req.request.method).toEqual('GET');

    //Expect ng.OnInit to detect the change of queryParams
    route.params = of({ "id": 4});
    component.ngOnInit();

    const req2 = httpTestingController.expectOne('http://localhost:8080/api/movies/4');

    // Assert that the request is a GET.
    expect(req2.request.method).toEqual('GET');

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
  it('removeFromUserList should call removeFromList and then call getUserMovieListIds', () => {
    const id = 1;

    component.removeFromUserList(id);
    const req = httpTestingController.expectOne('http://localhost:8080/api/movies/5');

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
    const req = httpTestingController.expectOne('http://localhost:8080/api/movies/5');

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

  it('getMovie should return call for a movie by its ID and then set movie to be equal to the returned movie', () => {
    const testData: Movie = { title: 'Test Data', overview: 'test', id: 2, poster: 'poster' };
    const id = 5;

    const reqNgOnInit = httpTestingController.expectOne('http://localhost:8080/api/movies/5');

    component.getMovie();


    const req = httpTestingController.expectOne('http://localhost:8080/api/movies/5');


    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);

    expect(component.movie).toEqual(testData);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
});

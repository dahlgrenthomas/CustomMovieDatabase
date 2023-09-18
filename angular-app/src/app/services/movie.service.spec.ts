import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Data } from '@angular/router';
import { Movie } from '../movie.model';


describe('MovieService', () => {
  let service: MovieService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const testData: Movie[] = [{ title: 'Test Data', overview: 'test', id: 2, poster: 'poster' }, { title: 'Test 2', overview: 'test2', id: 1, poster: 'poster2' }];
  const testMovie2: Movie = {title: 'Test Data', overview: 'test', id: 2, poster: 'poster'};
  const testMovie1: Movie = { title: 'Test 2', overview: 'test2', id: 1, poster: 'poster2' };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Should return a movie array when getMovieList is called', () => {
    //const testData: Movie[] = [{ title: 'Test Data', overview: 'test', id: 2, poster: 'poster' }, { title: 'Test 2', overview: 'test2', id: 1, poster: 'poster2' }];

    service.getMovieList().subscribe((res) => {
      expect(res).toEqual(testData);
    });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne('http://localhost:8080/api/movies/featured');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
  it('should call getMovieById and return the appropriate Movie', () => {
    // Arrange
    const id = 1;

    // Act
    service.getMovieById(id).subscribe((data) => {

      // Assert
      expect(data).toEqual(testMovie1);
      expect(data).not.toEqual(testMovie2);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/movies/1');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    req.flush(testMovie1);

    httpTestingController.verify();
  });

  it('should call getMovieSearch and return the appropriate Movie', () => {
    // Arrange
    let myParams = new HttpParams().set("movie", "test");

    // Act
    service.getMovieBySearch(myParams).subscribe((data) => {


      // Assert
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/movies/moviesearch?movie=test');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    req.flush(testData);

    httpTestingController.verify();
  });
});

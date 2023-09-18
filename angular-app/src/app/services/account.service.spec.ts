import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../movie.model';

describe('AccountService', () => {
  let service: AccountService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should change isLoggedIn to true and call getUserMovieListIds when response is true', () => {
    const response = true;
    const testData: Movie[] = [{ title: 'Test Data', overview: 'test', id: 2, poster: 'poster' }, { title: 'Test 2', overview: 'test2', id: 1, poster: 'poster2' }];

    service.getLoggedInStatus();

    const req = httpTestingController.expectOne('http://localhost:8080/api/user/loggedstatus');


    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(response);

    const req2 = httpTestingController.expectOne('http://localhost:8080/api/user/usermovies');

    expect(req2.request.method).toEqual('GET');


    expect(service.isLoggedIn).toBeTruthy();

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('Should change isLoggedIn to false if getLoggedStatus gets a false response', () => {
    const response = false;

    service.getLoggedInStatus();

    const req = httpTestingController.expectOne('http://localhost:8080/api/user/loggedstatus');


    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(response);

    expect(service.isLoggedIn).toBeFalsy();

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('Should return a users movie id list when getUserMovieListIds is called and add them to the userMovieIds array', () => {
    const testNumArray: number[] = [1,2,3];

    service.getUserMovieListIds();

    const req = httpTestingController.expectOne('http://localhost:8080/api/user/usermovies');


    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testNumArray);

    expect(service.userMovieIds).toEqual(testNumArray);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
});

import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Movie } from '../movie.model';

describe('UserService', () => {
  let service: UserService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call addTolist', () => {
    // Arrange
    //let myParams = new HttpParams().set("movie", "test");
    const id = 1;

    // Act
    service.addToList(id).subscribe((data) => {

    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/user/movieadd/1');

    expect(req.request.method).toEqual('GET');


    httpTestingController.verify();
  });

  it('Should return a movie array when getUserMOvieList is called', () => {
    const testData: Movie[] = [{ title: 'Test Data', overview: 'test', id: 2, poster: 'poster' }, { title: 'Test 2', overview: 'test2', id: 1, poster: 'poster2' }];

    service.getUserMovies().subscribe((res) => {
      expect(res).toEqual(testData);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/user/userlist');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req.flush(testData);

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });

  it('should call removeFromList', () => {
    // Arrange
    //let myParams = new HttpParams().set("movie", "test");
    const id = 1;

    // Act
    service.removeFromList(id).subscribe((data) => {

    });
    // Assert that the request is a GET.


    const req = httpTestingController.expectOne('http://localhost:8080/api/user/removefromlist/' + id);

    expect(req.request.method).toEqual('DELETE');


    httpTestingController.verify();
  });


});

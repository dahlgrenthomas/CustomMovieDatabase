import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

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
  // it('should call getMovieSearch and return the appropriate Movie', () => {
  //   // Arrange
  //   let myParams = new HttpParams().set("movie", "test");

  //   // Act
  //   service.getMovieBySearch(myParams).subscribe((data) => {


  //     // Assert
  //     expect(data).toEqual(testData);
  //   });

  //   const req = httpTestingController.expectOne('http://localhost:8080/api/movies/moviesearch?movie=test');

  //   req.flush(testData);

  //   httpTestingController.verify();
  // });


});

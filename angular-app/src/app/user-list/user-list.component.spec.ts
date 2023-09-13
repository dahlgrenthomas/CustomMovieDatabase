import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../movie.model';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let router: Router;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserListComponent]
    });
    router = TestBed.inject(Router);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(UserListComponent);
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
  it('removeFromUserList should call removeFromList and then call getUserMovieListIds and getUserMovies', () => {
    const id = 1;

    const req6 = httpTestingController.expectOne('http://localhost:8080/api/user/userlist');
    const req4 = httpTestingController.expectOne('http://localhost:8080/api/user/loggedstatus');
    component.removeFromUserList(id);

    const req2 = httpTestingController.expectOne('http://localhost:8080/api/user/removefromlist/1');

    // Assert that the request is a GET.
    expect(req2.request.method).toEqual('DELETE');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    req2.flush('');

    const req3 = httpTestingController.expectOne('http://localhost:8080/api/user/usermovies');

    const req5 = httpTestingController.expectOne('http://localhost:8080/api/user/userlist');


    expect(req3.request.method).toEqual('GET');
    expect(req5.request.method).toEqual('GET');

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
  it('getUserMovies should call for all the users movies and then set movies to equal them', () => {
    const testData: Movie[] = [{ title: 'Test Data', overview: 'test', id: 2, poster: 'poster' }, { title: 'Test 2', overview: 'test2', id: 1, poster: 'poster2' }];

    const req6 = httpTestingController.expectOne('http://localhost:8080/api/user/userlist');
    const req4 = httpTestingController.expectOne('http://localhost:8080/api/user/loggedstatus');

    component.getUserMovies();

    const req = httpTestingController.expectOne('http://localhost:8080/api/user/userlist');


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

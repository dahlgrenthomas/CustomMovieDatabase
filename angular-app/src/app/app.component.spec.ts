import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatIconModule, RouterTestingModule],
      declarations: [AppComponent]
    });
    router = TestBed.inject(Router);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-app');
  });
  it('NgOnInit should call for the logged status', () => {

    const req = httpTestingController.expectOne('http://localhost:8080/api/user/loggedstatus');

    expect(req.request.method).toEqual('GET');

    component.ngOnInit();

    const req2 = httpTestingController.expectOne('http://localhost:8080/api/user/loggedstatus');

    // Assert that the request is a GET.
    expect(req2.request.method).toEqual('GET');

    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  });
  it('getMovie should navigate to a URL based on the input', () => {
    spyOn(router, 'navigate');
    const movie = 'movie test';

    component.getMovie(movie);
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['search'], { queryParams: { "movie": 'movie test'} });


  });
  it('getMovie should do nothing if no string input', () => {
    spyOn(router, 'navigate');
    const movie = '';

    component.getMovie(movie);
    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalledWith(['search'], { queryParams: { "movie": '' } });

  });
});

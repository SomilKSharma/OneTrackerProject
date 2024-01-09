import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should log in successfully', () => {
    const mockResponse = { token: 'mockToken' };
    const username = 'testUser';
    const password = 'testPassword';

    authService.login(username, password).subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(authService.getAuthToken()).toBe('mockToken');
    });

    const req = httpTestingController.expectOne(
      `${authService['apiUrl']}/login`
    );
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle login error', () => {
    const username = 'testUser';
    const password = 'testPassword';

    authService.login(username, password).subscribe(
      () => {},
      (error) => {
        expect(error).toBeTruthy();
      }
    );

    const req = httpTestingController.expectOne(
      `${authService['apiUrl']}/login`
    );
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('Unauthorized'), { status: 401 });
  });
});

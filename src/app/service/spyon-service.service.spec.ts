import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SpyonServiceService } from './spyon-service.service';

describe('SpyonServiceService', () => {
  let service: SpyonServiceService;
  const logger = jasmine.createSpy('log');
  const status = jasmine.createSpyObj('service', ['name', 'age', 'email']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(SpyonServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar uma lista de usuários', () => {
    const response = [
      {
        id: 1,
        name: 'Michel 1',
        email: 'mich1@dev.com',
        age: 21,
      },
      {
        id: 2,
        name: 'Michel 2',
        email: 'mich2@dev.com',
        age: 21,
      },
      {
        id: 3,
        name: 'Michel 3',
        email: 'mich3@dev.com',
        age: 21,
      },
    ];

    spyOn(service, 'getUsers').and.returnValue(of(response));

    service.getUsers().subscribe((expectResponse) => {
      expect(expectResponse).toEqual(response);
    });
  });

  it('Deve criar método com jasmine.createSpy', () => {
    logger('Loguei');

    expect(logger).toHaveBeenCalledTimes(1);
    expect(logger).toHaveBeenCalledWith('Loguei');
  });

  it('Deve criar métodos com jasmine.createSpyObj', () => {
    status.name('Michel');
    status.email('mich@dev.com');
    status.age(21);

    expect(status.name).toHaveBeenCalledTimes(1);
    expect(status.name).toHaveBeenCalledWith('Michel');
    expect(status.email).toHaveBeenCalledTimes(1);
    expect(status.email).toHaveBeenCalledWith('mich@dev.com');
    expect(status.age).toHaveBeenCalledTimes(1);
    expect(status.age).toHaveBeenCalledWith(21);
  });
});

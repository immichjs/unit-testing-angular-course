import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MyServiceService } from './my-service.service';

class MyServiceMock extends MyServiceService {
  response = [
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

  override getUsers() {
    return of(this.response);
  }
}

describe('MyServiceService', () => {
  let service: MyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: MyServiceService,
          useClass: MyServiceMock,
        },
      ],
    });
    service = TestBed.inject(MyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve realizar chaada http', () => {
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

    service.getUsers().subscribe((expectResponse) => {
      expect(expectResponse).toEqual(response);
    });
  });
});

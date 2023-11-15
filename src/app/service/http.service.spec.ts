import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpTestingController: HttpTestingController;
  let url: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
    url = 'http://localhost:3000';
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Deve realizar chamada GET por id', () => {
    const id = 3;
    const response = { name: 'Michel', age: 21, email: 'mich@dev.com' };

    service.getUsersById(id).subscribe((expectResponse) => {
      expect(expectResponse).toBe(response);
    });

    const request = httpTestingController.expectOne(`${url}/users/${id}`);

    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(`${url}/users/${id}`);
    request.flush(response);
  });

  it('Deve realizar chamada GET para obter usuários', () => {
    const response = [
      {
        name: 'Danilo 2',
        email: 'danilo@gmail.com',
        age: '30',
        id: 1,
      },
      {
        id: 3,
        name: 'Joao',
        email: 'joao@gmail.com',
        age: 22,
      },
      {
        id: 4,
        name: 'Joao',
        email: 'joao@gmail.com',
        age: 22,
      },
      {
        id: 0.8230837961873159,
        name: 'Danilo ',
        email: 'danilo@gmail.com',
        age: '30',
      },
    ];

    service.getUsers().subscribe();
    const request = httpTestingController.expectOne(`${url}/users`);

    service.getUsers().subscribe((expectResponse) => {
      expect(expectResponse).toEqual(response);
    });

    request.flush(response);
    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(`${url}/users`);
  });

  it('Deve gerar um erro ao obter usuários', () => {
    service.getUsers().subscribe({
      error: (error) => expect(error.status).toBe(500),
    });

    const request = httpTestingController.expectOne(`${url}/users`);

    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(`${url}/users`);

    request.flush(500, {
      status: 500,
      statusText: 'Erro de comunicação com o servidor.',
    });
  });

  it('Deve fazer requesição POST pra cadastrar usuário', () => {
    const createdUser = {
      id: 0.2078191893673187,
      name: 'Michel',
      email: 'fr.mich17@gmail.com',
      age: '21',
    };
    const response = { ...createdUser };

    service.postUser(createdUser).subscribe((expectResponse) => {
      expect(expectResponse).toEqual(response);
    });

    const request = httpTestingController.expectOne(`${url}/users`);

    expect(request.request.method).toBe('POST');
    request.flush(response);
  });

  it('Deve fazer requesição PUT pra editar usuário', () => {
    const id = 1;
    const user = {
      id: 1,
      name: 'Michel',
      email: 'fr.mich17@gmail.com',
      age: '21',
    };
    const response = { ...user };

    service.putUser(id, user).subscribe((expectResponse) => {
      expect(expectResponse).toEqual(response);
    });

    const request = httpTestingController.expectOne(`${url}/users/${id}`);

    expect(request.request.method).toBe('PUT');
    expect(request.request.url).toBe(`${url}/users/${id}`);
    request.flush(response);
  });

  it('Deve fazer requesição PUT pra editar usuário', () => {
    const id = 1;
    const response = {};

    service.deleteUser(id).subscribe((expectResponse) => {
      expect(expectResponse).toEqual(response);
    });

    const request = httpTestingController.expectOne(`${url}/users/${id}`);

    expect(request.request.method).toBe('DELETE');
    expect(request.request.url).toBe(`${url}/users/${id}`);
    request.flush(response);
  });

  it('Deve fazer requesição PUT pra editar usuário', () => {
    const jwtToken = 'o1yu2wgebaskdjbnaasghasdiubasvdasdiv';
    service.getUserWithHeaders().subscribe();

    const request = httpTestingController.expectOne(`${url}/users`);

    service.getUserWithHeaders().subscribe((expectResponse) => {
      expect(expectResponse).toEqual(jwtToken);
    });

    expect(request.request.method).toBe('GET');
    expect(request.request.url).toBe(`${url}/users`);
    expect(request.request.headers.has('content-type')).toBeTruthy();
    expect(request.request.headers.has('Authorization')).toBeTruthy();
  });
});

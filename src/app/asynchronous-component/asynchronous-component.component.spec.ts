import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { AsynchronousComponentComponent } from './asynchronous-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { By } from '@angular/platform-browser';

describe('AsynchronousComponentComponent', () => {
  let component: AsynchronousComponentComponent;
  let fixture: ComponentFixture<AsynchronousComponentComponent>;
  let http: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [AsynchronousComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AsynchronousComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    http = TestBed.inject(HttpService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve fazer request para obter lista de usuários', () => {
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
      {
        id: 0.2078191893673187,
        name: 'Michel',
        email: 'fr.mich17@gmail.com',
        age: '21',
      },
    ];

    spyOn(http, 'getUsers').and.returnValue(of(response));

    component.getUsers();

    expect(component.data).toEqual(response);
  });

  it('Deve fazer request para obter lista de usuários com promise', async () => {
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
      {
        id: 0.2078191893673187,
        name: 'Michel',
        email: 'fr.mich17@gmail.com',
        age: '21',
      },
    ];

    spyOn(http, 'getUsersWithPromise').and.returnValue(
      Promise.resolve(response)
    );

    await component.getUsersWithPromise();

    expect(component.dataPromise).toEqual(response);
  });

  it('Deve logar usuário', (done: DoneFn) => {
    const getNativeElement = (cssClass: string) =>
      fixture.debugElement.query(By.css(cssClass)).nativeElement;
    const loggedOut = getNativeElement('.logged-out');

    let spy = spyOn(http, 'isAuthenticated').and.returnValue(
      Promise.resolve(true)
    );

    component.isAuthenticaded();

    spy.calls.mostRecent().returnValue.then(() => {
      fixture.detectChanges();
      const logged = getNativeElement('.logged');

      expect(logged.textContent).toBe('Logado');
      done();
    });

    expect(loggedOut.textContent).toBe('Deslogado');
  });

  it('Deve logar usuário com WhenStable', async () => {
    debugger;
    const getNativeElement = (cssClass: string) =>
      fixture.debugElement.query(By.css(cssClass)).nativeElement;
    const loggedOut = getNativeElement('.logged-out');

    expect(loggedOut.textContent).toBe('Deslogado');

    spyOn(http, 'isAuthenticated').and.returnValue(Promise.resolve(true));

    component.isAuthenticaded();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const logged = getNativeElement('.logged');

      expect(logged.textContent).toBe('Logado');
    });
  });

  it('Deve setar nome', fakeAsync(() => {
    component.defineValue();

    tick(500);

    expect(component.name).toBe('Jessica');
  }));
});

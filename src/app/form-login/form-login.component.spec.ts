import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpService } from '../service/http.service';

import { FormLoginComponent } from './form-login.component';
import { By } from '@angular/platform-browser';

describe('FormLoginComponent', () => {
  let component: FormLoginComponent;
  let fixture: ComponentFixture<FormLoginComponent>;
  let service: HttpService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [FormLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormLoginComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HttpService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve retornar que formulário é inválido', () => {
    const result = component.isValidForm();

    expect(result).toBeFalse();
  });

  it('Deve retornar que formulário é valido', () => {
    component.form.controls['email'].setValue('mich@dev.com');
    component.form.controls['password'].setValue('123');

    const result = component.isValidForm();

    expect(result).toBeTrue();
  });

  it('Deve estar desabilitado quando o formulário for inválido', () => {
    const button =
      fixture.debugElement.nativeElement.querySelector('.btn-login');

    expect(button.disabled).toBeTrue();
  });

  it('Deve retornar que formulário é valido', () => {
    component.form.controls['email'].setValue('mich@dev.com');
    component.form.controls['password'].setValue('123');

    const result = component.isValidForm();

    const button =
      fixture.debugElement.nativeElement.querySelector('.btn-login');

    fixture.detectChanges();

    expect(result).toBeTrue();
    expect(button.disabled).toBeFalse();
  });

  it('Deve retornar o valor de um controle de formulário', () => {
    component.form = new FormGroup({
      email: new FormControl('mich@dev.com'),
      password: new FormControl('123'),
    });

    expect(component.getValueControl(component.form, 'email')).toEqual(
      'mich@dev.com'
    );
    expect(component.getValueControl(component.form, 'password')).toEqual(
      '123'
    );
  });

  it('Deve criar payload para enviar para API', () => {
    const payload = {
      email: 'mich@dev.com',
      password: '123',
    };

    expect(component.createPayload('mich@dev.com', '123')).toEqual(payload);
  });

  it('Deve realizar login', () => {
    component.form = new FormGroup({
      email: new FormControl('mich@dev.com'),
      password: new FormControl('123'),
    });

    let response = {
      email: 'mich@dev.com',
      password: '123',
      id: 1,
    };

    let spied = spyOn(service, 'login').and.returnValue(of(response));

    component.isValidForm();
    component.login();

    expect(spied).toHaveBeenCalledTimes(1);
  });
});

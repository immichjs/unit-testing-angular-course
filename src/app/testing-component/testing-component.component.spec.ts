import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingComponentComponent } from './testing-component.component';
import { By } from '@angular/platform-browser';

describe('TestingComponentComponent', () => {
  let component: TestingComponentComponent;
  let fixture: ComponentFixture<TestingComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestingComponentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestingComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve acessar elemento na DOM com debugElement.query()', () => {
    let title = fixture.debugElement.query(By.css('h1')).nativeElement;

    expect(title.textContent).toBe(
      'Trabalhando com debugElement.query() e nativeElement.querySelector()'
    );
  });

  it('Deve acessar elemento na DOM com debugElement.nativeElement.querySelector()', () => {
    let paragraph = fixture.debugElement.nativeElement.querySelector('p');

    expect(paragraph.textContent).toBe(
      'esta aprendendo com curso de testes unitarios?'
    );
  });

  it('Deve ter background green botão sim', () => {
    let btnYes = fixture.debugElement.nativeElement.querySelector('.btn-yes');

    expect(btnYes.style.backgroundColor).toBe('green');
  });

  it('Deve ter background red botão não', () => {
    let btnYes = fixture.debugElement.nativeElement.querySelector('.btn-no');

    expect(btnYes.style.backgroundColor).toBe('red');
  });
});

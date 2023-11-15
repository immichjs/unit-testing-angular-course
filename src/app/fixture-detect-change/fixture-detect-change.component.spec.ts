import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureDetectChangeComponent } from './fixture-detect-change.component';
import { By } from '@angular/platform-browser';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

describe('FixtureDetectChangeComponent', () => {
  let component: FixtureDetectChangeComponent;
  let fixture: ComponentFixture<FixtureDetectChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FixtureDetectChangeComponent],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }],
    }).compileComponents();

    fixture = TestBed.createComponent(FixtureDetectChangeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve renderizar title', () => {
    let title = fixture.debugElement.query(By.css('h1')).nativeElement;

    expect(title.textContent).toBe('Aprendendo a usar fixture.detectChange()');
  });
});

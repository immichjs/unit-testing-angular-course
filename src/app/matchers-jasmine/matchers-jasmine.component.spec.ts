import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchersJasmineComponent } from './matchers-jasmine.component';

describe('MatchersJasmineComponent', () => {
  let component: MatchersJasmineComponent;
  let fixture: ComponentFixture<MatchersJasmineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatchersJasmineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MatchersJasmineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve testar o uso do matcher toEqual', () => {
    expect(true).toEqual(true);
    expect([1, 2, 3]).toEqual([1, 2, 3]);
  });

  it('Deve testar o uso do matcher toBe', () => {
    const age = 20;

    expect(['Michel', 'Laura']).toEqual(['Michel', 'Laura']);
    expect(age).toBe(20);
  });

  it('Deve testar o uso do matcher toBeTruthy', () => {
    expect(true).toBeTruthy();
    expect(' ').toBeTruthy();
    expect(10).toBeTruthy();
    expect({}).toBeTruthy();
    expect([]).toBeTruthy();
  });

  it('Deve testar o uso do matcher toBeFalsy', () => {
    expect(false).toBeFalsy();
    expect('').toBeFalsy();
    expect(0).toBeFalsy();
    expect(NaN).toBeFalsy();
    expect(undefined).toBeFalsy();
    expect(null).toBeFalsy();
  });

  it('Deve testar o uso do matcher toBeTrue', () => {
    expect(true).toBeTrue();
  });

  it('Deve testar o uso do matcher toBeFalse', () => {
    expect(false).toBeFalse();
  });

  it('Deve testar o uso do matcher not', () => {
    expect('Michel').not.toEqual('Laura');
  });

  it('Deve testar o uso do matcher toContain', () => {
    expect('Homem aranha').toContain('aranha');
    expect([1, 2, 3]).toContain(1);
  });

  it('Deve testar o uso do matcher toBeDefined', () => {
    const name = 'Michel';
    expect(name).toBeDefined();
  });

  it('Deve testar o uso do matcher toBeUndefined', () => {
    let name;
    expect(name).toBeUndefined();
  });

  it('Deve testar o uso do matcher toBeNull', () => {
    expect(null).toBeNull();
  });

  it('Deve testar o uso do matcher toBeNaN', () => {
    let name = 'test';
    expect(parseFloat(name)).toBeNaN();
  });

  it('Deve testar o uso do matcher toBeGreatherThan', () => {
    expect(10).toBeGreaterThan(1);
  });

  it('Deve testar o uso do matcher toBeLessThan', () => {
    expect(1).toBeLessThan(10);
  });

  it('Deve testar o uso do matcher toBeLessThan', () => {
    expect(1).toBeLessThan(10);
  });

  it('Deve testar o uso do matcher toBeCloseTo', () => {
    expect(35.2).toBeCloseTo(35.2, 1);
  });

  it('Deve testar o uso do matcher toMatch', () => {
    expect('Michel').toMatch(/Michel/);
  });

  it('Deve testar o uso do matcher toThrow', () => {
    expect(function () {
      throw new Error('My Error');
    }).toThrow();
  });
});

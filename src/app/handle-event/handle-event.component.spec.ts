import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandleEventComponent } from './handle-event.component';
import { By } from '@angular/platform-browser';

describe('HandleEventComponent', () => {
  let component: HandleEventComponent;
  let fixture: ComponentFixture<HandleEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HandleEventComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HandleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve definir emoji ao clicar no botão', () => {
    let title = fixture.debugElement.query(By.css('h1')).nativeElement;
    let button = fixture.debugElement.query(By.css('button'));

    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(title.textContent).toBe('👨‍🎓');
  });
});

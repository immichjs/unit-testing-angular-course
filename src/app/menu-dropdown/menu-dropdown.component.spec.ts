import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDropdownComponent } from './menu-dropdown.component';

describe('MenuDropdownComponent', () => {
  let component: MenuDropdownComponent;
  let fixture: ComponentFixture<MenuDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Deve exibir o texto "Menu" no botão', () => {
    const button =
      fixture.debugElement.nativeElement.querySelector('.dropdown-toggle');

    component.label = 'Menu';
    fixture.detectChanges();

    expect(button.textContent.trim()).toBe('Menu');
  });

  it('Deve abrir menu quando clicar no botão', () => {
    const button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('.dropdown-toggle');

    button.click();
    fixture.detectChanges();

    const menu: HTMLElement =
      fixture.debugElement.nativeElement.querySelector('.dropdown-menu');

    expect(menu.classList.contains('show')).toBeTrue();
  });

  it('Deve exibir os items do menu corretamente', () => {
    component.items = [
      { label: 'Item 1', value: 'item-1' },
      { label: 'Item 2', value: 'item-2' },
      { label: 'Item 3', value: 'item-3' },
    ];

    const button: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('.dropdown-toggle');

    button.click();
    fixture.detectChanges();

    const menuItems = fixture.nativeElement.querySelectorAll('.dropdown-item');
    expect(menuItems[0].textContent.trim()).toBe('Item 1');
    expect(menuItems[1].textContent.trim()).toBe('Item 2');
    expect(menuItems[2].textContent.trim()).toBe('Item 3');
  });

  it('Deve acionar o evento de selected com o valor correto após selecionar um item do menu', () => {
    component.items = [
      { label: 'Item 1', value: 'item-1' },
      { label: 'Item 2', value: 'item-2' },
      { label: 'Item 3', value: 'item-3' },
    ];

    fixture.detectChanges();

    const spy = spyOn(component.selected, 'emit');
    const menuItems: HTMLButtonElement[] =
      fixture.nativeElement.querySelectorAll('.dropdown-item');
    const item = component.items[0];
    menuItems[0].click();

    expect(spy).toHaveBeenCalledWith(item.value);
  });
});

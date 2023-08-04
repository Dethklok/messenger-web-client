import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateChannelFormComponent } from 'app/side-menu/component/create-channel-form/create-channel-form.component';

describe('CreateChannelFormComponent', () => {
  let component: CreateChannelFormComponent;
  let fixture: ComponentFixture<CreateChannelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateChannelFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateChannelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

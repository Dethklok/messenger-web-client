import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollableListComponent } from './infinite-scrollable-list.component';

type TestElement = {
  id: string;
};

describe('InfiniteScrollableListComponent', () => {
  let component: InfiniteScrollableListComponent<TestElement>;
  let fixture: ComponentFixture<InfiniteScrollableListComponent<TestElement>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfiniteScrollableListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      InfiniteScrollableListComponent<TestElement>
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

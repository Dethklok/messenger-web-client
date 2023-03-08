import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Datasource, IDatasource } from 'ngx-ui-scroll';
import { Subject, takeUntil } from 'rxjs';
import { InfiniteScrollableListDataSource } from './InfiniteScrollableListDataSource';
import { InfiniteScrollableListDataSourceOptions } from './InfiniteScrollableListDataSourceOptions';

@Component({
  selector: 'app-infinite-scrollable-list',
  templateUrl: './infinite-scrollable-list.component.html',
  styleUrls: ['./infinite-scrollable-list.component.css'],
})
export class InfiniteScrollableListComponent<T> implements OnInit, OnDestroy {
  @Input() dataSource!: InfiniteScrollableListDataSource<T>;
  @Input() renderItem!: TemplateRef<{ $implicit: T; index: number }>;

  @ViewChild('viewport', { read: ElementRef })
  viewport!: ElementRef<HTMLElement>;

  private destroy$ = new Subject<void>();
  ngxUiScrollDataSource?: IDatasource<T>;

  ngOnInit(): void {
    this.dataSource.initialize().subscribe((options) => {
      this.configureNgxUiScrollDataSource(options);

      this.ngxUiScrollDataSource?.adapter?.init$.subscribe(() => {
        this.initResizeObserver();
        // We should subscribe to lastVisible element to make adapter.lastVisible.index$ available
        this.ngxUiScrollDataSource?.adapter?.lastVisible$.subscribe(() => {});
      });

      this.dataSource.onPush$
        .pipe(takeUntil(this.destroy$))
        .subscribe((items) => this.processNewItems(items));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private configureNgxUiScrollDataSource({
    startIndex,
    inverse,
  }: InfiniteScrollableListDataSourceOptions) {
    this.ngxUiScrollDataSource = new Datasource({
      get: (index: number, count: number) =>
        this.dataSource.loadItems(index, count),
      settings: {
        startIndex,
        inverse,
      },
      devSettings: {
        debug: false,
      },
    });
  }

  private processNewItems(items: T[]) {
    this.ngxUiScrollDataSource?.adapter?.append({ items, eof: true });
    if (
      this.ngxUiScrollDataSource?.adapter?.lastVisible.$index ===
      this.dataSource.lastIndex - 1
    ) {
      this.scrollDown();
    }
  }

  private async scrollDown() {
    const element = this.viewport.nativeElement;

    await this.ngxUiScrollDataSource?.adapter?.relax();
    element.scrollTop = element.scrollHeight;
    this.ngxUiScrollDataSource?.adapter?.clip();
  }

  private initResizeObserver() {
    const viewport = this.viewport.nativeElement;
    (viewport as any).handleResize = this.onResize.bind(this);
    const resizeObserver = new (window as any).ResizeObserver(
      (entries: any) => {
        for (let entry of entries) {
          if (entry.target.handleResize) {
            entry.target.handleResize(entry);
          }
        }
      }
    );
    resizeObserver.observe(viewport);
  }

  private onResize() {
    this.viewport.nativeElement.dispatchEvent(new Event('scroll'));
    if (
      this.ngxUiScrollDataSource?.adapter?.lastVisible.$index ===
      this.dataSource.lastIndex
    ) {
      this.scrollDown();
    }
  }
}

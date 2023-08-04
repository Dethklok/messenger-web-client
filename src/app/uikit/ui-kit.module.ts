import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SendOutline } from '@ant-design/icons-angular/icons';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { UiScrollModule } from 'ngx-ui-scroll';
import { FlexItemComponent } from './component/flex-item/flex-item.component';
import { FlexComponent } from './component/flex/flex.component';
import { InfiniteScrollableListComponent } from './component/infinite-scrollable-list/infinite-scrollable-list.component';
import { MessageInputComponent } from './component/message-input/message-input.component';
import { MessageComponent } from './component/message/message.component';

@NgModule({
  declarations: [
    MessageComponent,
    InfiniteScrollableListComponent,
    FlexComponent,
    FlexItemComponent,
    MessageInputComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NzAvatarModule,
    NzButtonModule,
    NzCommentModule,
    NzListModule,
    NzSpaceModule,
    NzIconModule.forChild([SendOutline]),
    NzInputModule,
    NzModalModule,
    UiScrollModule,
    ReactiveFormsModule,
  ],
  exports: [
    HttpClientModule,
    MessageComponent,
    InfiniteScrollableListComponent,
    FlexComponent,
    FlexItemComponent,
    MessageInputComponent,
  ],
})
export class UiKitModule {}

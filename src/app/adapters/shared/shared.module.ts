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
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { UiScrollModule } from 'ngx-ui-scroll';
import { AvatarComponent } from './components/avatar/avatar.component';
import { FlexItemComponent } from './components/flex-item/flex-item.component';
import { FlexComponent } from './components/flex/flex.component';
import { InfiniteScrollableListComponent } from './components/infinite-scrollable-list/infinite-scrollable-list.component';
import { MessageInputComponent } from './components/message-input/message-input.component';
import { MessageComponent } from './components/message/message.component';
import { SpaceComponent } from './components/space/space.component';
import { TextareaComponent } from './components/textarea/textarea.component';

@NgModule({
  declarations: [
    AvatarComponent,
    MessageComponent,
    InfiniteScrollableListComponent,
    SpaceComponent,
    FlexComponent,
    FlexItemComponent,
    TextareaComponent,
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
    UiScrollModule,
    ReactiveFormsModule,
  ],
  exports: [
    HttpClientModule,
    MessageComponent,
    InfiniteScrollableListComponent,
    SpaceComponent,
    FlexComponent,
    FlexItemComponent,
    TextareaComponent,
    MessageInputComponent,
  ],
})
export class SharedModule {}

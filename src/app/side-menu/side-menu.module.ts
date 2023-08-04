import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServerCommunicationModule } from 'app/server-communication';
import { ChannelListComponent } from 'app/side-menu/component/channel-list/channel-list.component';
import { CreateChannelFormComponent } from 'app/side-menu/component/create-channel-form/create-channel-form.component';
import { MenuComponent } from 'app/side-menu/component/menu/menu.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    MenuComponent,
    CreateChannelFormComponent,
    ChannelListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ServerCommunicationModule,
    NzFormModule,
    NzMenuModule,
    NzModalModule,
    NzInputModule,
    NzButtonModule,
  ],
})
export class SideMenuModule {}

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HateoasClient } from './hateoas/HateoasClient';
import { HttpAuthInterceptor } from './http-auth.interceptor';

@NgModule({
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptor,
      multi: true,
    },
    HateoasClient,
  ],
})
export class ServerCommunicationModule {}

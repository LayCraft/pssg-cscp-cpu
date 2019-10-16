import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotificationBannerComponent } from './notification-banner/notification-banner.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, NotFoundComponent, NotificationBannerComponent],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    NotificationBannerComponent,
  ]
})
export class SharedModule { }

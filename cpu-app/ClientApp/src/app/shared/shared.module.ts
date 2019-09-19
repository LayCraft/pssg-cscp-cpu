import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NotificationBannerComponent } from './components/notification-banner/notification-banner.component';
import { MatStepperModule, MatCheckboxModule, MatSlideToggleModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    NotificationBannerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatStepperModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatIconModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    NotificationBannerComponent,

    // Material exports
    MatStepperModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatIconModule,
  ]
})
export class SharedModule { }

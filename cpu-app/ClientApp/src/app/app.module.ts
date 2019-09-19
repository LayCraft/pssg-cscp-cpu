import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UnauthorizedInterceptor } from './core/interceptors/unauthorized.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { AuthenticatedModule } from './authenticated/authenticated.module';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    AuthenticatedModule //TODO THIS ABOSOLUTELY SHOULD NOT MAKE IT TO PROD.
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

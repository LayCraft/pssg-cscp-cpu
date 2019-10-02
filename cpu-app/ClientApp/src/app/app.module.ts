import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { TestComponent } from './test/test.component';
import { UnauthorizedInterceptor } from './core/interceptors/unauthorized.interceptor';

@NgModule({
	declarations: [
		TestComponent,
		LandingPageComponent,
		AppComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		SharedModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }

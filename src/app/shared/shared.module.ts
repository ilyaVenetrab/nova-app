import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '../common/header/header.module';
import { SanitizeHtmlPipe } from './pipe/sanitize-html.pipe';

const declarations = [SanitizeHtmlPipe];

@NgModule({
	declarations,
	exports: [
		CommonModule,
    HeaderModule,
		...declarations,
	],
	// providers: [
  //   AppService,
  //   {
  //     provide: BD_URL,
  //     useValue: environment.bdUrl,
  //   },
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: AuthInterceptor,
  //     multi: true,
  //   },
	// ],
})
export class SharedModule {
	public static forRoot(): ModuleWithProviders<SharedModule> {
		return {
			ngModule: SharedModule
		};
	}
}

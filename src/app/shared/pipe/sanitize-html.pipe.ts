import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) {
  }

  transform(value: string | undefined): SafeHtml | undefined {
    if (value) {
      return this._sanitizer.bypassSecurityTrustHtml(value);
    }

    return undefined;
  }
}

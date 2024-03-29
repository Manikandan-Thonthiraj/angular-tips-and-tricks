import { Pipe, PipeTransform} from '@angular/core'
import {DomSanitizer} from '@angular/platform-browser'

@Pipe({
    name: 'highlight'
})
export class HighlightSearchTextPipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer
  ) {}

  transform(value: any, args: any): any {
    if (!args) {
      return value;
    }
    if (typeof args === 'string') {
      args = args.trim();
    }
    // Match in a case insensitive maneer
    const re = new RegExp(args, 'gi');
    const match = value.match(re);

    // If there's no match, just return the original value.
    if (!match) {
      return value;
    }

    const replacedValue = value.replace(re, "<span class='highlight-text'>" + match[0] + "</span>")
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }
}
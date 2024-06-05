import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: true
})
export class HighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return value;

    const regex = /(BKN|FEW|SCT)(\d{3})/g;
    const formatted = value.replace(regex, (match, _, numStr) => {
      const num = parseInt(numStr, 10);
      const color = num <= 30 ? 'blue' : 'red';
      return `<span style="color: ${color};">${match}</span>`;
    });

    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }
}

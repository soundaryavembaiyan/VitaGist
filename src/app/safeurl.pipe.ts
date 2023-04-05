import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeurl'
})
export class SafeurlPipe implements PipeTransform {

  // view image url -using pipe..
  transform(url: any) {
    return this._sanitier.bypassSecurityTrustResourceUrl(url);
  }

constructor(public _sanitier: DomSanitizer){}
}

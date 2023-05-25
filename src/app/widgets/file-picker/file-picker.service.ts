import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilePickerService {

  constructor(
    private http: HttpClient,
  ) {

  }

  getFileFromUrl(url: string): Observable<File> {
    const headers = new HttpHeaders({
      'isRawUrl': 'true',
    });
    return this.http.get(url, {headers, responseType: 'blob'}).pipe(map(res=>{
      var fileNameIndex = url.lastIndexOf("/") + 1;
      var fileName = url.substr(fileNameIndex);
      var file = new File([res], fileName, { type: res.type });
      return file;
    }));
  }
}

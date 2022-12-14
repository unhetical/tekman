import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Options } from '../interfaces/response.interface';
import { ConfigDto, User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private GATEWAY = environment.gateway;
  private API = environment.api_user;
  private USER = '/user';

  // TODO: Haríamos uso de estados para guardar el usuario obteniendo los datos del token al loguear.
  private user = {
    id: 1,
    name: 'Tester',
    token: 'xxx',
    language: 'es',
    course: '3',
    random: true,
  };

  constructor(protected http: HttpClient) {}

  /**
   * Get user configuration
   * @returns Config
   */
  getUser(): Observable<User> {
    return of(this.user);
    // return this.http
    //   .get<Response>(this.GATEWAY + this.API + this.USER)
    //   .pipe(catchError((err) => throwError(err)));
  }

  /**
   * Edit user configuration
   * @param configDto ConfigDto
   */
  setConfig(configDto: ConfigDto): Observable<ConfigDto> {
    return of(configDto);
    // return this.http
    //   .put<ConfigDto>(
    //     this.GATEWAY + this.API + this.USER + '/config',
    //     configDto
    //   )
    //   .pipe(catchError((err) => throwError(err)));
  }

  getLanguages(): Observable<Options[]> {
    return of([
      { name: 'Español', code: 'es' },
      { name: 'Inglés', code: 'en' },
    ]);

    // return this.http
    //   .get<Response>(this.GATEWAY + this.API + this.USER + '/lang')
    //   .pipe(catchError((err) => throwError(err)));
  }

  getCourses(): Observable<Options[]> {
    return of([
      { name: '3º de infantil', code: '5' },
      { name: '4º de infantil', code: '4' },
      { name: '5º de infantil', code: '3' },
    ]);

    // return this.http
    //   .get<Response>(this.GATEWAY + this.API + this.USER + '/courses')
    //   .pipe(catchError((err) => throwError(err)));
  }
}

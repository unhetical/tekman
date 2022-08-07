import { Session, LessonDto } from '../models/session.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/core/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private GATEWAY = environment.gateway;
  private API = environment.api_sessions;
  private SESSIONS = '/sessions';

  private selectedSession$ = new Subject<Session>();
  private selectedSession: any;

  constructor(protected http: HttpClient) {}

  /**
   * Nota: Si el servicio es demasiado grande se separarían en 2 servicios, uno API y otro datos a manejar como Subjects etc.
   * Los endpoints al estar mockeados tienen un map, shareReplay y any en vez del tipado correcto necesarios para filtrar los datos.
   * Si peticionaramos al back no harían falta.
   */

  // API

  /**
   * Get Sessions list
   */
  getAllSessions(): Observable<Session[]> {
    return this.http.get<Response>('/assets/data.json').pipe(
      map(({ data }) => {
        return data;
      }),
      catchError((err) => throwError(err)),
      shareReplay(1)
    );
  }

  /**
   * Get selected Session
   * @param id number
   * @returns Session
   */
  getSession(id: number): Observable<any> {
    return this.http.get<Response>('/assets/data.json').pipe(
      map(({ data }) => {
        return data.find((f) => f.id === id);
      }),
      catchError((err) => throwError(err)),
      shareReplay(1)
    );
  }

  /**
   * Get last lesson
   * @returns Lesson
   */
  getLastLesson(): Observable<any> {
    return this.http.get<Response>('/assets/data.json').pipe(
      map(({ data }) => {
        return data.find((res) => res.id === 2 && res.lessons[0].id === 25);
      }),
      catchError((err) => throwError(err)),
      shareReplay(1)
    );
  }

  /**
   * Edit lesson
   * @param lessonDto LessonDto
   */
  updateLesson(lessonDto: LessonDto): Observable<LessonDto> {
    return this.http
      .put<LessonDto>(this.GATEWAY + this.API + this.SESSIONS, lessonDto)
      .pipe(
        catchError((err) => throwError(err)),
        shareReplay(1)
      );
  }

  // OBSERVABLES

  /**
   * Observable selected Session
   */
  getSelectedSession(): Observable<Session> {
    return this.selectedSession$.asObservable();
  }

  /**
   * Set selected Session
   */
  setSelectedSession(session: Session): void {
    this.selectedSession = session;
    this.selectedSession$.next(session);
  }
}

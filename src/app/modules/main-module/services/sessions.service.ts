import { Session, LessonDto, Lesson } from '../models/session.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, throwError } from 'rxjs';
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
  public selectedSession: any;

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
        // Esta parte solo es necesaria para el mock, podría venir calculado en el completed en vez de ser boolean.
        data.forEach((s: Session) => {
          s['done'] = 0;
          s.lessons.forEach((l: Lesson) => {
            if (l.completed) {
              s['done'] += 1;
            }
          });
        });
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
  getSession(id: number): Observable<Session> {
    return this.http.get<Response>('/assets/data.json').pipe(
      map(({ data }) => {
        // Esta parte solo es necesaria para el mock, podría venir calculado en el completed en vez de ser boolean.
        const session = data.find((f) => f.id === id);
        session['done'] = 0;
        session.lessons.forEach((l: Lesson) => {
          if (l.completed) {
            session['done'] += 1;
          }
        });
        return session;
      }),
      catchError((err) => throwError(err)),
      shareReplay(1)
    );
  }

  /**
   * Get last lesson
   * @returns Lesson
   */
  getLastLesson(filter?: {
    sessionId: number;
    lessonId: number;
  }): Observable<any> {
    return this.http.get<Response>('/assets/data.json').pipe(
      map(({ data }) => {
        // Esta parte solo es necesaria para el mock, podría venir calculado en el completed en vez de ser boolean.
        let lesson: Lesson;
        data.forEach((s: Session) => {
          if (s.id === filter.sessionId) {
            lesson = s.lessons.find((l) => l.id === filter.lessonId);
          }
        });
        return lesson;
      }),
      catchError((err) => throwError(err))
    );
  }

  /**
   * Edit lesson
   * @param lessonDto LessonDto
   */
  updateLesson(lessonDto: LessonDto): Observable<LessonDto | boolean> {
    return of(true);
    // return this.http
    //   .put<LessonDto>(this.GATEWAY + this.API + this.SESSIONS, lessonDto)
    //   .pipe(
    //     catchError((err) => throwError(err)),
    //     shareReplay(1)
    //   );
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

import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Lesson, Session } from './models/session.interface';
import { SessionService } from './services/sessions.service';

@Component({
  selector: 'app-main-module',
  templateUrl: './main-module.component.html',
  styleUrls: ['./main-module.component.scss'],
})
export class MainModuleComponent implements OnInit {
  sessionList$: Observable<Session[]>;
  lastLesson$: Observable<Lesson>;

  sessionList: Session[];
  lastLesson: Lesson;
  chartData: any;

  constructor(
    private sessionService: SessionService,
    public dialogService: DialogService
  ) {
    this.lastLesson$ = this.sessionService.getLastLesson();
    this.sessionList$ = this.sessionService.getAllSessions();
  }

  ngOnInit(): void {
    this.getLastLesson();
    this.getAllSessions();
  }

  getLastLesson(): void {
    this.lastLesson$.pipe(take(1)).subscribe((res) => (this.lastLesson = res));
  }

  getAllSessions(): void {
    this.sessionList$
      .pipe(
        take(1),
        map((session: Session[]) => {
          // Esta parte solo es necesaria para el mock, podría venir calculado en el completed en vez de ser boolean.
          session.forEach((s: Session) => {
            s['done'] = 0;
            s.lessons.forEach((l: Lesson) => {
              if (l.completed) {
                s['done'] += 1;
              }
            });
          });
          console.log(session);
          this.sessionList = session;
          this.setCharts();
        })
      )
      .subscribe();
  }

  setCharts(): void {
    this.chartData = [];

    this.sessionList.forEach((session: Session) => {
      this.chartData.push({
        // labels: ['Cumplido', 'Objetivo'],
        datasets: [
          {
            data: [session['done'], session.lessons.length - session['done']],
            backgroundColor: ['#ED993F', '#F2F2F2'],
            // hoverBackgroundColor: ['#FF6384', '#36A2EB'],
          },
        ],
      });
    });
  }

  playLesson(ev: Event) {
    // Continuar sesión, mostrar página before-starting.
  }

  randomLesson(ev: Event) {
    // Cambiar de sesión aleatoriamente dentro del mismo trimestre.
    // Avisar a backend del cambio de sesión.
    // Mostrar página before-starting.
  }

  nextLesson(ev: Event) {
    // saltar a la siguiente sesión
    // Si hay mas en el mismo trimestre, pedir el siguiente.
    // Si no hay más ¿mostrar siguiente trimestre o mensaje de aviso?
  }
}

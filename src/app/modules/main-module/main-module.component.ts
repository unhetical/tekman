import { ConfigDto } from './../../core/interfaces/user.interface';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Lesson, Session } from './models/session.interface';
import { SessionService } from './services/sessions.service';
import { User } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-main-module',
  templateUrl: './main-module.component.html',
  styleUrls: ['./main-module.component.scss'],
})
export class MainModuleComponent implements OnInit {
  sessionList$: Observable<Session[]>;
  lastLesson$: Observable<Lesson>;

  user: User;
  sessionList: Session[];
  lastLesson: Lesson;
  chartData: any;
  visibleSidebar: boolean;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private messageService: MessageService,
    private router: Router,
    public dialogService: DialogService
  ) {
    this.lastLesson$ = this.sessionService.getLastLesson({
      sessionId: 2,
      lessonId: 25,
    });
    this.sessionList$ = this.sessionService.getAllSessions();
  }

  ngOnInit(): void {
    this.getUser();
    this.getLastLesson();
    this.getAllSessions();
  }

  getUser(): void {
    this.userService.getUser().pipe(take(1)).subscribe((res) => (this.user = res));
  }

  getLastLesson(): void {
    this.lastLesson$.pipe(take(1)).subscribe((res) => (this.lastLesson = res));
  }

  getAllSessions(): void {
    this.sessionList$.pipe(take(1)).subscribe((res) => {
      this.sessionList = res;
      this.setCharts();
    });
  }

  setCharts(): void {
    this.chartData = [];

    this.sessionList.forEach((session: Session) => {
      this.chartData.push({
        datasets: [
          {
            data: [session['done'], session.lessons.length - session['done']],
            backgroundColor: ['#ED993F', '#F2F2F2'],
          },
        ],
      });
    });
  }

  playLesson(ev: Event): void {
    //TODO: Continuar sesión.
    this.lastLesson.random = false;
    this.updateLesson('play');

    this.toggleSidebar(false);
    this.showToastr({
      severity: 'success',
      summary: 'Success',
      detail: 'Play lesson',
    });
  }

  randomLesson(ev: Event): void {
    // TODO: Cambiar de sesión aleatoriamente dentro del mismo trimestre.
    // Avisar a backend del cambio de sesión.
    // Mostrar página before-starting.
    this.updateConfig(true);
  }

  nextLesson(ev: Event): void {
    // TODO: saltar a la siguiente sesión
    // Si hay más en el mismo trimestre, pedir el siguiente.
    // Si no hay más ¿mostrar siguiente trimestre o mensaje de aviso?
    // De momento va a la lista de sesiones.
    this.lastLesson.completed = true;
    this.updateLesson('next');
  }

  updateLesson(action: string): void {
    this.sessionService.updateLesson(this.lastLesson).subscribe(
      (res) => {
        this.showToastr({
          severity: 'success',
          summary: 'Success',
          detail: 'Updated lesson successfully',
        });

        if (action === 'play') {
          this.toggleSidebar(true);
        } else {
          this.navigateToSessionList(this.lastLesson.trimester);
        }
      },
      (err) => {
        this.showToastr({
          severity: 'warn',
          summary: 'Warn',
          detail: 'Error on update lesson',
        });
      }
    );
  }

  updateConfig(ev): void {
    const configDto: ConfigDto = {
      language: this.user.language,
      course: this.user.course,
      random: ev,
    };

    this.userService.setConfig(configDto).subscribe(
      (res) => {
        this.showToastr({
          severity: 'success',
          summary: 'Success',
          detail: 'Updated config successfully',
        });
        this.toggleSidebar(true);
      },
      (err) => {
        this.showToastr({
          severity: 'warn',
          summary: 'Warn',
          detail: 'Error on update config',
        });
      }
    );
  }

  toggleSidebar(ev: boolean): void {
    this.visibleSidebar = ev;
  }

  showToastr(msg: Message): void {
    this.messageService.add(msg);
  }

  navigateToSessionList(sessionId: number): void {
    this.router.navigate(['/session-list', sessionId]);
  }
}

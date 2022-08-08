import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Lesson, Session } from '../../models/session.interface';
import { SessionService } from '../../services/sessions.service';
import { map, take } from 'rxjs/operators';
import { Message, MessageService } from 'primeng/api';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/interfaces/user.interface';

@Component({
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.scss'],
})
export class SessionListComponent implements OnInit {
  user: User;
  session: Session;
  lessonId: number;
  chartData: any;

  visibleSidebar: boolean;

  constructor(
    private userService: UserService,
    private sessionService: SessionService,
    private router: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getUser();

    this.router.params.subscribe((param) => {
      const id = Number(param.id);
      this.getSession(id);
    });
  }

  getUser(): void {
    this.userService.getUser().subscribe((res) => {
      this.user = res;
    });
  }

  getSession(id: number): void {
    this.sessionService
      .getSession(id)
      .pipe(take(1))
      .subscribe((res) => {
        this.session = res;
        this.getLastLesson({
          sessionId: res.id,
          lessonId: Number(res.id.toString() + this.session.done.toString()),
        });
        this.setCharts();
      });
  }

  getLastLesson(filter: { sessionId: number; lessonId: number }): void {
    this.sessionService.getLastLesson(filter).subscribe((res) => {
      this.lessonId = res.id;
    });
  }

  setCharts(): void {
    this.chartData = [];

    this.chartData.push({
      datasets: [
        {
          data: [
            this.session.done,
            this.session.lessons.length - this.session.done,
          ],
          backgroundColor: ['#ED993F', '#F2F2F2'],
        },
      ],
    });
  }

  playLesson(ev: Event): void {
    // TODO: Continuar sesión.
    this.toggleSidebar(false);
    this.showToastr({
      severity: 'success',
      summary: 'Success',
      detail: 'Play lesson',
    });
  }

  toggleSidebar(ev: boolean): void {
    this.visibleSidebar = ev;
  }

  showToastr(msg: Message): void {
    this.messageService.add(msg);
  }
}

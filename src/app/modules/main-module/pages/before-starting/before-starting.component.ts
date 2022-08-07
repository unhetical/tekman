import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Session } from '../../models/session.interface';
import { SessionService } from '../../services/sessions.service';

@Component({
  selector: 'app-before-starting',
  templateUrl: './before-starting.component.html',
  styleUrls: ['./before-starting.component.scss'],
})
export class BeforeStartingComponent implements OnInit {
  session$: Observable<Session>;
  session: Session;

  constructor(
    private sessionService: SessionService,
    public dialogService: DialogService
  ) {
    this.session$ = this.sessionService.getSelectedSession();
  }

  ngOnInit(): void {
    this.getSelectedSession();
  }

  getSelectedSession(): void {
    this.session$
      .pipe(take(1))
      .subscribe((res) => (this.session = res));
  }

  /**
   * Open a dynamic dialog
   */
  playSession(rowData: Session): void {
    this.sessionService.setSelectedSession(rowData);

    const ref = this.dialogService.open(BeforeStartingComponent, {
      header: 'Detalles de la posición',
      width: '60%',
      contentStyle: { 'max-height': '600px', overflow: 'auto' },
      dismissableMask: true,
    });
    ref.onClose.subscribe(() => {
      // > Empezar pase
    });
  }
}

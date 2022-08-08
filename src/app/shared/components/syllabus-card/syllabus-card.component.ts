import { Component, Input, OnInit } from '@angular/core';
import { Session } from 'src/app/modules/main-module/models/session.interface';

@Component({
  selector: 'app-syllabus-card',
  templateUrl: './syllabus-card.component.html',
  styleUrls: ['./syllabus-card.component.scss'],
})
export class SyllabusCardComponent implements OnInit {
  @Input() session: Session;
  @Input() chartData: any;

  constructor() {}

  ngOnInit(): void {}
}

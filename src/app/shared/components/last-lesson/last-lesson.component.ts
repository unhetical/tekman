import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lesson } from 'src/app/modules/main-module/models/session.interface';

@Component({
  selector: 'app-last-lesson',
  templateUrl: './last-lesson.component.html',
  styleUrls: ['./last-lesson.component.scss'],
})
export class LastLessonComponent implements OnInit {
  @Input() lastLesson: Lesson;

  @Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
  @Output() randomLesson: EventEmitter<any> = new EventEmitter();
  @Output() nextLesson: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleSidebar(ev: boolean): void {
    this.toggleSidebar.emit(ev);
  }

  handleRandomLesson(ev: Event): void {
    this.randomLesson.emit(ev);
  }

  handleNextLesson(ev: Event): void {
    this.nextLesson.emit(ev);
  }
}

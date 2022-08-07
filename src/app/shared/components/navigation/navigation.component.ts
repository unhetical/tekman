import { ConfigDto, User } from './../../../core/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { Options } from 'src/app/core/interfaces/response.interface';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  user: User;
  visibleSidebar: boolean;
  formGroup: FormGroup;
  languages: Options[];
  courses: Options[];

  constructor(private userService: UserService) {
    this.setDefaultForm();
  }

  ngOnInit(): void {
    this.getConfigOptions();
    this.getUser();
  }

  setDefaultForm(): void {
    this.formGroup = new FormGroup({
      language: new FormControl('', Validators.required),
      course: new FormControl('', Validators.required),
    });
  }

  openConfigModal(ev: Event): void {
    this.visibleSidebar = true;
  }

  closeConfigModal(): void {
    this.visibleSidebar = false;
  }

  getConfigOptions(): void {
    this.userService.getLanguages().subscribe((res) => (this.languages = res));
    this.userService.getCourses().subscribe((res) => (this.courses = res));
  }

  getUser(): void {
    this.userService.getUser().subscribe((res) => {
      this.user = res;
      this.formGroup.patchValue(res);
    });
  }

  saveConfig(ev: Event): void {
    if (this.formGroup.invalid) {
      console.warn('Error, revise el formulario');
      return;
    }

    const data: ConfigDto = this.formGroup.value;
    this.userService.setConfig(data).subscribe(
      (res) => {
        // Sólo lo utilizo para actualizar el mock
        this.user.language = res.language;
        this.user.course = res.course;
        console.log('saved', res);
        this.closeConfigModal();
      },
      (err) => console.warn(err)
    );
  }

  closeWithoutSave(): void {
    this.formGroup.patchValue(this.user);
    this.closeConfigModal();
  }
}

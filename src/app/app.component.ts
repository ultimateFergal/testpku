import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { Observable }  from 'rxjs';
import { TestService } from './services/test.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testpku';

  form: FormGroup;
  result: any;
  constructor(public formBuilder: FormBuilder, private testService: TestService) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      'url': [null, [Validators.required, this.checkUrl]],
    });
  }

  public save(data: NgForm) {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.getAll();
      console.log(data);
    }
  }

  getAll(): void {
    this.testService.getAll()
      .subscribe(
        res => {
          // this.testService = res;
          console.log(res);
        },
        err => console.log(err)
      );
  }


  checkUrl(control) {
    let url = control.value
    let passwordCheck = /^(http?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|in|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return (!passwordCheck.test(url) && url) ? { 'requirements': true } : null;
  }

  getErrorPassword() {
    return this.form.get('url').hasError('required') ? 'Field is required' :
      this.form.get('url').hasError('requirements') ? 'Invalid URL' : '';
  }

  onSubmit(post) {
    // this.form.markAllAsTouched();
    if (this.form.valid) {
      this.getAll();
      console.log(post);
      this.result = post;
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { Observable }  from 'rxjs';
import { TestService } from './services/test.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testpku';

  form: FormGroup;
  result: any;
  tiles1: Tile[] = [
    {text: '', cols: 3, rows: 1, color: 'lightblue'},
    {text: '', cols: 1, rows: 2, color: 'lightgreen'},
    {text: '', cols: 1, rows: 1, color: 'lightpink'},
    {text: '', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: '', cols: 1, rows: 1, color: 'lightpink'},
    {text: '', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: '', cols: 1, rows: 3, color: 'lightgreen'},
    {text: '', cols: 1, rows: 1, color: 'lightpink'},
    {text: '', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: '', cols: 1, rows: 1, color: 'lightpink'},
    {text: '', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  tiles2: Tile[] = [
    {text: '', cols: 6, rows: 1, color: 'lightblue'},
    {text: '', cols: 1, rows: 1, color: 'lightgreen'},
    {text: '', cols: 1, rows: 1, color: 'lightpink'},
    {text: '', cols: 1, rows: 1, color: 'lightgreen'},
    {text: '', cols: 1, rows: 1, color: 'lightpink'},
    {text: '', cols: 1, rows: 1, color: 'lightgreen'},
    {text: '', cols: 1, rows: 1, color: 'lightpink'},
    {text: '', cols: 1, rows: 3, color: 'lightblue'},
    {text: '', cols: 2, rows: 1, color: 'lightgreen'},
    {text: '', cols: 3, rows: 1, color: '#DDBDF1'},
    {text: '', cols: 2, rows: 1, color: 'lightgreen'},
    {text: '', cols: 3, rows: 1, color: '#DDBDF1'},
    {text: '', cols: 2, rows: 1, color: 'lightgreen'},
    {text: '', cols: 3, rows: 1, color: '#DDBDF1'},
    {text: '', cols: 6, rows: 1, color: 'lightblue'},
    {text: '', cols: 1, rows: 1, color: 'lightgreen'},
    {text: '', cols: 1, rows: 1, color: 'lightpink'},
    {text: '', cols: 1, rows: 1, color: 'lightgreen'},
    {text: '', cols: 1, rows: 1, color: 'lightpink'},
    {text: '', cols: 1, rows: 1, color: 'lightgreen'},
    {text: '', cols: 1, rows: 1, color: 'lightpink'},
    {text: '', cols: 1, rows: 4, color: 'lightblue'},
    {text: '', cols: 2, rows: 1, color: 'lightgreen'},
    {text: '', cols: 3, rows: 1, color: '#DDBDF1'},
    {text: '', cols: 2, rows: 1, color: 'lightgreen'},
    {text: '', cols: 3, rows: 1, color: '#DDBDF1'},
    {text: '', cols: 2, rows: 1, color: 'lightgreen'},
    {text: '', cols: 3, rows: 1, color: '#DDBDF1'},
    {text: '', cols: 2, rows: 1, color: 'lightgreen'},
    {text: '', cols: 3, rows: 1, color: '#DDBDF1'},
  ];

  constructor(public formBuilder: FormBuilder, private testService: TestService) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      'url': [null, [Validators.required, this.checkUrl]],
    });
  }


  getAll(): void {
    this.testService.getAll()
      .subscribe(
        res => {
          this.result = res;
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
      console.log(this.result[0], 'el post');

      this.tiles1[1].text = this.result[0].domain;
      this.tiles1[0].text = 'Aspects';
      this.tiles1[6].text = this.result[0].text;

      this.tiles1[3].text = '' + this.result[0].aspects[0].aspect
      this.tiles1[2].text = 'Aspect';
      this.tiles1[5].text = '' + this.result[0].aspects[0].aspect_confidence
      this.tiles1[4].text = 'Aspect confidence';
      this.tiles1[8].text = '' + this.result[0].aspects[0].polarity
      this.tiles1[7].text = 'Polarity';
      this.tiles1[10].text = '' + this.result[0].aspects[0].polarity_confidence;
      this.tiles1[9].text = 'Polarity Confidence';

      this.tiles2[0].text = 'Sentences';
      this.tiles2[1].text = 'Text';
      this.tiles2[2].text = this.result[0].sentences[0].text;
      this.tiles2[3].text = 'Polarity';
      this.tiles2[4].text = this.result[0].sentences[0].polarity;
      this.tiles2[5].text = 'Polarity confidence';
      this.tiles2[6].text = this.result[0].sentences[0].polarity_confidence;

      this.tiles2[7].text = 'Aspects';
      this.tiles2[8].text = 'Aspect';
      this.tiles2[9].text = this.result[0].sentences[0].aspects[0].aspect;
      this.tiles2[10].text = 'Aspect confidence';
      this.tiles2[9].text = this.result[0].sentences[0].aspects[0].aspect_confidence;
      this.tiles2[10].text = 'Polarity';
      this.tiles2[11].text = this.result[0].sentences[0].aspects[0].polarity;
      this.tiles2[12].text = 'Polarity confidence';
      this.tiles2[13].text = this.result[0].sentences[0].aspects[0].polarity_confidence;

      this.tiles2[14].text = 'Sentences';
      this.tiles2[15].text = 'Text';
      this.tiles2[16].text = this.result[0].sentences[0].text;
      this.tiles2[17].text = 'Polarity';
      this.tiles2[18].text = this.result[0].sentences[0].polarity;
      this.tiles2[19].text = 'Polarity confidence';
      this.tiles2[20].text = this.result[0].sentences[0].polarity_confidence;

      this.tiles2[21].text = 'Aspects';
      this.tiles2[22].text = 'Aspect';
      this.tiles2[23].text = this.result[0].sentences[1].aspects[0].aspect;
      this.tiles2[24].text = 'Aspect confidence';
      this.tiles2[25].text = this.result[0].sentences[1].aspects[0].aspect_confidence;
      this.tiles2[26].text = 'Polarity';
      this.tiles2[27].text = this.result[0].sentences[1].aspects[0].polarity;
      this.tiles2[28].text = 'Polarity confidence';
      this.tiles2[29].text = this.result[0].sentences[1].aspects[0].polarity_confidence;

    }
  }

  clear($event) {
    $event.preventDefault();
    this.result = '';
    this.form.get('url').setValue('');
  }
  
}

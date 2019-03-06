import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-test-caracter-form',
  templateUrl: './test-caracter-form.component.html',
  styleUrls: ['./test-caracter-form.component.css']
})
export class TestCaracterFormComponent implements OnInit {

  caracterControl: FormControl;

  constructor() { }

  ngOnInit() {
    this.caracterControl = new FormControl(
      {
        name: '',
        ca: 0,
        maxHp: 0,
        hp: 0,
        dext_mod: 0,
        strength_mod: 0,
      }
    );
  }

}

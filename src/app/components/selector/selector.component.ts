import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  @Input() options: Object;
  @Output() setFields: EventEmitter<Object> = new EventEmitter<Object>();

  fieldsSelected = {
    x: '',
    y: ''
  }

  constructor() { }

  ngOnInit() {
  }

  handleChangeX(e) {
    this.fieldsSelected.x = e.target.value;
  }
  handleChangeY(e) {
    this.fieldsSelected.y = e.target.value;
  }
  handleSubmit() {
    this.setFields.emit(this.fieldsSelected)
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  @Output()
  setData: EventEmitter<object> = new EventEmitter<object>();

  inputData: String = '';
  error: String = ''

  constructor() { 
    this.inputData = inputPlaceholder
  }

  ngOnInit() {
  }

  compareObj(obj1, obj2) {
  var props1 = Object.getOwnPropertyNames(obj1);
  var props2 = Object.getOwnPropertyNames(obj2);
  if (props1.length !== props2.length) return false;

  for(var i = 0; i <= props1.length; i++) {
      var propName = props1[i];
      if(typeof obj1[propName] !== typeof obj2[propName]) return false;
  }
  return true;
  }

  checkInput(value) {
    try {
        const dataObj = JSON.parse(value);
        if (Array.isArray(dataObj)) {
            if (dataObj.every(object => {
                return this.compareObj(dataObj[0], object)
            })) {
                this.error = '';
                this.setData.emit(dataObj);
            } else {
                this.error = 'Gli oggetti devono avere la stessa struttura';
            }     
        } else {
            this.error = 'L\'input deve contenere un array';
        }
    } catch (e) {
        console.log(e);
        this.error = 'Formato JSON non valido'; 
    }
  }
  onSubmit() {
    this.checkInput(this.inputData);
  }

  textareaStyle() {
    if(this.error == '') {
      return { border: "1px solid #33cc33" }
    } else {
      return { border: "1px solid red"}
    }
  }

}

const inputPlaceholder = 
`[
  { "Anno": 1900,
    "Popolazione": 30000,
    "Case": 5000
  },
  { "Anno": 1950,
    "Popolazione": 50000,
    "Case": 15000
  },
  { "Anno": 2000,
    "Popolazione": 70000,
    "Case": 12000
  },
  { "Anno": 2010,
    "Popolazione": 60000,
    "Case": 18000
  },
  { "Anno": 2020,
    "Popolazione": 90000,
    "Case": 16000
  }
]`

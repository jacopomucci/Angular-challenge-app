import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { dataPlaceholder } from "./mocks/mock-data";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
})
export class InputComponent implements OnInit {
  @Output()
  setData: EventEmitter<object> = new EventEmitter<object>();

  inputData = "";
  error: string;

  constructor() {}

  ngOnInit() {
    this.inputData = dataPlaceholder;
  }

  compareObj(obj1, obj2) {
    const props1 = Object.getOwnPropertyNames(obj1);
    const props2 = Object.getOwnPropertyNames(obj2);
    if (props1.length !== props2.length) return false;

    for (let i = 0; i <= props1.length; i++) {
      const propName = props1[i];
      if (typeof obj1[propName] !== typeof obj2[propName]) return false;
    }

    return true;
  }

  validateInput() {
    this.error = null;
    try {
      const dataObj = JSON.parse(this.inputData);
      if (Array.isArray(dataObj)) {
        if (
          dataObj.every((object) => {
            return this.compareObj(dataObj[0], object);
          })
        ) {
          this.setData.emit(dataObj);
        } else {
          this.error = "Gli oggetti devono avere la stessa struttura";
        }
      } else {
        this.error = "L'input deve contenere un array";
      }
    } catch (e) {
      this.error = "Formato JSON non valido";
    }
  }

  textareaStyle() {
    if (this.error) {
      return { border: "1px solid red" };
    } else {
      return { border: "1px solid #33cc33" };
    }
  }
}

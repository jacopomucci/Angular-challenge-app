import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";

import { mockData } from "./mocks/mock-data";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";

export function compareObj(obj1: any, obj2: any) {
  const props1 = Object.getOwnPropertyNames(obj1);
  const props2 = Object.getOwnPropertyNames(obj2);
  if (props1.length !== props2.length) return false;

  for (let i = 0; i <= props1.length; i++) {
    const propName = props1[i];
    if (typeof obj1[propName] !== typeof obj2[propName]) return false;
  }

  return true;
}

enum InputError {
  INVALID_JSON,
  INVALID_STRUCTURE,
  INVALID_ARRAY,
}

@Component({
  selector: "data-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"],
})
export class InputComponent implements OnInit {
  @ViewChild("form", { static: true }) form: NgForm;

  @Output() dataOutput = new EventEmitter<any>();

  inputData: string;
  errorMessage: string;

  sub: Subscription;

  get textareaStyle() {
    return this.errorMessage
      ? { border: "1px solid red" }
      : { border: "1px solid #33cc33" };
  }

  constructor() {}

  ngOnInit() {
    this.inputData = mockData;
    this.sub = this.form.form.valueChanges.subscribe((form) =>
      this.validateInput(form.data)
    );
  }

  validateInput(data: string) {
    try {
      const dataObj = JSON.parse(data);
      if (Array.isArray(dataObj)) {
        if (
          dataObj.every((object) => {
            return compareObj(dataObj[0], object);
          })
        ) {
          this.errorMessage = null;
          this.dataOutput.emit(dataObj);
        } else this.handleError(InputError.INVALID_STRUCTURE);
      } else this.handleError(InputError.INVALID_ARRAY);
    } catch (e) {
      this.handleError(InputError.INVALID_JSON);
    }
  }

  handleError(error: InputError) {
    if (error === InputError.INVALID_ARRAY)
      this.errorMessage = "L'input deve contenere un array";
    if (error === InputError.INVALID_JSON)
      this.errorMessage = "Formato JSON non valido";
    if (error === InputError.INVALID_STRUCTURE)
      this.errorMessage = "Gli oggetti devono avere la stessa struttura";
    this.dataOutput.emit(null);
  }
}

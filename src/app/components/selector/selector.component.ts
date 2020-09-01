import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
} from "@angular/core";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";

@Component({
  selector: "data-selector",
  templateUrl: "./selector.component.html",
  styleUrls: ["./selector.component.css"],
})
export class SelectorComponent implements OnInit, OnDestroy {
  @Input() fields: string[];
  @Output() fieldSelected = new EventEmitter<[string, string]>();

  @ViewChild("form", { static: true }) form: NgForm;

  selectedFields: [string, string] = [null, null];
  error: string;

  sub: Subscription;

  constructor() {}

  ngOnInit() {
    this.selectedFields = [this.fields[0], this.fields[1]];
    this.sub = this.form.form.valueChanges.subscribe((formValues) => {
      console.log(formValues);
      this.fieldSelected.emit([formValues.fieldX, formValues.fieldY]);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

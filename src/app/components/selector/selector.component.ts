import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-selector",
  templateUrl: "./selector.component.html",
  styleUrls: ["./selector.component.css"],
})
export class SelectorComponent implements OnInit {
  @Input() options: Object;
  @Output() fieldsSelected = new EventEmitter<[string, string]>();

  fieldX: string;
  fieldY: string;
  error: string;

  constructor() {}

  ngOnInit() {}

  selectFields() {
    this.error = null;
    if (this.fieldX && this.fieldY)
      this.fieldsSelected.emit([this.fieldX, this.fieldY]);
    else this.error = "Seleziona i campi da visualizzare!";
  }
}

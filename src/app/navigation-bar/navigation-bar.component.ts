import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "navigation-bar",
  templateUrl: "./navigation-bar.component.html",
})
export class NavigationBarComponent implements OnInit {
  @Input() showData = false;
  @Output() navigationEvt = new EventEmitter<number>();

  step = 1;

  constructor() {}

  ngOnInit() {}

  navigate(navigateTo: number) {
    this.step = navigateTo;
    this.navigationEvt.emit(this.step);
    console.log(this.step);
  }
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

import { ChessService } from "src/app/services/chess.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit, OnDestroy {
  historySubscription: Subscription = null;
  moveHistory: [] = null;
  panelOpenState: boolean = false;
  emailUrl: string = "";
  getEmail: boolean = false;
  emailFormControl = new FormControl(localStorage.getItem("email"), [
    Validators.required,
    Validators.email,
  ]);

  constructor(private chess: ChessService) {}

  ngOnInit() {
    this.historySubscription = this.chess.moveHistory.subscribe((history) => {
      this.moveHistory = history;
    });
  }

  ngOnDestroy() {
    this.historySubscription.unsubscribe();
  }

  export() {
    const email = this.emailFormControl.value;
    if (email) {
      this.generatePGNEmail();
    } else {
      this.getEmail = true;
    }
  }

  generatePGNEmail() {
    const email = this.emailFormControl.value;
    localStorage.setItem("email", email);
    const pgn = this.chess.getPgn();
    const url = `mailto:${email}?subject=Chess%20Game&body=${pgn}`;
    const ele = document.getElementById("email-link");
    ele.setAttribute("href", url);
    document.getElementById("email-link").click();
  }
}

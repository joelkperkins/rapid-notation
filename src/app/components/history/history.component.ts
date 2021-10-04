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

  constructor(private chess: ChessService) {}

  ngOnInit() {
    this.historySubscription = this.chess.moveHistory.subscribe((history) => {
      this.moveHistory = history;
    });
  }

  ngOnDestroy() {
    this.historySubscription.unsubscribe();
  }
}

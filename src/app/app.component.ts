import { Component, OnChanges, OnInit } from "@angular/core";
import { PieceModel } from "./models/piece/piece.model";
import { PositionModel } from "./models/position/position.model";
import { ChessService } from "./services/chess.service";
import { MatDialog } from "@angular/material/dialog";
import { EmailDialogComponent } from "./components/email-dialog/email-dialog.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  // board input
  activePiece: PieceModel = new PieceModel({});
  activeX: PositionModel = new PositionModel({});
  activeY: PositionModel = new PositionModel({});
  moveSAN: string = null;

  // board validation
  submitReady: boolean = false;

  constructor(private chess: ChessService, public dialog: MatDialog) {}

  ngOnInit() {
    this.chess.resetBoard.subscribe(() => {
      this.activePiece = new PieceModel({});
      this.activeX = new PositionModel({});
      this.activeY = new PositionModel({});
      this.submitReady = false;
    });
  }

  newMoveSAN(event) {
    console.log(event);
    if (event) {
      this.moveSAN = event;
      this.submitReady = true;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EmailDialogComponent, {
      width: "250px",
      data: { email: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
    });
  }
}

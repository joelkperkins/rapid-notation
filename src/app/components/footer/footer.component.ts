import { Component, OnInit, Input } from "@angular/core";
import { ChessService } from "src/app/services/chess.service";
import { MatDialog } from "@angular/material/dialog";
import { EmailDialogComponent } from "../email-dialog/email-dialog.component";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  @Input() moveSAN: string = null;
  @Input() submitReady: boolean = false;

  constructor(private chess: ChessService, public dialog: MatDialog) {}

  ngOnInit() {}

  updateGame() {
    this.chess.submitMove(this.moveSAN);
  }

  submitMove() {
    this.updateGame();
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

  endGame() {
    this.chess.endGame();
  }
}

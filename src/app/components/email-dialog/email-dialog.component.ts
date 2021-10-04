import { Component, OnInit, Inject } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ChessService } from "src/app/services/chess.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

export interface DialogData {
  email: string;
}

@Component({
  selector: "app-email-dialog",
  templateUrl: "./email-dialog.component.html",
  styleUrls: ["./email-dialog.component.scss"],
})
export class EmailDialogComponent implements OnInit {
  emailFormControl = new FormControl(localStorage.getItem("email"), [
    Validators.required,
    Validators.email,
  ]);
  getEmail: boolean = true;
  constructor(
    private chess: ChessService,
    public dialogRef: MatDialogRef<EmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
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

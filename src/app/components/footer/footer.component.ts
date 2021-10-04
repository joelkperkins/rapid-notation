import { Component, OnInit, Input } from "@angular/core";
import { PieceModel } from "src/app/models/piece/piece.model";
import { PositionModel } from "src/app/models/position/position.model";
import { ChessService } from "src/app/services/chess.service";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent implements OnInit {
  @Input() moveSAN: string = null;
  @Input() submitReady: boolean = false;

  constructor(private chess: ChessService) {}

  ngOnInit() {}

  updateGame() {
    this.chess.submitMove(this.moveSAN);
  }

  submitMove() {
    this.updateGame();
  }
}

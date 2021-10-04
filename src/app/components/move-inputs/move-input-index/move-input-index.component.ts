import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { PieceModel } from "src/app/models/piece/piece.model";
import { PositionModel } from "src/app/models/position/position.model";
import { ChessService } from "src/app/services/chess.service";

@Component({
  selector: "app-move-input-index",
  templateUrl: "./move-input-index.component.html",
  styleUrls: ["./move-input-index.component.scss"],
})
export class MoveInputIndexComponent implements OnInit {
  // board input
  @Input() activePiece: PieceModel = null;
  @Input() activeX: PositionModel = null;
  @Input() activeY: PositionModel = null;
  @Input() moveSAN: string = null;
  @Output() newMoveSAN = new EventEmitter<string>();

  // board validation
  validNextMoves: any = null;
  submitReady: boolean = false;
  ambiguousKnightMoves: any = null;
  knightOptions: any = null;
  ambiguousRookMoves: any = null;
  rookOptions: any = null;

  constructor(private chess: ChessService) {}

  ngOnInit() {}

  newSelection(event) {
    this.selectPiece(event);
  }

  selectPiece(event) {
    this.activePiece = event;
    this.newTotalPosition();
  }

  newPosition(event) {
    this.selectPosition(event);
  }

  selectPosition(event) {
    this.activeX = event.x || {};
    this.activeY = event.y || {};
    if (event.x && event.y) {
      this.newTotalPosition();
    }
  }

  newTotalPosition() {
    if (
      this.activePiece.value != null &&
      this.activeX.value != null &&
      this.activeY.value != null
    ) {
      const x = this.activeX.value as string;
      const y = this.activeY.value as string;
      let piece = this.activePiece.value as string;
      const moves = this.chess.getValidMoves(true).filter((m) => {
        const pieceName = piece.toLowerCase();
        const positionName = x + y;
        if (m.piece === pieceName && m.to === positionName) {
          if (this.activePiece.modifier != null) {
            if (this.activePiece.modifier === m.from.split("")[0]) {
              return m;
            }
          } else {
            return m;
          }
        }
      });
      if (moves[0]) {
        this.moveSAN = moves[0].san;
        this.newMoveSAN.emit(this.moveSAN);
      }
    }
  }

  checkRookAmbiguity() {
    this.ambiguousRookMoves = this.validNextMoves
      .filter((m) => m.piece === "r")
      .reduce((acc, curr) => {
        if (acc !== true || !acc[curr.to]) {
          acc[curr.to] = true;
        } else {
          acc = true;
        }
        return acc;
      }, {});
    if (this.ambiguousRookMoves) {
      this.rookOptions = this.validNextMoves
        .filter((m) => {
          if (m.piece === "r") {
            return m.from;
          }
        })
        .reduce((acc, curr) => {
          if (!acc[curr]) {
            acc[curr] = true;
          }
          return acc;
        }, {});
    }
  }
}

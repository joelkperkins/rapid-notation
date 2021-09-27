import { Component, OnInit } from "@angular/core";
import { PieceModel } from "src/app/models/piece/piece.model";
import { PositionModel } from "src/app/models/position/position.model";
import { ChessService } from "src/app/services/chess.service";

@Component({
  selector: "app-move-input-index",
  templateUrl: "./move-input-index.component.html",
  styleUrls: ["./move-input-index.component.scss"],
})
export class MoveInputIndexComponent implements OnInit {
  validNextMoves: any = null;

  // board input
  activePiece: PieceModel = new PieceModel({});
  activeX: PositionModel = new PositionModel({});
  activeY: PositionModel = new PositionModel({});
  moveSAN: string = null;

  // board validation
  submitReady: boolean = false;
  ambiguousKnightMoves: any = null;
  knightOptions: any = null;
  ambiguousRookMoves: any = null;
  rookOptions: any = null;

  constructor(private chess: ChessService) {}

  ngOnInit() {
    this.chess.resetBoard.subscribe(() => {
      this.getMoves();
      this.activePiece = new PieceModel({});
      this.activeX = new PositionModel({});
      this.activeY = new PositionModel({});
      this.submitReady = false;
    });
  }

  getMoves() {
    this.validNextMoves = this.chess.getValidMoves(true);
  }

  submitMove() {
    this.updateGame();
  }

  updateGame() {
    this.chess.submitMove(this.moveSAN);
  }

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
        console.log(m);
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
      console.log(moves);
      if (moves[0]) {
        this.moveSAN = moves[0].san;
        this.submitReady = true;
      }
    }
  }

  getPieceName(p) {
    switch (p) {
      case "K":
        return "King";
      case "Q":
        return "Queen";
      case "R":
        return "Rook";
      case "B":
        return "Bishop";
      case "N":
        return "Knight";
      case "P":
        return "Pawn";
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

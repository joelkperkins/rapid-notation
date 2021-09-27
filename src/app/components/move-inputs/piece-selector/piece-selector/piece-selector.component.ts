import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ChessService } from "src/app/services/chess.service";
import { PieceModel } from "../../../../models/piece/piece.model";

@Component({
  selector: "app-piece-selector",
  templateUrl: "./piece-selector.component.html",
  styleUrls: ["./piece-selector.component.scss"],
})
export class PieceSelectorComponent implements OnInit {
  @Input() currentPiece: PieceModel = null;
  @Input() validNextMoves: any = null;
  @Output() newPieceSelected = new EventEmitter<PieceModel>();
  validPieces: any = null;
  ambiguousInput: boolean = null;
  ambiguousKnightMoves: any[] = [];
  ambiguousRookMoves: any[] = [];
  activeTurn: string = "w";

  pieceOptions1: PieceModel[] = [
    new PieceModel({
      label: "K",
      value: "K",
      white: "../../../../../assets/img/w_king.svg",
      black: "../../../../../assets/img/b_king.svg",
      modifier: null,
    }),
    new PieceModel({
      label: "Q",
      value: "Q",
      white: "../../../../../assets/img/w_queen.svg",
      black: "../../../../../assets/img/b_queen.svg",
      modifier: null,
    }),
    new PieceModel({
      label: "R",
      value: "R",
      white: "../../../../../assets/img/w_rook.svg",
      black: "../../../../../assets/img/b_rook.svg",
      modifier: null,
    }),
  ];
  pieceOptions2: PieceModel[] = [
    new PieceModel({
      label: "B",
      value: "B",
      white: "../../../../../assets/img/w_bishop.svg",
      black: "../../../../../assets/img/b_bishop.svg",
      modifier: null,
    }),
    new PieceModel({
      label: "N",
      value: "N",
      white: "../../../../../assets/img/w_knight.svg",
      black: "../../../../../assets/img/b_knight.svg",
      modifier: null,
    }),
    new PieceModel({
      label: "P",
      value: "P",
      white: "../../../../../assets/img/w_pawn.svg",
      black: "../../../../../assets/img/b_pawn.svg",
      modifier: null,
    }),
  ];

  constructor(private chess: ChessService) {}

  ngOnInit() {
    this.chess.resetBoard.subscribe(() => {
      this.getValidMoveOptions();
      this.ambiguousKnightMoves = this.chess.getAmbiguousKnight();
      this.ambiguousRookMoves = this.chess.getAmbiguousRook();
      this.currentPiece = null;
      this.ambiguousInput = false;
      this.activeTurn = this.chess.getTurn();
    });
  }

  getValidMoveOptions() {
    this.validPieces = this.chess.getPiecesWithMoves();
  }

  updatePieceSelection(event) {
    this.currentPiece = event;
    if (this.ambiguousKnightMoves && this.currentPiece.value === "N") {
      this.ambiguousInput = true;
    } else if (this.ambiguousRookMoves && this.currentPiece.value === "R") {
      this.ambiguousInput = true;
    } else {
      this.newPieceSelected.emit(event);
    }
  }

  updateAmbiguosPieceSelection(event) {
    this.currentPiece.modifier = event;
    this.newPieceSelected.emit(this.currentPiece);
  }
}

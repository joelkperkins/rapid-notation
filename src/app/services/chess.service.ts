import { Injectable } from "@angular/core";
import Chess from "chess.js";
import { Subject, BehaviorSubject, Observable } from "rxjs";
import { PieceModel } from "../models/piece/piece.model";

@Injectable({
  providedIn: "root",
})
export class ChessService {
  game: any = new Chess();

  private _moveHistory: Subject<[]> = new BehaviorSubject<[]>([]);
  public readonly moveHistory: Observable<[]> =
    this._moveHistory.asObservable();

  private _resetBoard: Subject<boolean> = new BehaviorSubject<boolean>(false);
  public readonly resetBoard: Observable<boolean> =
    this._resetBoard.asObservable();

  constructor() {}

  endGame() {
    this._resetBoard.next(true);
    this.game = new Chess();
    this._moveHistory.next(this.game.history());
  }

  submitMove(move) {
    const res = this.game.move(move);
    this._moveHistory.next(this.game.history());
    // reset board inputs
    this._resetBoard.next(true);
  }

  getValidMoves(verbose?: boolean) {
    return this.game.moves({ verbose: verbose || false });
  }

  getPiecesWithMoves() {
    return this.getValidMoves(true)
      .map((m) => m.piece)
      .reduce((acc, curr) => {
        const currValue = curr.toUpperCase();
        if (!acc[currValue]) {
          acc[currValue] = true;
        }
        return acc;
      }, {});
  }

  getValidPositions(piece) {
    const moves = this.getValidMoves(true);
    return moves.filter((m) => m.piece === piece.value.toLowerCase());
  }

  getValidYPositions(piece) {
    const moves = this.getValidMoves(true);
    return moves
      .filter((m) => m.piece === piece.value.toLowerCase())
      .map((m) => m.to.split("")[1]);
  }

  getAmbiguousKnight() {
    const moves = this.getValidMoves(true);
    const knightMoves = moves.filter((m) => m.piece === "n");
    const ambiguousKnightMoves = knightMoves.reduce((acc, curr) => {
      if (!acc[curr.to]) {
        acc[curr.to] = [curr];
      } else {
        acc[curr.to].push(curr);
      }
      return acc;
    }, {});
    const ambiguousMoves = (Object.values(ambiguousKnightMoves) as any[])
      .filter((v) => v.length > 1)
      .map((v) => v.map((v1) => v1.from.split("")[0]));

    return ambiguousMoves.length > 0 ? ambiguousMoves[0] : null;
  }

  getAmbiguousRook() {
    const moves = this.getValidMoves(true);
    const rookMoves = moves.filter((m) => m.piece === "r");
    const ambiguousRookMoves = rookMoves.reduce((acc, curr) => {
      if (!acc[curr.to]) {
        acc[curr.to] = [curr];
      } else {
        acc[curr.to].push(curr);
      }
      return acc;
    }, {});
    const ambiguousMoves = (Object.values(ambiguousRookMoves) as any[])
      .filter((v) => v.length > 1)
      .map((v) => v.map((v1) => v1.from.split("")[0]));

    return ambiguousMoves.length > 0 ? ambiguousMoves[0] : null;
  }

  getPgn() {
    this.game.header("White", "Magnus", "Black", "Hikaru");
    return this.game.pgn();
  }

  getTurn() {
    return this.game.turn();
  }
}

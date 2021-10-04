import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  SimpleChange,
} from "@angular/core";
import { PieceModel } from "src/app/models/piece/piece.model";
import { PositionModel } from "src/app/models/position/position.model";
import { ChessService } from "src/app/services/chess.service";

interface IPosition {
  x: PositionModel;
  y: PositionModel;
}

@Component({
  selector: "app-position-selector",
  templateUrl: "./position-selector.component.html",
  styleUrls: ["./position-selector.component.scss"],
})
export class PositionSelectorComponent implements OnInit, OnChanges {
  @Input() activePiece: PieceModel = null;
  @Input() currX: PositionModel = null;
  @Input() currY: PositionModel = null;
  validPositions: any = null;
  validPositionsX: any = null;
  validPositionsY: any = null;
  @Output() newPosition = new EventEmitter<IPosition>();

  positionXOptions1: PositionModel[] = [
    new PositionModel({
      value: "a",
      label: "a",
    }),
    new PositionModel({
      value: "b",
      label: "b",
    }),
    new PositionModel({
      value: "c",
      label: "c",
    }),
    new PositionModel({
      value: "d",
      label: "d",
    }),
  ];
  positionXOptions2: PositionModel[] = [
    new PositionModel({
      value: "e",
      label: "e",
    }),
    new PositionModel({
      value: "f",
      label: "f",
    }),
    new PositionModel({
      value: "g",
      label: "g",
    }),
    new PositionModel({
      value: "h",
      label: "h",
    }),
  ];

  positionYOptions1: PositionModel[] = [
    new PositionModel({
      value: "1",
      label: "1",
    }),
    new PositionModel({
      value: "2",
      label: "2",
    }),
    new PositionModel({
      value: "3",
      label: "3",
    }),
    new PositionModel({
      value: "4",
      label: "4",
    }),
  ];
  positionYOptions2: PositionModel[] = [
    new PositionModel({
      value: "5",
      label: "5",
    }),
    new PositionModel({
      value: "6",
      label: "6",
    }),
    new PositionModel({
      value: "7",
      label: "7",
    }),
    new PositionModel({
      value: "8",
      label: "8",
    }),
  ];

  constructor(private chess: ChessService) {}

  ngOnInit() {
    this.chess.resetBoard.subscribe(() => {
      this.validPositionsX = [];
      this.validPositionsY = [];
    });
  }

  initializePositions() {
    this.validPositions = this.chess.getValidPositions(
      this.activePiece,
      this.currX
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const input in changes) {
      if (changes.hasOwnProperty(input)) {
        if (input === "activePiece") {
          if (this.activePiece && this.activePiece.value) {
            this.initializePositions();
          }
        }
      }
    }
  }

  updatePosX(event) {
    this.currX = event;
    this.currY = new PositionModel({});
    this.updatePosition();
  }

  updatePosY(event) {
    this.currY = event;
    this.updatePosition();
  }

  updatePosition() {
    this.newPosition.emit({ x: this.currX, y: this.currY });
  }

  checkDisabled(type, pos) {
    if (this.activePiece === null || this.activePiece.value === null) {
      return true;
    }
    if (
      type === "y" &&
      this.validPositions.filter((p) => {
        const curr = this.currX.value + pos.value;
        return p.to == curr;
      }).length === 0
    ) {
      return true;
    }
    if (
      this.validPositions.filter((m) => m.to.split("").includes(pos.value))
        .length === 0
    ) {
      return true;
    }
    return false;
  }
}

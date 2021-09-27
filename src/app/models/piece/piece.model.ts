export class PieceModel {
  value: null;
  label: null;
  white?: null;
  black?: null;
  modifier?: null;

  constructor(input) {
    this.value = input.value || null;
    this.label = input.label || null;
    this.white = input.white || null;
    this.black = input.black || null;
    this.modifier = input.modifier || null;
  }
}

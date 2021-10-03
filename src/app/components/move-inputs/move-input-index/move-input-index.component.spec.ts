import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MoveInputIndexComponent } from "./move-input-index.component";
import { PieceSelectorComponent } from "../piece-selector/piece-selector/piece-selector.component";
import { PositionSelectorComponent } from "../position-selector/position-selector/position-selector.component";
import { HistoryComponent } from "../../history/history.component";

import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

describe("MoveInputIndexComponent", () => {
  let component: MoveInputIndexComponent;
  let fixture: ComponentFixture<MoveInputIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatExpansionModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
      ],
      declarations: [
        MoveInputIndexComponent,
        PieceSelectorComponent,
        PositionSelectorComponent,
        HistoryComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveInputIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

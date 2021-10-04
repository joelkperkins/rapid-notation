import { TestBed, async } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { MoveInputIndexComponent } from "./components/move-inputs/move-input-index/move-input-index.component";
import { PositionSelectorComponent } from "./components/move-inputs/position-selector/position-selector/position-selector.component";
import { PieceSelectorComponent } from "./components/move-inputs/piece-selector/piece-selector/piece-selector.component";
import { HistoryComponent } from "./components/history/history.component";
import { FooterComponent } from "./components/footer/footer.component";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonToggleModule } from "@angular/material/button-toggle";

describe("AppComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatButtonModule,
        MatIconModule,
        MatButtonToggleModule,
        MatBottomSheetModule,
        MatExpansionModule,
        MatInputModule,
        FormsModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        AppComponent,
        MoveInputIndexComponent,
        PositionSelectorComponent,
        PieceSelectorComponent,
        HistoryComponent,
        FooterComponent,
      ],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HeaderComponent } from "./components/header/header.component";
import { MoveInputIndexComponent } from "./components/move-inputs/move-input-index/move-input-index.component";
import { PieceSelectorComponent } from "./components/move-inputs/piece-selector/piece-selector/piece-selector.component";
import { PositionSelectorComponent } from "./components/move-inputs/position-selector/position-selector/position-selector.component";
import { HistoryComponent } from "./components/history/history.component";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoveInputIndexComponent,
    PieceSelectorComponent,
    PositionSelectorComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

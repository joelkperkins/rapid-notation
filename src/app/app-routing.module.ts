import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MoveInputIndexComponent } from "./components/move-inputs/move-input-index/move-input-index.component";

const routes: Routes = [{ path: "", component: MoveInputIndexComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

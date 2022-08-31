import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
// angular material
// import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// import { LayoutModule } from "@angular/cdk/layout";
// import { MatToolbarModule } from "@angular/material/toolbar";
// import { MatButtonModule } from "@angular/material/button";
// import { MatSidenavModule } from "@angular/material/sidenav";
// import { MatIconModule } from "@angular/material/icon";
// import { MatListModule } from "@angular/material/list";

// app
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // angular material
    // BrowserAnimationsModule,
    // LayoutModule,
    // MatToolbarModule,
    // MatButtonModule,
    // MatSidenavModule,
    // MatIconModule,
    // MatListModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

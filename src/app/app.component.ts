import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigarationComponent } from "./page/configaration/configaration.component";
import { ButtonComponent } from "./button/button.component";
import { OutputComponent } from './output/output.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ OutputComponent, ConfigarationComponent, ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cwFronend';
}

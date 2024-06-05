import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CreateBriefingComponent } from './app/create-briefing/create-briefing.component';
import 'zone.js';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-create-briefing></app-create-briefing>
  `,
  imports: [CreateBriefingComponent, CommonModule, HttpClientModule]
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);

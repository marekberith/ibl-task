import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Hello from {{ name }}!</h1>
    <app-create-briefing></app-create-briefing>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);

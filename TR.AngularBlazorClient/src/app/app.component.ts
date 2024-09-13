import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BlazorService } from './blazor.service';
import { EventHandlingService } from './services/event-handling.service';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  constructor(
    private blazorService: BlazorService,
    private eventHandlingService: EventHandlingService
  ) { }

  ngOnInit(): void {
    // Initialize global methods for Blazor
    this.blazorService.initializeGlobalMethods();
    // Initialize global event handling
    this.eventHandlingService.initializeGlobalMethods();
  }
}

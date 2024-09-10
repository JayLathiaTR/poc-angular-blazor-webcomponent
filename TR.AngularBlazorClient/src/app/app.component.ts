import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BlazorService } from './blazor.service';

@Component({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {

  constructor(private blazorService: BlazorService) { }

  ngOnInit(): void {
    this.blazorService.initializeGlobalMethods();
  }
}

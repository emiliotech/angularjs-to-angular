import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent, HeaderTopbarComponent, LeftSidebarComponent, RightSidebarComponent } from '@core/components';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    HeaderTopbarComponent, 
    LeftSidebarComponent, 
    RightSidebarComponent,
    FooterComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  @ViewChild('scriptContainer') scriptContainer!: ElementRef;

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngAfterViewInit() {
    this.loadScripts();
  }

  loadScripts() {
    const scriptPaths = [
      'assets/dist/js/waves.js',
      'assets/dist/js/sidebarmenu.js',
      'assets/dist/js/custom.js',
    ];

    scriptPaths.forEach((path) => {
      const script = this.renderer.createElement('script');
      script.src = path;
      script.onload = () => {
        console.log(path + ' se ha cargado correctamente.');
      };
      script.onerror = () => {
        console.error('Error al cargar ' + path);
      };
      document.body.appendChild(script);
    });
  }
}

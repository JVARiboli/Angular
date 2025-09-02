import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular'

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent {

}

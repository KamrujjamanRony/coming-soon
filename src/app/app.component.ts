import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environments';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private dataService = inject(DataService);
  title = 'Coming Soon';
  countDownDate!: number;
  jsonData!: any;
  days!: string; 
  hours!: string; 
  minutes!: string; 
  seconds!: string; 

  constructor(){
  }

  ngOnInit() {
    this.dataService.getJsonData().subscribe(data => {
      this.jsonData = data;
      this.countDownDate = new Date(this.jsonData?.date).getTime();
      console.log(this.jsonData);
    });

    // Update the countdown every second
    const x = setInterval(() => {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = this.countDownDate - now;

      // Calculate the days, hours, minutes, and seconds
      this.days = this.formatTime(Math.floor(distance / (1000 * 60 * 60 * 24)));
      this.hours = this.formatTime(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      this.minutes = this.formatTime(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      this.seconds = this.formatTime(Math.floor((distance % (1000 * 60)) / 1000));

      // If the count down is finished, display a message
      if (distance < 0) {
        clearInterval(x);
        this.days = this.hours = this.minutes = this.seconds = '00';
      }
    }, 1000);
  }

  // Function to add leading zeros
  private formatTime(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}

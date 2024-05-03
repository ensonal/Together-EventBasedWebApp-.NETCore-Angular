import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'togetherapp-event-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
  styles: [`
   .mat-card {
  padding: 10px;
  position: relative;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.date-container {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1;
  padding: 5px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;

}

.event-image {
  width: 100%;
  height: 200px; 
  object-fit: cover; 
  position: absolute; 
  top: 0; 
  left: 0; 
  border-radius: 10px;
}

.details-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
}

.event-title {
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: bold;
  color: black;
}

.event-location {
  display: flex;
  align-items: center;
}

.event-location mat-icon {
  margin-right: 5px;
  font-size: 18px;
  opacity: 0.7;
}
.event-participants {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.participant-icon {
  width: 35px; 
  height: 35px;
  border-radius: 50%; 
  margin-right: -10px;
}
.event-participants p {
  margin-left: 25px; // space between icons and number of other participants
}

  `]

})

  export class EventCardComponent {
    constructor() { }
  }

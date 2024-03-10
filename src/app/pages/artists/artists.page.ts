import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppModule } from 'src/app/modules/app/app.module';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.page.html',
  styleUrls: ['./artists.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AppModule]
})
export class ArtistsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

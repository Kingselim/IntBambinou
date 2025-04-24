import { Component , OnInit} from '@angular/core';
import { PregnancyTrackingService } from 'src/app/service/pregnancy-tracking.service';
import { PregnancyTrackings } from 'src/app/model/PregnancyTracking';
@Component({
  selector: 'app-pregnancy-tracking2',
  templateUrl: './pregnancy-tracking2.component.html',
  styleUrls: ['./pregnancy-tracking2.component.css'
,"../../../assets/BackOffice/assets/css/bootstrap.min.css",
              "../../../assets/BackOffice/assets/css/demo.css",
              "../../../assets/BackOffice/assets/css/fonts.css",
              "../../../assets/BackOffice/assets/css/fonts.min.css",
              "../../../assets/BackOffice/assets/css/kaiadmin.css",
              "../../../assets/BackOffice/assets/css/kaiadmin.min.css"]
  
})
export class PregnancyTracking2Component  implements OnInit {
  PregnancyTrackings: any[] = [];

  constructor(private pregnancyTrackingService: PregnancyTrackingService) {}

  ngOnInit() {
    this.loadPregnancyTrackings();
  }
  loadPregnancyTrackings() {
    this.pregnancyTrackingService.getAllPregnancyTrackings().subscribe(
      data => {
        this.PregnancyTrackings = data.map(pt => ({
          ...pt,
          datePregnancyTracking: new Date(pt.datePregnancyTracking)
        }));
      },
      error => {
        console.error('❌ Erreur de chargement :', error);
      }
    );
  }
 
  
  

  
}

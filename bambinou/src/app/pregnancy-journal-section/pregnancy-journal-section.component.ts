import { Component , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pregnancy-journal-section',
  templateUrl: './pregnancy-journal-section.component.html',
  styleUrls: ['./pregnancy-journal-section.component.css']
})
export class PregnancyJournalSectionComponent implements OnInit {
  idTracking!: number;
  idPregnancyTracking!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idTracking = +params['id'];
      this.idPregnancyTracking = +params['id']; // ✅ solution correcte
    });
  }
  
}
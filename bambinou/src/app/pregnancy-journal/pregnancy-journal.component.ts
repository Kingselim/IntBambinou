import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PregnancyJournalService } from '../service/pregnancy-journal.service';
import { PregnancyJournal } from '../model/PregnancyJournal';
import { PregnancyTrackingService } from '../service/pregnancy-tracking.service';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
//import html2canvas from 'html2canvas';
import { ElementRef, ViewChild } from '@angular/core';

import { PregnancyTrackingComponent } from '../pregnancy-tracking/pregnancy-tracking.component';
@Component({
  selector: 'app-pregnancy-journal',
  templateUrl: './pregnancy-journal.component.html',
  styleUrls: ['./pregnancy-journal.component.css']
})

export class PregnancyJournalComponent implements OnInit {
  journalForm!: FormGroup;
  journals: PregnancyJournal[] = [];
  selectedImages: File[] = [];
  showForm = false; // formulaire caché par défaut
  editMode = false;
  editingJournalId: number | null = null;
  currentPage = 1;
itemsPerPage = 3;
idPregnancyTracking!: number;
searchText: string = '';

  constructor(
    private fb: FormBuilder,
    private journalService: PregnancyJournalService,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.journalForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      mood: ['', Validators.required],
      date: [new Date(), Validators.required]
    });

    // Charger les journaux existants
    this.journalService.getAllJournals().subscribe((data) => {
      this.journals = data;
    });
    this.route.params.subscribe(params => {
      this.idPregnancyTracking = +params['id'];
      this.journalService.getByTrackingId(this.idPregnancyTracking).subscribe(data => {
        this.journals = data;
      });
    });
    
  }
  resetFormState(): void {
    this.journalForm.reset();
    this.journalForm.patchValue({ date: new Date() });
    this.selectedImages = [];
    this.editMode = false;
    this.editingJournalId = null;
    this.hideForm(); // ⬅️ retour aux cards
  }
  
  
  submitJournal(): void {
    if (this.journalForm.invalid) return;
  
    const formData = new FormData();
    formData.append('title', this.journalForm.value.title);
    formData.append('content', this.journalForm.value.content);
    formData.append('mood', this.journalForm.value.mood);
    formData.append('date', this.journalForm.value.date);
    formData.append('idPregnancyTracking', this.idPregnancyTracking.toString());

    this.selectedImages.forEach((file) => {
      formData.append('images', file);
    });
  
    if (this.editMode && this.editingJournalId) {
      // 🔁 UPDATE
      this.journalService.updateJournal(this.editingJournalId, formData).subscribe({
        next: (updated) => {
          // ✅ recharger depuis le backend pour être sûr
          this.journalService.getAllJournals().subscribe(journals => {
            this.journals = journals;
            this.resetFormState(); // ferme le formulaire
          });
        },
        error: (err) => console.error(err)
      });
   
  
    } else {
      // ✅ CREATE
      this.journalService.uploadImage(formData).subscribe({
        next: (saved) => {
          this.journals.push(saved);
          this.resetFormState();
        },
        error: (err) => console.error(err)
      });
    }
  }
  
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedImages = Array.from(input.files);
    }
  }
  
  toggleForm(): void {
    this.showForm = true; // Afficher uniquement le formulaire
  }
  
  hideForm(): void {
    this.showForm = false; // Revenir à l'affichage des cartes
  }
  editJournal(journal: PregnancyJournal): void {
    this.editMode = true;
    this.editingJournalId = journal.id ?? null;
    this.showForm = true;
  
    this.journalForm.patchValue({
      title: journal.title,
      content: journal.content,
      mood: journal.mood,
      date: journal.date
    });
  }
  deleteJournal(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce journal ?')) {
      this.journalService.deleteJournal(id).subscribe({
        next: () => {
          this.journals = this.journals.filter(journal => journal.id !== id);
        },
        error: (err) => console.error(err)
      });
    }
  }
  get paginatedJournals(): PregnancyJournal[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredJournals.slice(start, start + this.itemsPerPage);
  }
  
  get totalPages(): number {
    return Math.ceil(this.journals.length / this.itemsPerPage);
  }
  get filteredJournals(): PregnancyJournal[] {
    return this.journals.filter(journal =>
      journal.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      journal.content.toLowerCase().includes(this.searchText.toLowerCase()) ||
      journal.mood.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  generatePdf(): void {
    const doc = new jsPDF();
    
    // Couleurs
    const primaryColor = [234, 84, 128]; // Rose
    const secondaryColor = [66, 165, 245]; // Bleu
    const darkColor = [40, 40, 40]; // Noir
    const lightColor = [100, 100, 100]; // Gris
    
    let y = 25;
    
    // En-tête
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 220, 15, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text('Mes Journaux de Grossesse', 105, 10, { align: 'center' });
    
    // Sous-titre
    doc.setFontSize(10);
    doc.setTextColor(lightColor[0], lightColor[1], lightColor[2]);
    doc.text(`Généré le ${new Date().toLocaleDateString()} - ${this.journals.length} entrées`, 105, 18, { align: 'center' });
    
    y += 20;
    
    this.journals.forEach((journal, index) => {
        // Carte de journal
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFillColor(255, 240, 245); // Fond rose très clair
        doc.roundedRect(15, y, 180, 65, 3, 3, 'FD');
        
        // En-tête de carte
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.text(`Journal du ${new Date(journal.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })}`, 25, y + 12);
        
        // Titre
        doc.setFontSize(12);
        doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
        doc.text(`Titre: ${journal.title}`, 25, y + 20);
        
        // Humeur
        doc.setFont('helvetica', 'bold');
        doc.text(`Humeur: ${journal.mood}`, 140, y + 20);
        
        // Séparateur
        doc.setDrawColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        doc.setLineWidth(0.3);
        doc.line(25, y + 25, 185, y + 25);
        
        // Contenu
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        const contentLines = doc.splitTextToSize(journal.content, 160);
        doc.text(contentLines, 25, y + 35);
        
        y += 75;
        
        // Saut de page si nécessaire
        if (y > 260) {
            // Pied de page
            doc.setFontSize(9);
            doc.setTextColor(lightColor[0], lightColor[1], lightColor[2]);
            doc.text(`Page ${doc.getNumberOfPages()}`, 105, 285, { align: 'center' });
            
            doc.addPage();
            y = 25;
            
            // En-tête des pages suivantes
            doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
            doc.rect(0, 0, 220, 15, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(14);
            doc.setTextColor(255, 255, 255);
            doc.text('Suite des Journaux de Grossesse', 105, 10, { align: 'center' });
        }
    });
    
    // Pied de page final
    doc.setFontSize(9);
    doc.setTextColor(lightColor[0], lightColor[1], lightColor[2]);
    doc.text(`Page ${doc.getNumberOfPages()}`, 105, 285, { align: 'center' });
    
    // Signature
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    doc.text('Document généré automatiquement', 105, 290, { align: 'center' });
    
    doc.save('journal_grossesse.pdf');
}
}

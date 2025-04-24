package tn.esprit.bambinou.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.bambinou.Entity.PregnancyJournal;
import tn.esprit.bambinou.Service.IPregnancyJournalService;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/journal")
//@RequiredArgsConstructor
public class PregnancyJournalController {

    private final IPregnancyJournalService journalService;
    public PregnancyJournalController(IPregnancyJournalService journalService) {
        this.journalService = journalService;
    }

    @GetMapping
    public List<PregnancyJournal> getAllJournals() {
        return journalService.getAllJournals();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PregnancyJournal> getJournalById(@PathVariable Long id) {
        return journalService.getJournalById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public PregnancyJournal saveJournal(@RequestBody PregnancyJournal entry) {
        return journalService.saveJournal(entry);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PregnancyJournal> updateJournalWithImages(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("mood") String mood,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam("idPregnancyTracking") Long idPregnancyTracking, // ✅ AJOUTÉ ICI
            @RequestParam(value = "images", required = false) List<MultipartFile> images
    ) {
        PregnancyJournal updated = journalService.updateJournalWithImages(
                id, title, content, mood, date, idPregnancyTracking, images); // ✅ AJOUTÉ ICI
        return ResponseEntity.ok(updated);
    }




    @DeleteMapping("/{id}")
    public void deleteJournal(@PathVariable Long id) {
        journalService.deleteJournal(id);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<PregnancyJournal> uploadJournalWithImages(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("mood") String mood,
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestParam("idPregnancyTracking") Long idPregnancyTracking,
            @RequestParam("images") List<MultipartFile> images
    ) {
        PregnancyJournal journal = journalService.saveJournalWithImages(title, content, mood, date, idPregnancyTracking, images);
        return ResponseEntity.ok(journal);
    }




    @GetMapping("/tracking/{id}")
    public List<PregnancyJournal> getByTrackingId(@PathVariable Long id) {
        return journalService.getByIdPregnancyTracking(id);
    }
}

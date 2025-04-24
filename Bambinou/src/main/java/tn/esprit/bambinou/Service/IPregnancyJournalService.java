package tn.esprit.bambinou.Service;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.bambinou.Entity.PregnancyJournal;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.bambinou.Entity.PregnancyJournal;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface IPregnancyJournalService {

    PregnancyJournal saveJournal(PregnancyJournal journal);

    Optional<PregnancyJournal> getJournalById(Long id);

    List<PregnancyJournal> getAllJournals();

    PregnancyJournal updateJournal(Long id, PregnancyJournal updatedJournal);

    void deleteJournal(Long id);

    String uploadImage(MultipartFile file) throws IOException;

    PregnancyJournal saveJournalWithImages(String title, String content, String mood, LocalDate date, Long idPregnancyTracking, List<MultipartFile> images);

    PregnancyJournal updateJournalWithImages(Long id, String title, String content, String mood, LocalDate date, Long idPregnancyTracking, List<MultipartFile> images);

    List<PregnancyJournal> getByIdPregnancyTracking(Long id);
}
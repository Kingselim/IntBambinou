package tn.esprit.bambinou.Service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.bambinou.Entity.PregnancyJournal;
import tn.esprit.bambinou.Repository.PregnancyJournalRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.bambinou.Entity.PregnancyJournal;
import tn.esprit.bambinou.Entity.PregnancyTracking;
import tn.esprit.bambinou.Repository.PregnancyJournalRepository;
import tn.esprit.bambinou.Repository.PregnancyTrackingRepository;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
//@RequiredArgsConstructor
public class PregnancyJournalServiceImpl implements IPregnancyJournalService {

    private final PregnancyJournalRepository repository;
    @Autowired
    private PregnancyTrackingRepository pregnancyTrackingRepository;

    @Autowired
    public PregnancyJournalServiceImpl(PregnancyJournalRepository repository) {
        this.repository = repository;
    }

    @Override
    public PregnancyJournal saveJournal(PregnancyJournal journal) {
        return repository.save(journal);
    }

    @Override
    public Optional<PregnancyJournal> getJournalById(Long id) {
        return repository.findById(id);
    }

    @Override
    public List<PregnancyJournal> getAllJournals() {
        return repository.findAll();
    }

    @Override
    public PregnancyJournal updateJournal(Long id, PregnancyJournal updatedJournal) {
        updatedJournal.setId(id);
        return repository.save(updatedJournal);
    }

    @Override
    public void deleteJournal(Long id) {
        repository.deleteById(id);
    }

    @Override
    public String uploadImage(MultipartFile file) throws IOException {
        String uploadDir = "uploads/";
        File directory = new File(uploadDir);
        if (!directory.exists()) directory.mkdirs();

        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        String filePath = uploadDir + fileName;
        file.transferTo(new File(filePath));

        return "http://localhost:8089/" + filePath;
    }

    @Override
    public PregnancyJournal saveJournalWithImages(String title, String content, String mood, LocalDate date, Long idPregnancyTracking, List<MultipartFile> images) {
        PregnancyJournal journal = new PregnancyJournal();
        journal.setTitle(title);
        journal.setContent(content);
        journal.setMood(mood);
        journal.setDate(date);
        // journal.setIdPregnancyTracking(idPregnancyTracking);
        // 🔁 Associer le tracking par son ID
        PregnancyTracking tracking = pregnancyTrackingRepository.findById(idPregnancyTracking)
                .orElseThrow(() -> new RuntimeException("PregnancyTracking not found"));
        journal.setPregnancyTracking(tracking);
        List<String> imageNames = new ArrayList<>();
        for (MultipartFile image : images) {
            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path filePath = Paths.get("uploads/" + fileName);
            try {
                Files.write(filePath, image.getBytes());
                imageNames.add(fileName);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        journal.setImageUrls(String.join(",", imageNames));
        return repository.save(journal);
    }

    @Override
    public PregnancyJournal updateJournalWithImages(Long id, String title, String content, String mood, LocalDate date, Long idPregnancyTracking, List<MultipartFile> images) {
        PregnancyJournal existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Journal not found"));

        existing.setTitle(title);
        existing.setContent(content);
        existing.setMood(mood);
        existing.setDate(date);
        // existing.setIdPregnancyTracking(idPregnancyTracking);
        PregnancyTracking tracking = pregnancyTrackingRepository.findById(idPregnancyTracking)
                .orElseThrow(() -> new RuntimeException("PregnancyTracking not found"));
        existing.setPregnancyTracking(tracking);
        if (images != null && !images.isEmpty()) {
            StringBuilder imageUrls = new StringBuilder();
            for (MultipartFile image : images) {
                String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();
                Path filePath = Paths.get("uploads/" + fileName);
                try {
                    Files.write(filePath, image.getBytes());
                    imageUrls.append(fileName).append(",");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            existing.setImageUrls(imageUrls.toString().replaceAll(",$", ""));
        }

        return repository.save(existing);
    }

    @Override
    public List<PregnancyJournal> getByIdPregnancyTracking(Long id) {
        return repository.findByPregnancyTracking_IdPregnancyTracking(id);
    }
}
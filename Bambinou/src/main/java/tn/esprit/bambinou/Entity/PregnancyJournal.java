package tn.esprit.bambinou.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PregnancyJournal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private LocalDate date;

    private String mood;
    // private Long idPregnancyTracking;
    @ManyToOne
    @JoinColumn(name = "id_pregnancy_tracking")
    private PregnancyTracking pregnancyTracking;


    @Column(length = 5000)
    private String content;

    // Store image URLs as a list
    @Column(length = 1000)
    private String imageUrls;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getMood() {
        return mood;
    }

    public void setMood(String mood) {
        this.mood = mood;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(String imageUrls) {
        this.imageUrls = imageUrls;
    }

    public PregnancyTracking getPregnancyTracking() {
        return pregnancyTracking;
    }

    public void setPregnancyTracking(PregnancyTracking pregnancyTracking) {
        this.pregnancyTracking = pregnancyTracking;
    }
}
    /*public PregnancyJournal(Long id, String title, LocalDate date, String mood, String content, String imageUrls) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.mood = mood;
        this.content = content;
        this.imageUrls = imageUrls;
    }*/


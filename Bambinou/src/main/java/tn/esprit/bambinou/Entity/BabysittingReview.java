package tn.esprit.bambinou.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BabysittingReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReview;

    private int rating; // exemple : 1 à 5 étoiles

    private String comment;

    private Date reviewDate;
    private String name; // 🟢 important !


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewer_id")
    @JsonIgnoreProperties({"password", "email", "age"})
    private User reviewer; // le parent qui laisse l'avis

    @ManyToOne
    @JoinColumn(name = "babysitting_id")
    @JsonIgnoreProperties({"password", "email", "age"})
    private Babysitting babysitting; // le contrat concerné
    public Long getIdReview() {
        return idReview;
    }

    public int getRating() {
        return rating;
    }

    public String getComment() {
        return comment;
    }

    public Date getReviewDate() {
        return reviewDate;
    }

    public User getReviewer() {
        return reviewer;
    }

    public Babysitting getBabysitting() {
        return babysitting;
    }
    public void setBabysitting(Babysitting babysitting) {
        this.babysitting = babysitting;
    }
    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }
    @Transient
    private Long babysittingId;
    public Long getBabysittingId() {
        return babysittingId;
    }
    public void setBabysittingId(Long babysittingId) {
        this.babysittingId = babysittingId;
    }


}

package tn.esprit.bambinou.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
public class Babysitting {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBabysitting;

    @Temporal(TemporalType.DATE)
    private Date startDate;

    @Temporal(TemporalType.DATE)
    private Date endDate;

    private Long duration;
    private Float salary;
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    @ManyToOne
    @JoinColumn(name = "babysitter_id")
    private User babysitter;

    @OneToMany(mappedBy = "babysitting", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Baby> babies;

    @OneToMany(mappedBy = "babysitting", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<BabysittingReview> reviews;

    // ====== GETTERS & SETTERS ======

    public Long getIdBabysitting() {
        return idBabysitting;
    }

    public void setIdBabysitting(Long idBabysitting) {
        this.idBabysitting = idBabysitting;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Long getDuration() {
        return duration;
    }

    public void setDuration(Long duration) {
        this.duration = duration;
    }

    public Float getSalary() {
        return salary;
    }

    public void setSalary(Float salary) {
        this.salary = salary;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getBabysitter() {
        return babysitter;
    }

    public void setBabysitter(User babysitter) {
        this.babysitter = babysitter;
    }

    public List<Baby> getBabies() {
        return babies;
    }

    public void setBabies(List<Baby> babies) {
        this.babies = babies;
    }

    public List<BabysittingReview> getReviews() {
        return reviews;
    }

    public void setReviews(List<BabysittingReview> reviews) {
        this.reviews = reviews;
    }
}

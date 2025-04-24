package tn.esprit.bambinou.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(value = { "forums" }, allowGetters = true)

public class PregnancyTracking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPregnancyTracking;
    private Date DatePregnancyTracking;
    private String NamePregnancyTracking;
    @Enumerated(EnumType.STRING)
    private IntervalChoice intervalChoice;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "pregnancyTracking", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    @JsonIgnore
    private List<Forum> Forums;
    public Long getIdPregnancyTracking() {
        return idPregnancyTracking;
    }

    public void setIdPregnancyTracking(Long idPregnancyTracking) {
        this.idPregnancyTracking = idPregnancyTracking;
    }

    public Date getDatePregnancyTracking() {
        return DatePregnancyTracking;
    }

    public void setDatePregnancyTracking(Date datePregnancyTracking) {
        DatePregnancyTracking = datePregnancyTracking;
    }

    public String getNamePregnancyTracking() {
        return NamePregnancyTracking;
    }

    public void setNamePregnancyTracking(String namePregnancyTracking) {
        NamePregnancyTracking = namePregnancyTracking;
    }

    public IntervalChoice getIntervalChoice() {
        return intervalChoice;
    }

    public void setIntervalChoice(IntervalChoice intervalChoice) {
        this.intervalChoice = intervalChoice;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
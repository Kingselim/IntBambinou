
package tn.esprit.bambinou.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Forum {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idForum;
    private int month;

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    //private Long idPregnancyTracking;
    private Float Weight;
    private Float bloodPressure;
    private String Description;
    private String Symptoms;
    private String PregnancyPain;
    private String PregnancyCravings;
    private String MoodSwings;
    private String Breathelessness;

    @ManyToOne
    @JoinColumn(name = "id_pregnancy_tracking")
    private PregnancyTracking pregnancyTracking;

    public Long getIdForum() {
        return idForum;
    }

    public void setIdForum(Long idForum) {
        this.idForum = idForum;
    }

    @Transient
    public Long getIdPregnancyTracking() {
        return pregnancyTracking != null ? pregnancyTracking.getIdPregnancyTracking() : null;
    }


    public Float getWeight() {
        return Weight;
    }

    public void setWeight(Float weight) {
        Weight = weight;
    }

    public Float getBloodPressure() {
        return bloodPressure;
    }

    public void setBloodPressure(Float bloodPressure) {
        this.bloodPressure = bloodPressure;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getSymptoms() {
        return Symptoms;
    }

    public void setSymptoms(String symptoms) {
        Symptoms = symptoms;
    }

    public String getPregnancyPain() {
        return PregnancyPain;
    }

    public void setPregnancyPain(String pregnancyPain) {
        PregnancyPain = pregnancyPain;
    }

    public String getPregnancyCravings() {
        return PregnancyCravings;
    }

    public void setPregnancyCravings(String pregnancyCravings) {
        PregnancyCravings = pregnancyCravings;
    }

    public String getMoodSwings() {
        return MoodSwings;
    }

    public void setMoodSwings(String moodSwings) {
        MoodSwings = moodSwings;
    }

    public String getBreathelessness() {
        return Breathelessness;
    }

    public void setBreathelessness(String breathelessness) {
        Breathelessness = breathelessness;
    }

    public PregnancyTracking getPregnancyTracking() {
        return pregnancyTracking;
    }

    public void setPregnancyTracking(PregnancyTracking pregnancyTracking) {
        this.pregnancyTracking = pregnancyTracking;
    }
}
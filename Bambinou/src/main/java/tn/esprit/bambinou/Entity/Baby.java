package tn.esprit.bambinou.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Baby {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBaby;
    private String Name;
    private Date DateOfBirth;
    private int Age;
    private String Gender;
    private String MedicalCondition;
    private String SpecialNeeds;
    private String FavoriteActivities;
    private String EmergencyContact;

    @ManyToOne
    @JoinColumn(name = "id_babysitting")
    private Babysitting babysitting;
    public Long getIdBaby() {
        return idBaby;
    }

    public void setIdBaby(Long idBaby) {
        this.idBaby = idBaby;
    }



    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public Date getDateOfBirth() {
        return DateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        DateOfBirth = dateOfBirth;
    }

    public int getAge() {
        return Age;
    }

    public void setAge(int age) {
        Age = age;
    }

    public String getGender() {
        return Gender;
    }

    public void setGender(String gender) {
        Gender = gender;
    }

    public String getMedicalCondition() {
        return MedicalCondition;
    }

    public void setMedicalCondition(String medicalCondition) {
        MedicalCondition = medicalCondition;
    }

    public String getSpecialNeeds() {
        return SpecialNeeds;
    }

    public void setSpecialNeeds(String specialNeeds) {
        SpecialNeeds = specialNeeds;
    }

    public String getFavoriteActivities() {
        return FavoriteActivities;
    }

    public void setFavoriteActivities(String favoriteActivities) {
        FavoriteActivities = favoriteActivities;
    }

    public String getEmergencyContact() {
        return EmergencyContact;
    }

    public void setEmergencyContact(String emergencyContact) {
        EmergencyContact = emergencyContact;
    }
}

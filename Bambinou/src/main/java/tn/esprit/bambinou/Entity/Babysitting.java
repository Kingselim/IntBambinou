package tn.esprit.bambinou.Entity;

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
public class Babysitting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idBabysitting;
    private Date StartDate;
    private Date EndDate;
    private Long Duration;
    private Float Salary;
    private String Status;

    @ManyToOne
    @JoinColumn (name = "user_idP")
    private  User userPatient;
    @ManyToOne
    @JoinColumn (name = "user_idB")
    private  User userBabySitter;

    @OneToMany(mappedBy = "babysitting",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Baby> babies;
    public Long getIdBabysitting() {
        return idBabysitting;
    }

    public void setIdBabysitting(Long idBabysitting) {
        this.idBabysitting = idBabysitting;
    }



    public Date getStartDate() {
        return StartDate;
    }

    public void setStartDate(Date startDate) {
        StartDate = startDate;
    }

    public Date getEndDate() {
        return EndDate;
    }

    public void setEndDate(Date endDate) {
        EndDate = endDate;
    }

    public Long getDuration() {
        return Duration;
    }

    public void setDuration(Long duration) {
        Duration = duration;
    }

    public Float getSalary() {
        return Salary;
    }

    public void setSalary(Float salary) {
        Salary = salary;
    }

    public String getStatus() {
        return Status;
    }

    public User getUserPatient() {
        return userPatient;
    }

    public void setUserPatient(User userPatient) {
        this.userPatient = userPatient;
    }

    public User getUserBabySitter() {
        return userBabySitter;
    }

    public void setUserBabySitter(User userBabySitter) {
        this.userBabySitter = userBabySitter;
    }

    public void setStatus(String status) {
        Status = status;
    }
}

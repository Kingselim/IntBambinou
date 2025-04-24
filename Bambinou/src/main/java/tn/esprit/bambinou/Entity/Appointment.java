package tn.esprit.bambinou.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAppointment;
    //private Long idUser;
    //private List<User> ListUser;
    private String Location;
    private String Status;
    private String Description;

    @ManyToOne
    @JoinColumn (name = "user_idP")
    private User userPatient;
    @ManyToOne
    @JoinColumn (name = "user_idE")
    private User userExpert;

    @ManyToOne
    @JoinColumn(name = "driver_id")  // This is the foreign key column in the Appointment table.
    private Driver driver;


    public Long getIdAppointment() {
        return idAppointment;
    }

    public void setIdAppointment(Long idAppointment) {
        this.idAppointment = idAppointment;
    }

    /*public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }*/

   // public List<User> getListUser() {return ListUser;}

   /* public void setListUser(List<User> listUser) {
        ListUser = listUser;
    }

    */

    public String getLocation() {
        return Location;
    }

    public void setLocation(String location) {
        Location = location;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String status) {
        Status = status;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }
}

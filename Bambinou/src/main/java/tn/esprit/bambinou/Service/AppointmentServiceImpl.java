package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Appointment;
import tn.esprit.bambinou.Repository.AppointmentRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class AppointmentServiceImpl implements IAppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public List<Appointment> retrieveAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public Appointment retrieveAppointment(Long appointmentId) {
        return appointmentRepository.findById(appointmentId).orElse(null);
    }

    @Override
    public Appointment addAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public void removeAppointment(Long appointmentId) {
        appointmentRepository.deleteById(appointmentId);
    }

    @Override
    public Appointment modifyAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }
}

package tn.esprit.bambinou.Service;

import tn.esprit.bambinou.Entity.Appointment;

import java.util.List;

public interface IAppointmentService {
    List<Appointment> retrieveAllAppointments();
    Appointment retrieveAppointment(Long appointmentId);
    Appointment addAppointment(Appointment appointment);
    void removeAppointment(Long appointmentId);
    Appointment modifyAppointment(Appointment appointment);
}
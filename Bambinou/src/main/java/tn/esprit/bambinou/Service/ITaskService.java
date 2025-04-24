package tn.esprit.bambinou.Service;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.bambinou.Entity.PregnancyJournal;
import tn.esprit.bambinou.Entity.Task;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.bambinou.Entity.PregnancyJournal;
import tn.esprit.bambinou.Entity.Task;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
public interface ITaskService {
    List<Task> getAllTasks();
    Optional<Task> getTaskById(Long id);
    Task saveTask(Task task);
    void deleteTask(Long id);
    List<Task> getByIdPregnancyTracking(Long id);
    boolean existsTodoAtSameDateTime(LocalDate date, LocalTime time, Long idPregnancyTracking);

}
package tn.esprit.bambinou.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Task;
import tn.esprit.bambinou.Repository.TaskRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.Task;
import tn.esprit.bambinou.Repository.TaskRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements ITaskService {

    private final TaskRepository taskRepository;
    private final ISmsService smsService;

    @Autowired
    public TaskServiceImpl(TaskRepository taskRepository, ISmsService smsService) {
        this.taskRepository = taskRepository;
        this.smsService = smsService;
    }

    @Override
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @Override
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public List<Task> getByIdPregnancyTracking(Long id) {
        // return taskRepository.findByIdPregnancyTracking(id);
        return taskRepository.findByPregnancyTracking_IdPregnancyTracking(id);

    }

    @Override
    public Task saveTask(Task task) {
        Task saved = taskRepository.save(task);

        // Envoyer un SMS si la tâche est prévue pour demain
        if (task.getDate() != null && task.getDate().equals(LocalDate.now().plusDays(1))) {
            String msg = "🔔 Rappel: Vous avez une tâche demain : " + task.getText();
            smsService.sendSms(task.getPhoneNumber(), msg);
        }

        return saved;
    }
    @Override
    public boolean existsTodoAtSameDateTime(LocalDate date, LocalTime time, Long trackingId) {
        return taskRepository.existsByDateAndTimeAndStatusAndPregnancyTracking_IdPregnancyTracking(
                date, time, "todo", trackingId
        );
    }


}
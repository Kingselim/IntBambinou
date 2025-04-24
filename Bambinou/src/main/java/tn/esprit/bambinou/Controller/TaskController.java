package tn.esprit.bambinou.Controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.bambinou.Entity.PregnancyJournal;
import tn.esprit.bambinou.Entity.Task;
import tn.esprit.bambinou.Service.ITaskService;
import tn.esprit.bambinou.Service.TaskServiceImpl;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final ITaskService taskService;

    public TaskController(ITaskService taskService) {
        this.taskService = taskService;
    }


    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTask(@PathVariable Long id) {
        return taskService.getTaskById(id).orElse(null);
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        boolean exists = taskService.existsTodoAtSameDateTime(
                task.getDate(),
                task.getTime(),
                task.getPregnancyTracking().getIdPregnancyTracking()
        );

        if (exists) {
            return ResponseEntity
                    .badRequest()
                    .body("❌ Une tâche TODO existe déjà à cette date et heure.");
        }

        Task saved = taskService.saveTask(task);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        task.setId(id);
        return taskService.saveTask(task);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
    @GetMapping("/tracking/{id}")
    public List<Task> getByTrackingId(@PathVariable Long id) {
        return taskService.getByIdPregnancyTracking(id);
    }
}
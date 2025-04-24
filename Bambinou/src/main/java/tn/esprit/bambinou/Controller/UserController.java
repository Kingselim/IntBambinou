package tn.esprit.bambinou.Controller;


import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.bambinou.Entity.User;
import tn.esprit.bambinou.Service.EmailService;
import tn.esprit.bambinou.Service.IConversationService;
import tn.esprit.bambinou.Service.IuserService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private IuserService userService;

    @Autowired
    private IConversationService conversationService;
    /*
        --------------------- format ajout d un User avec JSON -----------------------

    {
        "id": 1,             nb: retirer l'id lors de l'ajout
        "name": "yacine",
        "age": "23",
        "email": "yacine@gmail.com",
        "password": "yacineee",
        "status": 1,
        "roleTypes": [
            {
                "id": 1,              nb: mettre l'id du role souhaite
                "role": "ADMIN"
            }
        ]
    }

id
    445217710300-r6h4olhf8tqccb4i9qbit54fc72h0uml.apps.googleusercontent.com
code
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



     */
    @Autowired
    private EmailService emailService;



    // http://localhost:8089/user/retrieve-all-users
    @GetMapping("/list")
    public List<User> getUsers() {
        return userService.retrieveAllUsers();
    }

    // http://localhost:8089/user/retrieve-user/{user-id}
    @GetMapping("/retrieve-user/{user-id}")
    public User retrieveUser(@PathVariable("user-id") Long userId) {
        return userService.retrieveUser(userId);
    }

    @GetMapping("/retrieve-user-email/{user-email}")
    public User retrieveUserByEmail(@PathVariable("user-email") String email) {
        return userService.retrieveUserByEmail(email);
    }

    // http://localhost:8089/user/add-user
    @PostMapping("/add-user")
    public User addUser(@RequestBody User u) {
        return userService.addUser(u);
    }

    @DeleteMapping("/remove-user/{user-id}")
    public void removeUser(@PathVariable("user-id") Long userId) {
        userService.removeUser(userId);
    }
   /* //http://localhost:8089/user/modify/{id}
    @PutMapping("/modify-user")
    public User modifyUser(@RequestBody User u) {
        return userService.modifyUser(u);
    }*/
   // http://localhost:8089/user/modify/{id}
   // http://localhost:8089/user/modify/{id}


   @PutMapping("/modify/{id}")
   public ResponseEntity<User> modifyUser(@PathVariable("id") int id, @RequestBody User user) {
       user.setId(id); // Assure que l'ID de l'entité correspond à celui de l'URL
       User updatedUser = userService.modifyUser(user);
       return ResponseEntity.ok(updatedUser);
   }

   @PutMapping("/activate-user/{user-id}")
    public ResponseEntity<User>  activateUser(@PathVariable("user-id") long id) {
       User user = userService.retrieveUser(id);
       if (user == null) {
           return ResponseEntity.notFound().build();
       }
       user.setStatus(1);
       User updatedUser = userService.modifyUser(user);
       return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/block-user/{user-id}")
    public ResponseEntity<User>  blockUser(@PathVariable("user-id") long id) {
        User user = userService.retrieveUser(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        user.setStatus(0);
        User updatedUser = userService.modifyUser(user);
        return ResponseEntity.ok(updatedUser);
    }



}

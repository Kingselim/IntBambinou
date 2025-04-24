package tn.esprit.bambinou.Service;


import tn.esprit.bambinou.Entity.User;

import java.util.List;
import java.util.Optional;

public interface IuserService {
    public List<User> retrieveAllUsers();
    public User retrieveUser(Long userId);
    public User addUser(User user);
    public void removeUser(Long userId);
    public User modifyUser(User user);
    public User retrieveUserByEmail(String email);
    public boolean checkPassword(String password, String rawPassword);
}

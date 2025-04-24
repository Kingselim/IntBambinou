package tn.esprit.bambinou.Service;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.User;
import tn.esprit.bambinou.Repository.UserRepository;

import java.util.List;
import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
@Service
@AllArgsConstructor
public class userServiceImpl implements IuserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    private  PasswordEncoder passwordEncoder;
    @Autowired
    public userServiceImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public List<User> retrieveAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User retrieveUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User retrieveUser(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public User addUser(User user) {
        // Crypter le mot de passe avant de le stocker dans la base de données
        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);

        String htmlContent = "<h1>Bonjour,</h1><p>Ceci est un <b>email HTML</b> envoyé depuis Spring Boot.</p><p><a href='https://example.com'>Cliquez ici</a> pour plus d'informations.</p>";
        //emailService.sendHtmlEmail("selim03gaaloul@gmail.com", "Email HTML", htmlContent);
        emailService.sendEmailWithStylizedTemplate("selim03gaaloul@gmail.com", "Welcome", user.getName());
        //emailService.sendEmailWithStylizedTemplate("gaaloul.selim@esprit.tn", "Welcome", user.getName());

        return userRepository.save(user);
    }


    @Override
    public void removeUser(Long userId) {
        userRepository.deleteById(userId);
    }

    @Override
    public User modifyUser(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        System.out.println("dans MODIFY");
        if(user.getPassword().length()>20)
        {
            user.setPassword(existingUser.getPassword());
            System.out.println("le mot de passe est IDENTIQUE que lancien");
            return userRepository.save(user);
        }
        System.out.println("dans modify , le mot de passe est DIFFERENT par rapport a lancien");

        String encryptedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        return userRepository.save(user);
    }

    public boolean checkPassword(String password, String rawPassword) {

        // Check if the raw password matches the encrypted password
        return passwordEncoder.matches(password,rawPassword);
    }


    public void registerOrUpdateUser(OAuth2User oAuth2User) {
        // Vérifier si l'utilisateur existe déjà dans la base de données par son email
        String email = (String) oAuth2User.getAttributes().get("email");
        User existingUser = userRepository.findByEmail(email);

        if (existingUser == null) {
            System.out.println("l'utilisateur n'existe pas apres l Oauth de google");
            // Créer un nouvel utilisateur
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setName((String) oAuth2User.getAttributes().get("name"));
            // Ajoute les autres informations si nécessaire (par exemple, "sub" de Google)
            userRepository.save(newUser);
        } else {
            // L'utilisateur existe déjà, mettez-le à jour si nécessaire
            existingUser.setName((String) oAuth2User.getAttributes().get("name"));
            userRepository.save(existingUser);
        }
    }



}

package tn.esprit.bambinou.filtres;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import tn.esprit.bambinou.Entity.User;
import tn.esprit.bambinou.Service.JwtUtil;
import tn.esprit.bambinou.Service.userServiceImpl;

import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private userServiceImpl userService; // Ajout de userService



    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        try {

            // Extraire l'utilisateur depuis Authentication
            OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

            // Récupérer l'email ou l'identifiant de l'utilisateur
            String email = oAuth2User.getAttribute("email"); // Assure-toi que Google envoie bien l'email

            // Charger l'utilisateur depuis la base de données (si nécessaire)
            User user = userService.retrieveUserByEmail(email); // Assure-toi d'avoir cette méthode dans UserService
            if (user == null) {
                System.err.println("❌ Utilisateur non trouvé en base : " + email);
                throw new RuntimeException("Utilisateur non trouvé : " + email);
            }
            System.out.println("🔥 Utilisateur Google Trouve: " + email+" name: "+user.getName() +" age:"+user.getAge()+" role:" );

            // Générer le token JWT
            String token = jwtUtil.generateToken2(user);
            response.sendRedirect("http://localhost:4200/backoffice/dashboard?token=" + token);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("❌ Erreur dans le handler OAuth2 : " + e.getMessage());
            response.sendRedirect("http://localhost:4200/error?message=" + e.getMessage());
        }
    }
}


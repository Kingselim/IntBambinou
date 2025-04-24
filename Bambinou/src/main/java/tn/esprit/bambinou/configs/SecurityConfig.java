package tn.esprit.bambinou.configs;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import tn.esprit.bambinou.Service.userServiceImpl;
import tn.esprit.bambinou.filtres.JwtAuthenticationFilter;
import tn.esprit.bambinou.filtres.OAuth2LoginSuccessHandler;

import java.util.List;

@Configuration
@Order(1)
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private  userServiceImpl userService; // Ajout de userService

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userService = userService; // Initialisation du UserService

    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        System.out.println("haniii nouni fel security config");
        http
                .csrf().disable() // Désactiver la protection CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/login").permitAll()  // Permet l'accès sans token à cette route
                        //.requestMatchers("/user/list").hasRole("ADMIN")// Route protégée, nécessite une authentification
                        .anyRequest().permitAll() // Autorise le reste des routes
                )
                .oauth2Login(oauth2 -> oauth2 // Ajout de l'authentification via Google
                        .defaultSuccessUrl("http://localhost:4200/backoffice/dashboard", true) // Redirige après succès
                        .failureUrl("http://localhost:4200/backoffice/login?error=true") // Redirige en cas d'échec
                        .successHandler(oAuth2LoginSuccessHandler())
                )
                .addFilterBefore(jwtAuthenticationFilter,UsernamePasswordAuthenticationFilter.class) // Ajout du filtre JWT
                
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );
        // Configuration CORS
        http.cors().configurationSource(request -> {
            var cors = new CorsConfiguration();
            cors.setAllowedOriginPatterns(List.of("http://localhost:4200"));
            cors.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
            cors.setAllowedHeaders(List.of("Authorization", "Content-Type"));
            cors.setAllowCredentials(true);
            return cors;
        });




        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Define the BCryptPasswordEncoder as a bean
    }
    @Bean
    public OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler() {
        return new OAuth2LoginSuccessHandler();
    }

}

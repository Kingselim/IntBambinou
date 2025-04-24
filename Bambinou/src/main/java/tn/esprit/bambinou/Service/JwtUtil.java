package tn.esprit.bambinou.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.transaction.Transactional;

import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import tn.esprit.bambinou.Entity.User;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class JwtUtil {

    private String secretKey = "131313"; // Utilisez une clé plus sécurisée dans un fichier de configuration.

    private SessionFactory sessionFactory;
    // Méthode pour générer le token JWT
    public String generateToken(User user) {
        System.out.println("heure Dans JWTUTIL "+ new Date());
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", user.getEmail()); // l'email de l'utilisateur
        claims.put("name", user.getName()); // le nom de l'utilisateur
        claims.put("role", user.getRoleTypes()); // le rôle de l'utilisateur
        claims.put("iat", System.currentTimeMillis()); // timestamp de création
        claims.put("exp", System.currentTimeMillis() + 3600000); // expiration dans 1 heure = 3600000  !!     1min = 60000
        claims.put("status", user.getStatus());
        System.out.println("-----GENERATION DE TOKEN------");
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // Date d'expiration
                .signWith(SignatureAlgorithm.HS256, secretKey) // secret key pour signer
                .compact();
    }

    // Méthode pour générer le token JWT
    public String generateToken2(User user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("sub", user.getEmail()); // l'email de l'utilisateur
        claims.put("name", user.getName()); // le nom de l'utilisateur
// Assure-toi que getRoleTypes() retourne une liste de chaînes sérialisable
        claims.put("role", user.getRoleTypes()); // le rôle de l'utilisateur
        claims.put("iat", System.currentTimeMillis()); // timestamp de création
        claims.put("exp", System.currentTimeMillis() + 3600000); // expiration dans 1 heure = 3600000  !!     1min = 60000
        claims.put("status", user.getStatus());
        return Jwts.builder()
                .setClaims(claims)
                .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // Date d'expiration
                .signWith(SignatureAlgorithm.HS256, secretKey) // secret key pour signer
                .compact();
    }

    // Méthode pour valider le token JWT
    public boolean validateToken(String token, String email) {
        String username = extractUsername(token);
        return (username.equals(email) && !isTokenExpired(token));
    }
    // Méthode pour valider le token JWT
    public boolean validateToken2( String token) {
          Date expiredDate = getExpFromToken(token);
        return  expiredDate.after(new Date()) ;
    }

    // Extraire le nom d'utilisateur (email) à partir du token
    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Vérifier si le token a expiré
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extraire la date d'expiration du token
    private Date extractExpiration(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }


    public Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey) // utiliser la même clé secrète que pour signer
                .parseClaimsJws(token)
                .getBody();
    }

    public String getNameFromToken(String token) {
        Claims claims = extractClaims(token);
        return claims.get("name", String.class); // Récupère le nom de l'utilisateur
    }

    public String getRoleFromToken(String token) {
        Claims claims = extractClaims(token);
        return claims.get("role", String.class); // Récupère le rôle de l'utilisateur
    }
    public String getStatusFromToken(String token) {
        Claims claims = extractClaims(token);
        return claims.get("status", String.class); // Récupère le status de l'utilisateur
    }
    public Date getExpFromToken(String token) {
        Claims claims = extractClaims(token);
        return claims.get("exp", Date.class); // Récupère le rôle de l'utilisateur
    }

    public List<SimpleGrantedAuthority> extractRoles(String token) {
        Claims claims = extractClaims(token);
        List<Map<String, String>> roles = (List<Map<String, String>>) claims.get("role");
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.get("role"))) // Ajout du préfixe ROLE_
                .collect(Collectors.toList());
    }




}


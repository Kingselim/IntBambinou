package tn.esprit.bambinou.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.MailException;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private TemplateEngine templateEngine;

    public void sendEmailWithStylizedTemplate(String to, String subject, String name) {
        try {
            // Créer le contexte Thymeleaf avec des données dynamiques
            Context context = new Context();
            context.setVariable("name", name);

            // Charger le template et le générer en HTML
            String htmlContent = templateEngine.process("TemplateWelcome", context);

            // Créer l'email
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);
            messageHelper.setText(htmlContent, true);  // true pour activer le contenu HTML

            // Envoyer l'email
            javaMailSender.send(mimeMessage);
            System.out.println("Email stylisé envoyé avec succès");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
    public void sendEmailWithStylizedTemplate(String to, String subject, String name,int id){
        try {
            // Créer le contexte Thymeleaf avec des données dynamiques
            Context context = new Context();
            context.setVariable("name", name);
            context.setVariable("id", id);

            // Charger le template et le générer en HTML
            String htmlContent = templateEngine.process("email-template", context);

            // Créer l'email
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
            messageHelper.setTo(to);
            messageHelper.setSubject(subject);
            messageHelper.setText(htmlContent, true);  // true pour activer le contenu HTML

            // Envoyer l'email
            javaMailSender.send(mimeMessage);
            System.out.println("Email stylisé envoyé avec succès");
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }


}

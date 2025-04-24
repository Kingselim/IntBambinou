package tn.esprit.bambinou.Service;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.stereotype.Service;

// I. Interface simple
public interface ISmsService {//test
    void sendSms(String to, String content);
}


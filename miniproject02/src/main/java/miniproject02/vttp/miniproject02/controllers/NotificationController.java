package miniproject02.vttp.miniproject02.controllers;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@Controller
@RequestMapping()
public class NotificationController {

    @Value("${auth.key}")
    private String auth;

    private static final String url = "https://fcm.googleapis.com/fcm/send";    

    @PostMapping("/ping")
    public void sendNotification(@RequestBody MultiValueMap<String, String> form) {

        String title = form.getFirst("title");
        String message = form.getFirst("message");
        String token = form.getFirst("token");

        JsonObject notification = Json.createObjectBuilder()
            .add("title", title)
            .add("body", message)
            .build();

        JsonObject json = Json.createObjectBuilder()
            .add("notification", notification)
            .add("to", token)
            .build();

        RequestEntity<String> req = RequestEntity
            .post(url)
            .contentType(MediaType.APPLICATION_JSON)   // Specify the content type as JSON
            .header("Authorization", auth)
            .body(json.toString(), String.class);

        RestTemplate template = new RestTemplate();

        ResponseEntity<String> resp = template.exchange(req, String.class);

        System.out.println(">>>> FROM FIREBASE NOTI:\n" + resp.getBody());
    }

    
}

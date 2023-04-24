package miniproject02.vttp.miniproject02.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import miniproject02.vttp.miniproject02.models.User;
import miniproject02.vttp.miniproject02.services.UserService;

@RestController
@RequestMapping()
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService uSvc;

    @PostMapping(path = "/verifyUser", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public User verifyUser2(@RequestBody MultiValueMap<String, String> form) {

        System.out.println("user data received: " + form);

        String inputEmail = form.getFirst("email").toLowerCase();
        String inputPw = form.getFirst("password");

        if (uSvc.findUserByEmail(inputEmail).isEmpty()) {
            return null;
        }

        User usr = uSvc.findUserByEmail(inputEmail).get();
        String dbpw = usr.getPassword();

        if (dbpw.equals(inputPw)) {
            return usr;
        } else {
            return null;
        }
    }
    // add new user
    @PostMapping(path = "/createUser", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @ResponseBody
    public User createUser(@RequestBody MultiValueMap<String, String> form) {

        // System.out.println("user data received: " + form);

        String inputName = form.getFirst("name");
        String inputEmail = form.getFirst("email").toLowerCase();
        String inputPw = form.getFirst("password");

        if (uSvc.findUserByEmail(inputEmail).isPresent()) {
            return null;
        }

        User usr = new User(inputName, inputEmail, inputPw);
        uSvc.createNewUser(usr);
        System.out.println(usr.toString());

        return usr;
    }
}

package miniproject02.vttp.miniproject02.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import miniproject02.vttp.miniproject02.models.Task;
import miniproject02.vttp.miniproject02.services.MailService;

@RestController
@RequestMapping()
public class EmailController {

    @Autowired
    private MailService mailSvc;

    @Transactional
    @PostMapping("/sendMail/{category}/{email}")
    public ResponseEntity<String> sendMail(@RequestBody Task[] tasks, @PathVariable String category, @PathVariable String email) throws Exception {

        System.out.println("\n\n IN EMAIL CONTROLLER \n\n");

        String taskList = "";

        for (int i = 0; i < tasks.length; i++) {
            // System.out.println(">>>> indiv --- " + tasks[i].toString());
            Task t = new Task(tasks[i].getId(), tasks[i].getTitle(), tasks[i].getDescription(), tasks[i].getUsername());
            taskList = taskList.concat(t.toString());
            // System.out.println(t.toString());
        }

        String body = mailSvc.formatMessage(taskList);
        String subject = mailSvc.formatSubject(category);
        // System.out.println(">>>> MESSAGE: \n" + body);
        mailSvc.sendMail(email, subject, body);

        return ResponseEntity.ok("Successful");
    }
}

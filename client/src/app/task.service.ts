import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Task, User } from "./models";
import { firstValueFrom } from "rxjs";

@Injectable()
export class TaskService {
    
    constructor(private http : HttpClient) {}

    // verify existing user
    verifyUser(data: User): Promise<User> {
        // Create form
        const payload = new HttpParams()
                        .set("email", data.email)
                        .set("password", data.password)
        // console.log("++++++ ", data.email, data.password)

        // Set headers
        const headers = new HttpHeaders()
                        .set("Content-Type", "application/x-www-form-urlencoded")
                        .set("Accept", "application/json")

        return firstValueFrom(
            this.http.post<User>('/verifyUser', payload.toString(), { headers })
        )
    }

    // register new user
    createUser(data: User): Promise<User> {
        // Create form
        const payload = new HttpParams()
                        .set("name", data.name? data.name : "user")
                        .set("email", data.email)
                        .set("password", data.password)
        console.log("++++++ ", data.name, data.email, data.password)

        // Set headers
        const headers = new HttpHeaders()
                        .set("Content-Type", "application/x-www-form-urlencoded")
                        .set("Accept", "application/json")

        return firstValueFrom(
            this.http.post<User>('/createUser', payload.toString(), { headers })
        )
    }

    mailTasks(tasks : Task[], list : 'done' | 'todo' | 'inProgress', email : string) : Promise<String> {

        console.info(".... in task service sending tasks to SB .....")
        console.info("--", tasks.toString)
        console.log("++", email)

        return firstValueFrom(this.http.post<String>(`/sendMail/${list}/${email}`, tasks));
    }

    sendNotification(message : string, webToken : string) : Promise<String> {

        // Create form
        const payload = new HttpParams()
                        .set("title", "Roar Chorezilla!")
                        .set("message", message)
                        .set("token", webToken)
        console.log("++++++ ", message, webToken)

        // Set headers
        const headers = new HttpHeaders()
                        .set("Content-Type", "application/x-www-form-urlencoded")
                        .set("Accept", "application/json")

        return firstValueFrom(this.http.post<String>('/ping', payload.toString(), { headers }))
    }
}
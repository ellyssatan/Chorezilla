import { Injectable } from "@angular/core";
import { User } from "./models";

@Injectable({
    providedIn: "root"
})
export class RelayService {

    constructor() {}

    webToken ! : string;
    currentUser ! : User;

}

import { ClientService } from "./../../services/client.service";
import { Client } from "../../models/Client";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { Router } from "@angular/router";
import { SettingsService } from "../../services/settings.service";
import { AmplifyService } from "aws-amplify-angular";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"]
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };

  disableBalanceOnAdd: boolean;
  @ViewChild("clientForm") form: any;
  constructor(
    private router: Router,
    private clientService: ClientService,
    private flashMessages: FlashMessagesService,
    private settingsService: SettingsService,
    private amplifyService: AmplifyService
  ) {
    // now you can access category APIs:
    console.log(this.amplifyService.auth()); // AWS Amplify Auth
    console.log(this.amplifyService.analytics()); // AWS Amplify Analytics
    console.log(this.amplifyService.storage()); // AWS Amplify Storage
    console.log(this.amplifyService.api()); // AWS Amplify API
    console.log(this.amplifyService.cache()); // AWS Amplify Cache
    console.log(this.amplifyService.pubsub()); // AWS Amplify PubSub
  }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    // console.log(value, valid);
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      // show error
      this.flashMessages.show("Please fill the form out correctly", {
        cssClass: "alert-danger",
        timeout: 4000
      });
    } else {
      // add new Client
      this.clientService.newClient(value);
      // show message
      this.flashMessages.show("New client added", {
        cssClass: "alert-success",
        timeout: 4000
      });
      // redirect to dashboard
      this.router.navigate(["/"]);
    }
  }
}

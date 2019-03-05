import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from "./../../services/client.service";
import { Component, OnInit } from "@angular/core";
import { Client } from "../../models/Client";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { formatDate } from "@angular/common";
@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"]
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;
  pastDue: boolean = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params["id"];
    // Get the client
    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        let dueDate = this.getDate(client.dueDate.seconds * 1000);
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDay() + 3;
        let today = year + "-" + month + "-" + day;
        if (client.balance > 0) {
          this.hasBalance = true;
        }
        if (new Date(today) > new Date(dueDate)) {
          this.pastDue = true;
        }
      }
      this.client = client;
      // console.log(client);
    });
  }

  updateBalance(id: string) {
    this.clientService.updateClient(this.client);
    this.flashMessage.show("Balance updated", {
      cssClass: "alert-success",
      timeout: 4000
    });
  }

  onDeleteClick() {
    if (confirm("Are you sure you wish to delete this?")) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show("Client removed", {
        cssClass: "alert-success",
        timeout: 4000
      });
      this.router.navigate(["/"]);
    }
  }

  getDate(date) {
    return formatDate(date, "yyyy-MM-dd", "en-US");
  }
}

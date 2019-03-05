import { Component, OnInit } from "@angular/core";
import { ClientService } from "./../../services/client.service";
import { Client } from "../../models/Client";

@Component({
  selector: "app-clients-view",
  templateUrl: "./clients-view.component.html",
  styleUrls: ["./clients-view.component.css"]
})
export class ClientsViewComponent implements OnInit {
  clients: Client[];
  totalOwed: number;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    this.totalOwed = this.clients.reduce((total, client) => {
      return total + parseFloat(client.balance.toString());
    }, 0);
  }
}

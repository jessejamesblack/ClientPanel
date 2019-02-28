import { ClientService } from './../../services/client.service';
import { Client } from '../../models/Client';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disableBalanceOnAdd: boolean = false;
  @ViewChild('clientForm') form: any;
  constructor(
    private router: Router,
    private clientService: ClientService,
    private flashMessages: FlashMessagesService) {}

  ngOnInit() {}

  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    // console.log(value, valid);
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      // show error
      this.flashMessages.show('Please fill the form out correctly', {
        cssClass: 'alert-danger',
        timeout: 4000
      });
    } else {
      // add new Client
      this.clientService.newClient(value);
      // show message
      this.flashMessages.show('New client added', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      // redirect to dashboard
      this.router.navigate(['/']);
    }
  }
}

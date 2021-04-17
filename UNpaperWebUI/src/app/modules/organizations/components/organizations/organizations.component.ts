import { Component, OnInit } from '@angular/core';
import { FunctionsApiRequestService } from 'src/app/core/services/request/functions-api-request.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  constructor(private readonly _requestService: FunctionsApiRequestService) {}

  ngOnInit(): void {
    this._requestService.get('/TestFunction?name=Teodor').subscribe(result => {
      // console.log(result);
      console.log('Recieved response');
    });
  }
}

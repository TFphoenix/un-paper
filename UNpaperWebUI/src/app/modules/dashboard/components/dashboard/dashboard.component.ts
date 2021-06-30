import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { DocumentService } from 'src/app/core/services/document/document.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserHistory } from 'src/app/shared/models/user-history.model';

const placeholder: string = '...';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userName: string = placeholder;
  organizations: string = placeholder;
  batches: string = placeholder;
  documents: string = placeholder;

  userHistory: UserHistory[] = [];

  constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
    private readonly _documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.populateUserName();
    this.populateUserData();
    this.populateUserHistory();
  }

  private populateUserName() {
    if (this._authService.loggedIn) {
      this.userName = this._authService.userClaims.userName;
    }
  }

  private populateUserData() {
    // TODO: Make this more efficient by implementing specialized endpoints
    this._userService.getUserOrganizations(true).subscribe(organizations => {
      // Organizations
      this.organizations = organizations.length.toString();

      // Batches & Documents
      let batchesNumber = 0;
      let documentsNumber = 0;
      organizations.forEach(organization => {
        batchesNumber += organization.batches.length;

        organization.batches.forEach(batch => {
          this._documentService.getDocuments(organization.id, batch.id).subscribe(documents => {
            documentsNumber += documents.length;
            this.documents = documentsNumber.toString();
          });
        });
      });

      this.batches = batchesNumber.toString();
    });
  }

  private populateUserHistory() {
    // TODO: Populate history from a real data surce
    this._userService.getCurrentUser().subscribe(user => {
      this.userHistory = [
        {
          timestamp: user.createdOn,
          title: 'Created account',
          description: 'Created current user account'
        }
      ];
    });

    // TODO: Sort history descendent by timestamp
  }
}

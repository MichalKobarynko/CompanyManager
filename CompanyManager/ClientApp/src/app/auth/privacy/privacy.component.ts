import { Component, OnInit } from '@angular/core';
import { Claim } from '../../api/models/claim.dto';
import { AuthRestService } from '../../api/services/auth.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css']
})
export class PrivacyComponent implements OnInit {
  public claims: Claim[] = [];

  constructor(private authRestService: AuthRestService) { }

  ngOnInit(): void {
    this.getClaims();
  }

  public getClaims = () => {
    this.authRestService.getClaims()
      .subscribe(res => {
        this.claims = res as [];
      })
  }

}

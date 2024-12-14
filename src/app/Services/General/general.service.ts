import { Injectable } from '@angular/core';
import { ApiRequestsService } from '@services/api-requests.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private apiRequests: ApiRequestsService) { }
  
  GetInformation(InformationId: string){
    const endpoint = `Management/Information?informationID=${encodeURIComponent(InformationId)}`;
    return this.apiRequests.sendRequest(endpoint, 'GET');
  }
}

import { User } from './user.model';
export class CallRequest {
    id:number;
    userOfRequest: User;
    userOfResponse: User;
    status:number;
    report:boolean
  }
export interface Contact {
               id?: string;
           userId?: string;
              name: string;
          lastName: string;
             email: string;
          business: string;
             birth: Date;
          userType: number;
     addressStreet: string;
       addressCity: string;
    addressCountry: string;
     scheduledDate: Date;
          nickName: string;
         isBlocked: number;
           phones?: string[];
}

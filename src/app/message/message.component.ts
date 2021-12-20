import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  form: {
            error: '',
            success: '',

            email: '',
            subject: '',
            name: '',
            message: '',
          };
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    return 0;
  }
// export set {
//   data() {
//     return {
//       sending: false,
//       robotCheckInvalid: true,
//       form: {
//         error: '',
//         success: '',

//         email: '',
//         subject: '',
//         name: '',
//         message: '',
//       },
//     }
//   },

//   methods: {
//     async onSubmit() {
//       try {
//         this.sending = true
//         this.form.error = ''
//         this.form.success = ''
//         await this.$http.mailer.send(
//           this.form.name,
//           this.form.email,
//           this.form.subject || 'Contact us message from Unknown Heroes',
//           this.form.message
//         )

//         this.form.success = 'Thank you for your email.'
//       } catch (ex) {
//         this.form.error = ex.message || ex
//       } finally {
//         this.sending = false
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//       }
//     },

//     onError() {
//       this.robotCheckInvalid = true
//     },

//     onSuccess() {
//       this.robotCheckInvalid = false
//     },

//     onExpired() {
//       this.robotCheckInvalid = true
//     },
//   },
// }

}

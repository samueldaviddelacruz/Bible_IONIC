import {Injectable} from "@angular/core";
import {SocialSharing} from '@ionic-native/social-sharing';

import {Vibration} from '@ionic-native/vibration';
import {ToastController} from "ionic-angular";

@Injectable()
export class SocialSharingService {
  SocialNetworks: { 'WHATSAPP': string } = {WHATSAPP: 'whatsapp'};

  constructor(public socialSharing: SocialSharing,
              public vibration: Vibration,
              public toastCtrl: ToastController) {
  }

  async ShareOn(socialNetwork, content) {

    await this.socialSharing.share(content)
    switch (socialNetwork) {
      case this.SocialNetworks.WHATSAPP:
        //await this.socialSharing.share(content)
        await this.WhatsApp(content);
        break;
      default:
        await this.socialSharing.share(content)
    }

  }

  async Share(content) {
    try {

      this.vibration.vibrate(25);
      await this.socialSharing.share(content);

    } catch (err) {

      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 3000,
        position: 'top'
      });

      toast.present();
    }
  }


  public async WhatsApp(content) {

    try {

      this.vibration.vibrate(25);
      await this.socialSharing.shareViaWhatsApp(content);

    } catch (err) {

      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 3000,
        position: 'top'
      });

      toast.present();
    }

  }


}

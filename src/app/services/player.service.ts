import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { saveConfig } from '@ionic/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
  protected fire:AngularFirestore
) { }

save(player){
  return this.fire.collection("players").add(player)
  }
}

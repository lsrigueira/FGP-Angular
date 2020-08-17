import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Player } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playersDB: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.playersDB = this.db.list('/players', (ref) => ref.orderByChild('name'));
  }

  getPlayers(): Observable<Player[]>{
    return this.playersDB.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()}));
      })
    );
  }

  addPlayer(player: Player){
    return this.playersDB.push(player);
  }

  deletePlayer(id: string){
    this.playersDB.remove(id);
  }

  editPlayer(newPlayerData){
    const $key = newPlayerData.$key;
    delete(newPlayerData.$key);
    this.playersDB.update($key, newPlayerData);
  }

}

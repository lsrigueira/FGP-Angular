import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from '../interfaces/teams';

export const TeamsTableHeaders = ['Name', 'Country', 'Players'];

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamDb: AngularFireList<Team>;


  constructor(private db: AngularFireDatabase) {
      this.teamDb = this.db.list('/teams', ref => ref.orderByChild('name'));
  }

  getTeams(): Observable<Team[]> {
    return this.teamDb.snapshotChanges().pipe(
      map(changes =>{
        return changes.map( c => ({$key: c.payload.key, ...c.payload.val()}) );
      })
    );
  }


  addTeam(player: Team){
    return this.teamDb.push(player);
  }

  deleteTeam(id: string){
    this.teamDb.remove(id);
  }

  editTeam(newPlayerData){
    const $key = newPlayerData.$key;
    delete(newPlayerData.$key);
    this.teamDb.update($key, newPlayerData);
  }
}

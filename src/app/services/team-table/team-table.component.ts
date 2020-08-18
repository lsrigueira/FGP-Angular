import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Country } from '../../interfaces/player';
import { Team } from '../../interfaces/teams';
import { TeamService, TeamsTableHeaders } from '../team.service';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {

  public teams$: Observable<Team[]>;
  public tableHeaders = TeamsTableHeaders;
  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.teams$ = this.teamService.getTeams();
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe(teams =>{
      if (teams.length === 0){
        const team: Team = { 
          name: 'Ferro Real Piragua',
          nationality: Country.Spain,
          players: null
        };
        this.teamService.addTeam(team);
      }
    });
  }

}

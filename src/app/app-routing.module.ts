import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TeamsComponent } from './components/teams/teams.component';
import { PlayingComponent } from './components/playing/playing.component';
import { ViewingComponent } from './components/viewing/viewing.component';
import { TeamComponent } from './components/team/team.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, data: {animation: 'HomePage'} },
  { path: 'teams', component: TeamsComponent, data: {animation: 'TeamsPage'} },
  { path: 'team', component: TeamComponent, data: {animation: 'TeamPage'} },
  { path: 'viewing', component: ViewingComponent, data: {animation: 'ViewingPage'} },
  { path: 'playing', component: PlayingComponent, data: {animation: 'PlayingPage'} },
  { path: 'scoreboard', component: ScoreboardComponent, data: {animation: 'ScoreboardPage'} }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

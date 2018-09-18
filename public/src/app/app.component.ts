import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { NgForm } from '@angular/forms';
import { toDate } from '@angular/common/src/i18n/format_date';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'public';
  gameStart: boolean;
  newGame: any;
  returnGame: any;
  errMessage: any;
  game: any;
  earnMessage: any = [];
  gameErr: any;
  topThree: any;

  constructor(private _httpService: HttpService) {
    this.gameStart = false;
  }

  ngOnInit() {
    this.earnMessage = [];
    this.newGame = { userName: "", score: 0 };
    this.returnGame = { userName: "", score: 0 };
    this.errMessage = { status: "", message: { userName: "", reset: "" } };
    this.gameErr = { status: "", message: "" };
    this.getTopThree();
  }

  getDate() {
    return new Date();
  }

  getTopThree() {
    let observe = this._httpService.topThree();
    observe.subscribe(response => {
      if (response['status'] == false) {
        this.gameErr = response;
      }
      else if (response['status'] == true) {
        this.topThree = response['games'];
      }
    })
  }

  getNewGame() {
    let observe = this._httpService.newGame(this.newGame);
    observe.subscribe(response => {
      if (response['status'] == false) {
        this.errMessage = response;
      }
      else if (response['status'] == true) {
        this.game = response['game'];
        this.gameStart = true;
      }
    });
  }


  getGame() {
    let observe = this._httpService.getGame(this.returnGame);
    observe.subscribe(response => {
      if (response['status'] == false) {
        this.errMessage = response;
        console.log("resonse: " + response);
      }
      else if (response['status'] == true) {
        this.game = response['game'];
        this.gameStart = true;
      }
    });
  }

  resetGame() {
    this.game.score = 0;
    let observe = this._httpService.updateGameScore(this.game);
    observe.subscribe(response => {
      if (response['status'] == false) {
        this.earnMessage.message.reset = response['message'];
      } else if (response['status'] == true) {
        this.errMessage = {
          status: response['status'],
          message: { reset: "Your Game Score have been reset to zero" }
        }
        setTimeout(() => { this.ngOnInit(); }, 2000);
        this.getTopThree();
      }
    });
  }


  checkFarm() {
    let farm = Math.floor(Math.random() * 10) + 10;
    this.game.score += farm
    let str = "<p class='text-success'>Earned " + farm + " gold from the farm! (" + this.getDate() + ")</p>";
    this.earnMessage.unshift(str);
    let observe = this._httpService.updateGameScore(this.game);
    observe.subscribe(response => {
      this.getTopThree();
    });
  }

  checkCave() {
    let cave = Math.floor(Math.random() * 5) + 5;
    this.game.score += cave
    let str = "<p class='text-success'>Earned " + cave + " gold from the cave! (" + this.getDate() + ")</p>";
    this.earnMessage.unshift(str);
    let observe = this._httpService.updateGameScore(this.game);
    observe.subscribe(response => {
      this.getTopThree();
    });
  }

  checkHouse() {
    let house = Math.floor(Math.random() * 3) + 2;
    this.game.score += house
    let str = "<p class='text-success'>Earned " + house + " gold from the house! (" + this.getDate() + ")</p>";
    this.earnMessage.unshift(str);
    let observe = this._httpService.updateGameScore(this.game);
    observe.subscribe(response => {
      this.getTopThree();
    });
  }

  checkCasino() {
    let casino = Math.floor(Math.random() * 100) - 50;
    this.game.score += casino;
    if (casino == 0) {
      let str = "<p>Earned " + casino + " gold from the casino! (" + this.getDate() + ")</p>";
      this.earnMessage.unshift(str);
    } else if (casino < 0) {
      let str = "<p class='text-danger'>Lost " + (casino * -1) + " gold from the casino! (" + this.getDate() + ")</p>";
      this.earnMessage.unshift(str);
    } else {
      let str = "<p class='text-success'>Earned " + casino + " gold from the casino! (" + this.getDate() + ")<p>";
      this.earnMessage.unshift(str);
    }
    let observe = this._httpService.updateGameScore(this.game);
    observe.subscribe(response => {
      this.getTopThree();
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  newGame(GameBody) {
    return this._http.post('/game', GameBody);
  }

  getGame(game) {
    return this._http.get('/game/' + game.userName);
  }

  topThree() {
    return this._http.get('/topthree');
  }

  updateGameScore(game) {
    return this._http.put('/update', game);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { interval, timer} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'jemop';
  minutes: number
  seconds: number
  millis: number
  running: boolean;
  intervalo: any;



constructor(private cookie: CookieService, private router: Router){

  const minutes = parseInt(sessionStorage.getItem("minutes")!)
  const seconds = parseInt(sessionStorage.getItem("seconds")!)
  const millis = parseInt(sessionStorage.getItem("millis")!)

  if (minutes) {
    this.minutes=parseInt(sessionStorage.getItem("minutes")!)
    // this._handleStartClick()
  } else {
    this.minutes = 120
  }
  if (seconds) {
    this.seconds=parseInt(sessionStorage.getItem("seconds")!)
    // this._handleStartClick()
  } else {
    this.seconds = 60
  }
  if (millis) {
    this.millis=parseInt(sessionStorage.getItem("millis")!)
    this._handleStartClick()
    this.running=true;
  } else {
    this.millis = 0
    this.running=false;
  }

  this.intervalo=0;
  
}
variables(){
  sessionStorage.setItem("seconds", String(this.seconds))
  sessionStorage.setItem("minutes", String(this.minutes))
  sessionStorage.setItem("millis", String(this.millis))


  this._handleStartClick() 
}
  ngOnInit(): void {

    // const contador_seg = interval(1000); 
    // const contador_min = interval(100); 

    // contador_seg.subscribe((n)=>{

    //   if (!this.running)
    //   {
    //       this.running = true;
    //       this.intervalo = setInterval(() => {
    //         this.tic();}
    //         ,100);
    //   } 
    // });
  }
  _handleStartClick()  {
    if (!this.running)
    {
        this.running = true;
        this.intervalo = setInterval(() => {
          this.tic();}
          ,100);
    } 
}

_handleStopClick() {
    if (this.running)
    {
        this.running=false;
        clearInterval(this.intervalo);
    }
}

_handleResetClick()  {
    this._handleStopClick();
    this.minutes=120;
    this.seconds=60;
    this.millis=0;
    this.intervalo=0;
}
   
  tic(){
    let millis=this.millis+1;
    let seconds=this.seconds;
    let minutes=this.minutes;
    sessionStorage.setItem("seconds", String(seconds))
    sessionStorage.setItem("minutes", String(minutes))
    sessionStorage.setItem("millis", String(millis))
    if (millis===10)
    {
        millis=0;
        seconds--;

    }

    if (seconds===0)
    {
        seconds=60;
        minutes--;
    }
    if (minutes===0)
    {
      this.salir()
    }
    this.millis=millis;
    this.seconds=seconds;
    this.minutes=minutes;
  }
  salir() {
    this.cookie.deleteAll()
    sessionStorage.clear()
    this.router.navigate(["/"])
    this._handleResetClick()
    location.reload()
  }
}

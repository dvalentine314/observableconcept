import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestServiceService } from '../request-service.service';
import { filter, map, multicast, share, shareReplay, switchMap} from 'rxjs/operators'
import { forkJoin, of, Subject } from 'rxjs';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.scss']
})
export class ChildComponentComponent implements OnInit {

  componentLevelVariable:number=0;
  otherComponentVariable: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private requestService: RequestServiceService
    ){
      //this.function1();
      this.function3();
  }

  ngOnInit(): void {
  }

  function1(){
    this.activatedRoute.params.subscribe(z=>{
      if(z['id']){
        this.componentLevelVariable = parseInt(z['id'],10);
        this.requestService
          .thingThatReturnsObservable(this.componentLevelVariable)
          .subscribe(z=>{
            this.otherComponentVariable = z;
          });
      }
    })
  }

  function2(){
    this.activatedRoute.params.pipe(
      filter(z=>z['id']!=undefined),
      switchMap(z=>{
        this.componentLevelVariable = parseInt(z['id'],10);
        return this.requestService.thingThatReturnsObservable(this.componentLevelVariable);
    })).subscribe(z=>{
      this.otherComponentVariable = z;
    });
  }

  function3(){
    let parsedId$ = this.activatedRoute.params.pipe(
      filter(z=>z['id']!=undefined),
      map(z=>parseInt(z['id'],10)),
      shareReplay()
    );

    parsedId$.subscribe(z=>{
      this.componentLevelVariable = z;
    });

    parsedId$.pipe(switchMap(z=>{
      return this.requestService.thingThatReturnsObservable(z);
    })).subscribe(z=>{
      this.otherComponentVariable = z;
    });
  }

  function4(){
    this.activatedRoute.params.pipe(
      filter(z=>z['id']!=undefined),
      switchMap(z=>{
        let componentLevelVariable = parseInt(z['id'],10);
        return forkJoin([
          of(componentLevelVariable),
          this.requestService.thingThatReturnsObservable(componentLevelVariable)
        ]);
    })).subscribe(([componentLevelVariable,z])=>{
      this.componentLevelVariable = componentLevelVariable;
      this.otherComponentVariable = z;
    });
  }

}

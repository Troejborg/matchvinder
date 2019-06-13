import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {VotingService} from '../../services/voting.service';
import {startWith} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {BaseChartDirective} from 'ng2-charts';
import {VoteEntry} from '../../models/vote-entry';

@Component({
  selector: 'app-player-votes',
  templateUrl: './player-votes.component.html',
  styleUrls: ['./player-votes.component.scss']
})
export class PlayerVotesComponent implements OnInit, OnDestroy, AfterViewInit {


  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
        barPercentage: 1,
        barThickness: 1,
        maxBarThickness: 3,
        minBarLength: 2,
        ticks: {
          beginAtZero: true,
          stepValue: 1
        }
      }]
    },
  };
  public barChartLabels = [];
  public barChartType = 'horizontalBar';
  public barChartLegend = false;
  public voteEntries: any[];
  public barChartData = [
    {data: [], label: 'Stemmer', backgroundColor: 'rgba(0, 123, 255, 0.3)'}
  ];
  private voteSub: Subscription;
  @ViewChild(BaseChartDirective) public chart: BaseChartDirective;
  @ViewChild('countdown') public countdownElement: ElementRef;
  private clientHeight: number;

  constructor(private votingService: VotingService, private renderer: Renderer2 ) { }

  ngOnDestroy(): void {
    this.voteSub.unsubscribe();
  }

  ngOnInit() {
    this.clientHeight = window.innerHeight;
    console.log(this.clientHeight);
    this.votingService.getVoteResult();
    this.voteSub = this.votingService.voteResultConfirmed.pipe(
      startWith([])
    ).subscribe(voteEntries => {
      // this.voteEntries = voteEntries;

    });
  }

  private updateChartData(voteEntries) {
    this.barChartLabels = [];
    const data = [];
    // @ts-ignore
    voteEntries.forEach(voteEntry => {
      data.push(voteEntry.votes);
      this.barChartLabels.push(voteEntry.player.name);
    });
    this.barChartData[0].data = data;
    this.chart.update();
  }

  ngAfterViewInit(): void {
    // this.voteEntries = voteEntries;
    const voteEntries = [
      {player: 'John', votes: 3},
      {player: 'Allan', votes: 3},
      {player: 'Ronnie', votes: 2},
      {player: 'Martin', votes: 1},
      {player: 'Karma', votes: 4},
    ];

    if (voteEntries && voteEntries.length > 0 && this.countdownElement) {
      voteEntries.sort((a, b) => b.votes - a.votes).forEach((entry, index) => {
        const countDownText = this.renderer.createElement('text');
        // `<text x="0" y="150" animation-delay="${index}">${voteEntries.length - index}</text>`
        this.renderer.setAttribute(countDownText, 'x', '0');
        this.renderer.setAttribute(countDownText, 'y', '150');
        this.renderer.setAttribute(countDownText, 'animation-delay', index.toString());
        const text = this.renderer.createText((voteEntries.length - index).toString());
        this.renderer.appendChild(countDownText, text);
        this.renderer.appendChild(this.countdownElement.nativeElement, countDownText);
      });
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {
  AuthService,
  FacebookLoginProvider
} from 'angularx-social-login';
import * as CookieHelper from '../../services/cookie-helper';
import {ROUTES} from '../../routes';
import {Router} from '@angular/router';
import {TeamsService} from '../../services/teams.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor( private authService: AuthService, private router: Router, private teamService: TeamsService) { }

  ngOnInit() {
    function processInput(holder) {
      const elements = holder.children(); // taking the "kids" of the parent
      let str = ''; // unnecessary || added for some future mods
      elements.each(function(e) {
        // iterates through each element
        // @ts-ignore
        const val = $(this).val().replace(/\D/, ''), // taking the value and parsing it. Returns string without changing the value.
          focused = $(this).is(':focus'); // checks if the current element in the iteration is focused
        let parseGate = false;

        val.length === 1 ? (parseGate = false) : (parseGate = true);
        /*a fix that doesn't allow the cursor to jump
          to another field even if input was parsed
          and nothing was added to the input*/

        $(this).val(val); // applying parsed value.

        if (parseGate && val.length > 1) {
          // Takes you to another input
          const nextElement = elements[e + 1];
          const exist = !!nextElement; // checks if there is input ahead
          if (exist && val[1]) {
            nextElement.disabled = false;
            nextElement.value = val[1]; // sends the last character to the next input
            elements[e].value = val[0]; // clears the last character of this input
            nextElement.focus(); // sends the focus to the next input
          }
        } else if (parseGate && focused && val.length === 0) {
          // if the input was REMOVING the character, then
          const exist = !!elements[e - 1]; // checks if there is an input before
          if (exist) { elements[e - 1].focus(); } // sends the focus back to the previous input
        }

        val === '' ? (str += ' ') : (str += val);
      });
    }


    function extractTeamCode() {
      let teamCode = '';
      $('#inputs').children().each((index, element) => {
        if (element['value']) {
          teamCode += element['value'];
        }
      });
      return teamCode;
    }

    // tslint:disable-next-line:no-shadowed-variable
    async function tryTeamCodeLogin(teamCode, that) {
      console.log('Login time!', teamCode);
      const team = await that.teamService.getTeamByCode(teamCode);
      if (team) {
        CookieHelper.setCookie('TEAM_CODE', team.teamCode, 300);
        that.router.navigate([ROUTES.WAITING]);
        console.log(team);
      }
    }

    const inputElements = $('#inputs');
    const that = this;
    inputElements.on('input', function() {
      processInput($(this));

      const teamCode = extractTeamCode();
      if (teamCode.length === 4) {
        tryTeamCodeLogin(teamCode, that);
      }
    }); // still wonder how it worked out. But we are adding input listener to the parent... (omg, jquery is so smart...);

    inputElements.on('click', function() {
      // making so that if human focuses on the wrong input (not first) it will move the focus to a first empty one.
      const els = $(this).children(),
        str = '';
      els.each(function(e) {
        $(this).is(':focus');
        let $this = $(this);
        while ($this.prev().val() === '') {
          $this.prev().focus();
          $this = $this.prev();
        }
      });
    });

  }

  public doFacebookLogin() {
    const socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    this.authService.signIn(socialPlatformProvider).then(
      (userData) => {
        // This will return user data from facebook. What you need is a user token which you will send it to the server
        CookieHelper.setCookie('USER_ID', userData.id, 30);
        console.log('Success!', userData);
      }
    );
  }
}

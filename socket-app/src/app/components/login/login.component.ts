import { Component, OnInit } from '@angular/core';
declare var FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '354158228832101',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.3'
      });
      FB.AppEvents.logPageView();
    };
    (function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      const js = d.createElement(s); js.id = id;
      // @ts-ignore
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


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

    const inputElements = $('#inputs');
    inputElements.on('input', function() {
      processInput($(this));
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

  doFacebookLogin() {
    console.log('submit login to facebook');
    // FB.login();
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        // login success
        // login success code here
        // redirect to home page
      } else {
        console.log('User login failed');
      }
    });
  }
}

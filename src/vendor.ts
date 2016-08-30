// angular2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// rxjs
import 'rxjs';

import 'firebase';
import 'angularfire2';
import 'jquery';
import 'font-awesome-sass-loader';
import 'lodash';

if (ENV === 'production') {
  // prod
} else {
  // dev
  require('angular2-hmr');
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService, FirebaseAuthService } from '../signin';
import { Dashboard } from './dashboard.component';
import { Home, Profile, Events, AddEvent, Navbar, Sidebar, EventItem } from './components';
import { ContentSwapService, SidebarActivity, AddEventService, EventsService,
         EventSwapService } from './shared';

@NgModule({
  declarations: [Dashboard, Navbar, Sidebar, Home, Profile, Events, AddEvent, EventItem],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule],
  providers: [ContentSwapService, SidebarActivity, AuthService, FirebaseAuthService,
              AddEventService, EventsService, EventSwapService]
})
export class DashboardModule {}

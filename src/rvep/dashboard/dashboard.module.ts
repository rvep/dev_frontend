import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService, FirebaseAuthService } from '../signin';
import { Dashboard } from './dashboard.component';
import { Home, Profile, Events, AddEvent, Navbar, Sidebar } from './components';
import { ContentSwap, SidebarActivity, AddEventService, EventsService } from './shared';

@NgModule({
  declarations: [Dashboard, Navbar, Sidebar, Home, Profile, Events, AddEvent],
  imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpModule],
  providers: [ContentSwap, SidebarActivity, AuthService, FirebaseAuthService,
              AddEventService, EventsService]
})
export class DashboardModule {}
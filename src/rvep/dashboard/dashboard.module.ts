import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AuthService, FirebaseAuthService } from '../signin';
import { Dashboard } from './dashboard.component';
import { Home, Profile, Events, AddEvent, Navbar, Sidebar } from './components';
import { ContentSwap, SidebarActivity } from './shared';

@NgModule({
  declarations: [Dashboard, Navbar, Sidebar, Home, Profile, Events, AddEvent],
  imports: [BrowserModule],
  providers: [ContentSwap, SidebarActivity, AuthService, FirebaseAuthService]
})
export class DashboardModule {}
import { Routes } from '@angular/router';
import { Home } from './layout/home/home';
import { About } from './layout/about/about';
import { Skills } from './layout/skills/skills';
import { Experince } from './layout/experince/experince';
import { Projects } from './layout/projects/projects';
import { Contact } from './layout/contact/contact';
import { Layout } from './layout/layout';
import { Dashboard } from './dashboard/dashboard';
import { AddHome } from './dashboard/add-home/add-home';
import { NotFound } from './not-found/not-found';
import { AddAbout } from './dashboard/add-about/add-about';
import { AddSkills } from './dashboard/add-skills/add-skills';
import { AddProjects } from './dashboard/add-projects/add-projects';
import { AddExperince } from './dashboard/add-experince/add-experince';
import { AddContact } from './dashboard/add-contact/add-contact';
import { Navbar } from './layout/navbar/navbar';





export const routes: Routes = [
    // {path: "", component:Layout,children:[
    // {path: '', redirectTo: 'navbar', pathMatch: 'full'},
    // {path:'', component:Navbar},
    // {path:'home', component:Home},
    // {path:'about', component:About},
    // {path:'skills', component:Skills},
    // {path:'experience', component:Experince},
    // {path:'projects', component:Projects},
    // {path:'contact', component:Contact}

  
    // ]},

    {path: '', component:Layout},
    {path:'home', component:Home},
    {path:'about', component:About},
    {path:'skills', component:Skills},
    {path:'experience', component:Experince},
    {path:'projects', component:Projects},
    {path:'contact', component:Contact}

  
    ,

    {path:"dashboard", component:Dashboard,children:[
        {path:"addnavbar", component:AddHome},
        {path:"addhome", component:AddHome},
        {path:"addabout", component:AddAbout},
        {path:"addskills", component:AddSkills},
        {path:"addexperience", component:AddExperince},
        {path:"addprojects", component:AddProjects},
        {path:"addcontact", component:AddContact},
    ]},
    
    {path:"**", component:NotFound}
    
];
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { RuleEditComponent } from "./rules/rule-edit/rule-edit.component";
import { RuleItemComponent } from "./rules/rule-list/rule-item/rule-item.component";
import { RuleListComponent } from "./rules/rule-list/rule-list.component";
import { RulesComponent } from "./rules/rules.component";

const appRoutes:Routes = [
    {path:'', redirectTo:'/rules',pathMatch:'full'},
    {path:'rules',component:RulesComponent,
        children:[
            {path:'new',component:RuleEditComponent},
            //{path:':id',component:RuleItemComponent},
            {path:':id/edit',component:RuleEditComponent}
        ]
    },
    {path:'**',component:HeaderComponent}
]
@NgModule({
    declarations:[],
    imports:[
        CommonModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})
export class AppRoutingModule {}

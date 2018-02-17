 import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { PhotoGridComponent } from '../photo-grid/photo-grid.component';
import { PhotoUploadComponent } from '../photo-upload/photo-upload.component';

    const routes: Routes = [
        {
            path: 'photo-grid',
            component: PhotoGridComponent,
        },
         {
            path: 'photo-upload',
            component: PhotoUploadComponent,
        },
    ];

    @NgModule({
        imports: [
            RouterModule.forRoot(routes),
            RouterModule
        ],
        exports: [
            RouterModule
        ],
        declarations: []
    })
    export class AppRoutingModule { }

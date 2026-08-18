import { Component} from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-password',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './edit-password.html',
  styleUrl: './edit-password.css',
})
export class EditPassword {

}

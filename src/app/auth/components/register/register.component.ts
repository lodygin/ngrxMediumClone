import {Component, OnInit} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {select, Store} from '@ngrx/store'
import {Observable} from 'rxjs'
import {registerAction} from 'src/app/auth/store/actions/register.action'
import {
  isSubmittingSelector,
  validationErrorsSelector
} from 'src/app/auth/store/selectors'
import {RegisterRequestInterface} from 'src/app/auth/types/registerRequest.interface'
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup
  isSubmitting$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeForm()
    this.initializeValues()
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
  }

  initializeForm(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: '',
      password: ''
    })
  }

  onSubmit(): void {
    const request: RegisterRequestInterface = {user: this.form.value}
    this.store.dispatch(registerAction({request}))
  }
}

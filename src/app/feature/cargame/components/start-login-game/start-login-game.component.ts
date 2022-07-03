import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JuegoCreado } from '../../models/events/juego-creado.model';
import { JuegoService } from '../../services/juego.service';

@Component({
  selector: 'app-start-login-game',
  templateUrl: './start-login-game.component.html',
  styleUrls: ['./start-login-game.component.scss'],
})
export class StartLoginGameComponent implements OnInit {
  @Input()
  juegoId: string;
  @Output()
  ingresar: EventEmitter<boolean> = new EventEmitter();
  title: string = 'Ingresar código';
  // Declaracion de formulario del juego
  juegoIdForm: FormGroup;
  constructor(
    private juegoService: JuegoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.crearFormularioJuegoId();
  }
  crearFormularioJuegoId() {
    this.juegoIdForm = this.formBuilder.group({
      juegoId: [this.juegoId, [Validators.required]],
    });
  }
  isValidFieldDatosJuegoIdForm(field: string): boolean {
    return (
      (this.juegoIdForm.get(field)?.dirty ||
        this.juegoIdForm.get(field)?.touched) &&
      this.juegoIdForm.get(field)?.invalid
    );
  }
  iniciarJuego() {
    this.juegoService
      .informacionJuego(this.juegoIdForm.get('juegoId').value)
      .subscribe((juegoCreado: JuegoCreado) => {
        this.juegoService.juego = juegoCreado;
        this.juegoService.juegoId = juegoCreado.aggregateRootId;
        this.ingresar.emit(true);
      });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CrearJuegoCommand } from '../../models/crear-juego-command.model';
import { JuegoService } from '../../services/juego.service';

const MINIMO_DE_KILOMETROS = 1;
const PATRON_KILOMETROS = '^[0-9]+$';
@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.scss'],
})
export class CreateGameComponent implements OnInit {
  // Stepper
  @ViewChild('stepper') stepper;
  // Propiedades stepper
  isLinear = true;
  datosJuegoCompleted: boolean = false;
  datosJugadoresCompleted: boolean = false;
  // Titulo del formulario
  title: string = 'Crear Juego';
  // Objeto crear juego command para realizar la peticion
  crearJuegoCommand: CrearJuegoCommand;
  // Declaracion de formulario del juego
  juegoForm: FormGroup;
  jugadoresForm: FormGroup;
  constructor(
    private juegoService: JuegoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.crearFormularioJuego();
    this.crearFormularioJugadores();
  }

  // Formulario datos iniciales del juego
  crearFormularioJuego() {
    this.juegoForm = this.formBuilder.group({
      juegoId: [null, [Validators.required]],
      kilometros: [
        null,
        [
          Validators.required,
          Validators.min(MINIMO_DE_KILOMETROS),
          Validators.pattern(PATRON_KILOMETROS),
        ],
      ],
    });
  }
  isValidFieldDatosJuegoForm(field: string): boolean {
    return this.isValidFieldOfFormGeneral(this.juegoForm, field);
  }
  guardarDatosInicialesDelJuego() {
    const juegoId: string = this.juegoForm.get('juegoId').value;
    const kilometros: number = this.juegoForm.get('kilometros').value;
    this.crearJuegoCommand = new CrearJuegoCommand(juegoId, kilometros);
    this.datosJuegoCompleted = true;
    this.stepperNext();
  }

  // Formulario para jugadores
  crearFormularioJugadores() {
    this.jugadoresForm = this.formBuilder.group({
      jugadores: this.formBuilder.array([]),
    });
    this.addJugadorForm();
  }
  isValidFieldDatosJugadoresForm(field: string): boolean {
    return this.isValidFieldOfFormGeneral(this.jugadoresForm, field);
  }
  get jugadores() {
    return this.jugadoresForm.controls['jugadores'] as FormArray;
  }
  addJugadorForm() {
    const jugadorForm = this.formBuilder.group({
      cedula: [null, Validators.required],
      nombre: [null, Validators.required],
    });
    this.jugadores.push(jugadorForm);
  }
  deleteJugadorForm(jugadorIndex: number) {
    this.jugadores.removeAt(jugadorIndex);
  }
  private addJugador(cedula: string, nombre: string) {
    this.crearJuegoCommand.addJugador(cedula, nombre);
  }
  // Metodo final de crear juego
  crearJuego() {
    this.jugadores.controls.forEach((fg: FormGroup) =>
      this.addJugador(fg.controls['cedula'].value, fg.controls['nombre'].value)
    );
    this.juegoService.crearJuego(this.crearJuegoCommand).subscribe((data) => {
      console.log(data);
    });
    this.datosJugadoresCompleted = true;
    this.stepperNext();
  }

  // Iniciar juego
  iniciarJuego() {
    this.router.navigate(['cargame/home/start']);
  }

  // Generales
  isValidFieldOfFormGeneral(form: FormGroup, field: string): boolean {
    return (
      (form.get(field)?.dirty || form.get(field)?.touched) &&
      form.get(field)?.invalid
    );
  }

  private stepperNext() {
    setTimeout(() => {
      this.stepper.next();
    }, 100);
  }

  public stepperPrevious() {
    this.stepper.previous();
  }
}

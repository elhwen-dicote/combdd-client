import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder } from "@angular/forms";

import { Subscription } from 'rxjs';

import { Group, Caracter } from 'src/app/model';
import { Action } from '../caracter-table/caracter-table.component';

const noop = () => { };

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: GroupFormComponent,
      multi: true,
    }
  ],
})
export class GroupFormComponent implements OnInit, OnDestroy {

  groupForm: FormGroup;
  group: Group;

  // table des membres du group.
  columns = ['name', 'remove'];
  actions: Action[] = [
    new Action('remove', 'Enlever', 'remove'),
  ];

  // table des personnages pour sélection
  caractersColumns = ['name', 'hp', 'add'];
  caracterActions: Action[] = [
    new Action(
      'add', // name
      'Ajouter', // header
      'add', // icon
      (c) => { // isEnabled
        return this.group && !this.group.members.some(m => m._id === c._id);
      }
    ),
  ];


  private onChange: (_) => void = noop;
  private onTouched: () => void = noop;
  private valueChangedSub: Subscription;
  private statusChangedSub: Subscription;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.groupForm = this.fb.group({
      name: [''],
    });
    this.group = {
      name: '',
      members: [],
    };

    this.valueChangedSub = this.groupForm.valueChanges.subscribe(
      value => {
        this.group = {
          ...this.group,
          name: value.name,
        }
        this.onChange(this.group);
      }
    );
    this.statusChangedSub = this.groupForm.statusChanges.subscribe(
      (status) => console.log(status),
    );
  }

  ngOnDestroy(): void {
    if (this.valueChangedSub) {
      this.valueChangedSub.unsubscribe();
    }
    if (this.statusChangedSub) {
      this.statusChangedSub.unsubscribe();
    }
  }

  onCaractersAction({ action, caracter }: {
    action: string;
    caracter: Caracter;
  }): void {
    switch (action) {
      case 'add': {
        this.group = GroupFormComponent.addMember(caracter, this.group);
        this.onChange(this.group);
      } break;

      default:
        break;
    }
  }

  onClick(action: Action, caracter: Caracter) {
    switch (action.name) {
      case 'remove': {
        this.group = GroupFormComponent.removeMember(caracter, this.group);
        this.onChange(this.group);
      } break;

      default:
        break;
    }
  }

  @HostListener('blur') onBlur() {
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.group = this.sanitizeValue(obj);
    this.groupForm.setValue({ name: this.group.name }, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.groupForm.disable({ emitEvent: false })
    } else {
      this.groupForm.enable({ emitEvent: false });
    }
  }

  private static addMember(caracter: Caracter, group: Group): Group {
    let result = group;
    if (!group.members.some(car => car._id === caracter._id)) {
      result = {
        ...group,
        members: [...group.members, caracter],
      }
    }
    return result;
  }

  private static removeMember(caracter: Caracter, group: Group): Group {
    let result = group;
    if (group.members.some(car => car._id === caracter._id)) {
      result = {
        ...group,
        members: group.members.filter(car => car._id !== caracter._id),
      }
    }
    return result;
  }

  private sanitizeValue(obj: any): Group {
    return obj
      ? {
        name: obj.name || '',
        members: obj.members || [],
      }
      : {
        name: '',
        members: [],
      };
  }

}

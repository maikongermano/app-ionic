import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
// import { DataService } from '../data.service';
import { List } from '../models/list.model';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  public lists: List[] = [];
  public list: List;

  constructor(
   // private readonly data: DataService
    private alertCtrl: AlertController
  ) {
    if (this.lists.length === 0) {
      this.showAddList();
    }
  }

  async load() {
    const data = new List('Compras', []);
    data.tasks.push(new Task('Passear com o cachorro', false));
    data.tasks.push(new Task('Ir ao supermercado', false));
    data.tasks.push(new Task('Cortar o cabelo', false));
    data.tasks.push(new Task('Assistir TV', true));

    this.list = data;
  }

  removeTask(task: Task) {
    const index = this.list.tasks.indexOf(task);
    this.list.tasks.splice(index, 1);
    this.save(this.list);
  }

  toggleDone(task: Task) {
    if (task.done) {
      task.done = false;
    }
    else {
      task.done = true;
    }
    this.save(this.list);
  }

  async addList(title: string) {
    this.lists.push(new List(title, []));
    this.list = this.lists[this.lists.length - 1];
  }

  async showAddList() {
    const alert = await this.alertCtrl.create({
      header: 'Lista de Tarefa',
      subHeader: 'Criar nova lista de tarefas',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Nome da lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Salvar',
          handler: (data) => {
            this.addList(data.title);

          }
        }
      ]
    });

    await alert.present();
  }

  async showAddTask() {
    const alert = await this.alertCtrl.create({
      header: 'Adicionar nova tarefa',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Qual sua tarefa?'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Salvar',
          handler: (data) => {
            this.list.tasks.push(new Task(data.task, false));
          }
        }
      ]
    });

    await alert.present();
  }

  async showLists() {
    const alert = await this.alertCtrl.create({
      header: 'Suas Listas',
      inputs: [
        {
          name: 'Teste',
          type: 'radio',
          label: 'Radio 1',
          value: this.lists,
          checked: true
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }, {
          text: 'Selecionar',
          handler: (data) => {
            console.log(data);
          }
        }
      ]
    });

    await alert.inputs.push({
      name: 'OLHA EU AQUI',
      type: 'radio',
      label: 'OLHA EU AQUI',
      value: 'VALOR'
    });

    await alert.present();
  }

  // deve ficar no service
  public save(list: List) {
    const data = JSON.stringify(list);
    localStorage.setItem('list', data);
  }

  public get(): List {
    const data = localStorage.getItem('list');
    if (data) {
      return JSON.parse(data);
    }
    else {
      return null;
    }
  }
  //


}

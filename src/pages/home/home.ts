import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  users: any[] = [];
  menus:any[] = [];
  compras: Array<string> = [];
  comprasextras:Array<string> = [];
  comprasvalextras:Array<number> = [];
  comprascantidad:Array<number>=[];  
  comprastotal:Array<number>=[];
  comprasimagen:Array<string>=[];
  losextras: Array<string> = [];
  
  lacant: Array<number>= [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  cextras:string[][]= [[],[]];
  valextras:Array<number>=[];
  textoextras:any[]=[];

  constructor(
    public navCtrl: NavController,
    public userService: UserService,
    private alertCtrl: AlertController
  ) {}

    total_suma = 0;
 

 elimina(i)
 {
   this.total_suma=this.total_suma-this.comprastotal[i];
           
   this.compras.splice(i,1);
              this.comprascantidad.splice(i,1);
           this.comprasvalextras.splice(i,1);
           this.comprasextras.splice(i,1);
           this.comprasimagen.splice(i,1);
           console.log(this.compras);
           this.comprastotal.splice(i,1);


 }
  agrega(i)
  {
 
      if (this.lacant[i]==0)
      {
        let alert = this.alertCtrl.create({
        title: 'Compras',
        subTitle: 'Debe seleccionar una cantidad',
        buttons: ['Ok']
        
              });
          
          alert.present();
      
      }
      else
      {
          console.log('Array:');
          //console.log(this.cextras[i].length);
          console.log(this.cextras[i]);


        this.textoextras[i]='';
        this.valextras[i]=0;

           for (var _i =0; _i <= (this.cextras[i].length-1); _i++) 
           {
                


                var _k=Number(this.cextras[i][_i]);
                var _e=Number(this.menus[i].valextras[_i]);
                console.log('Extra a agregar');
                console.log(this.menus[i].extras[_k]);
                console.log('Numero');
                console.log(_k);
                console.log('Contador');
                console.log(_i);
                console.log('Len array');
                console.log(this.cextras[i].length);
         
                {
                if (this.textoextras[i]=='')
                {
                   this.textoextras[i]=this.menus[i].extras[_k];
                 }
                 else
                 {
                this.textoextras[i]=this.textoextras[i]+','+this.menus[i].extras[_k];
                   
                 }
                 

                   this.valextras[i]+=_e;
                 
                }
                }        
console.log('extras:');
console.log(this.textoextras);
  
          let alert = this.alertCtrl.create({ title: 'Compras',
          subTitle: 'Se agrego '+this.menus[i].nombre+ 'x '+this.lacant[i],
          buttons: ['Ok'] });
          this.compras.push(this.menus[i].nombre+" X "+this.lacant[i]);
           console.log(this.compras);
           console.log('xx');
           this.comprascantidad.push(this.lacant[i]);
           this.comprasvalextras.push(this.valextras[i]);
           this.comprasextras.push(this.textoextras[i]);
           this.comprasimagen.push(this.menus[i].imagen);
           console.log(this.comprasimagen);
           this.comprastotal.push(this.lacant[i]*(this.valextras[i]+Number(this.menus[i].preciou)));
            this.total_suma+=this.lacant[i]*(this.valextras[i]+Number(this.menus[i].preciou));
           alert.present();
      }
      
  }



  ionViewDidLoad()
  {
     console.log('Iniciando:');

        this.userService.getMenu().subscribe((data) => 
        {
        this.menus = data['results'];
        console.log(data['results']);
        },
        (error) =>{
        console.error(error);
        }
      );
        
  }

}

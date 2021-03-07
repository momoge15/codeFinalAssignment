import { Matiere} from "./matiere.model"
export class Assignment {
  _id?: string;
  id: number;
  nom: string;
  dateDeRendu: Date;
  rendu?: boolean;
  etudiant?: String;
  matiere : {titre:String, prof: String};
  note ?: String;
  remarque ?: String;


}



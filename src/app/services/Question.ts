export interface Question { //interface ist eine Vorlage die eine Klasse implementieren kann; in typescript kann ein interface ohne class erstellt werden (gewöhnliches JavaScript object)
    id: string;             //export ist so wie public
    title: string;
    a1: string;
    a2: string;
    a3: string;
    a4: string;
    correct: number;
}
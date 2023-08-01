

export interface IButtonSubmit {
  contentBtnPrimary: string | any;
}

export interface IButton {
  link: string;
  contentBtnPrimary: string | any;
  contentBtnSecondary: string;
}

export interface IButtonUnique {
  link: string;
  contentBtn: string | any;
}


export interface ILector {
  name?: string;
  phone?: string;
  birthday?: Date;
  cpf?: string;
  email?: string;
}

export interface IAuthor {
  name?: string;
  gender?: string;
  origin?: Date;
}
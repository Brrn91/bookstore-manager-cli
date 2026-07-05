export class Author {
  name: string;
  nationality: string;
  birthDate: string;
  id?: number;

  constructor(
    name: string,
    nationality: string,
    birthDate: string,
    id?: number,
  ) {
    this.name = name;
    this.nationality = nationality;
    this.birthDate = birthDate;
    this.id = id;
  }
}

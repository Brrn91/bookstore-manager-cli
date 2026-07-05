class Author {
  id?: number;
  name: string;
  nationality: string;
  birthDate: string;

  constructor(
    name: string,
    nationality: string,
    birthDate: string,
    id?: number,
  ) {
    this.name = name;
    this.id = id;
    this.nationality = nationality;
    this.birthDate = birthDate;
  }
}

export class Book {
  title: string;
  authorId: number;
  genre: string;
  publishedYear: number;
  totalCopies: number;
  availableCopies: number;
  id?: number;

  constructor(
    title: string,
    authorId: number,
    genre: string,
    publishedYear: number,
    totalCopies: number,
    availableCopies: number,
    id?: number,
  ) {
    this.title = title;
    this.authorId = authorId;
    this.genre = genre;
    this.publishedYear = publishedYear;
    this.totalCopies = totalCopies;
    this.availableCopies = availableCopies;
    this.id = id;
  }
}

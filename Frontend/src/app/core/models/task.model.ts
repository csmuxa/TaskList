export class Task {


  constructor(
    private _id: number,
    private _description: string,
    private _createDate: Date,
    private _completed: boolean) {
  }

  get id(): number {
    return this._id;
  }

  get description(): string {
    return this._description;
  }

  get createDate(): Date {
    return this._createDate;
  }

  get completed(): boolean {
    return this._completed;
  }

  /*
    private long id;


    private String description;

    private Date createDate  new Date();

    private boolean completed=false;

  */
}

interface IErrorInformation {
  message: string;
  code: string;
}

export class AppError {
  public readonly message: string | IErrorInformation;

  public readonly statusCode: number;

  constructor(message: string | IErrorInformation, statusCode = 400) {
    this.message = message;

    this.statusCode = statusCode;
  }
}

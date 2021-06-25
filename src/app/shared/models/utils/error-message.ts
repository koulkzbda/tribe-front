export class ErrorMessage {
  constructor(
    public code: ErrorCode,
    public message: string,
    public details?: string
  ) { }
}

export enum ErrorCode {
  JOB = "JOB",
  VALIDATION = "VALIDATION",
  PICTURE = "PICTURE",
  SECURITY = "SECURITY",
  PROFILE = "PROFILE",
  PUBLICATION = "PUBLICATION",
  ENTITY = "ENTITY",
  NOT_CONFIRMED = "NOT_CONFIRMED"
}

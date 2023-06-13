interface ExceptionArguments {
  name: string
  originalError?: unknown
  message?: string
  userMessage?: string
  unexpected?: boolean
  httpStatusCode?: number
  data?: object
}

export class Exception extends Error {
  public readonly name: string
  public readonly isUnexpected: boolean
  public readonly userMessage?: string
  public readonly originalError?: unknown
  public readonly httpStatusCode?: number
  public readonly data?: object

  static DEFAULT_MESSAGE = 'unknown exception'

  constructor(args: ExceptionArguments) {
    const originalMessage = (args.originalError as any)?.message

    super(args.message || originalMessage || Exception.DEFAULT_MESSAGE)

    this.name = args.name
    this.userMessage = args.userMessage
    this.isUnexpected = args.unexpected || false
    this.originalError = args.originalError
    this.httpStatusCode = args.httpStatusCode
    this.data = args.data
  }
}

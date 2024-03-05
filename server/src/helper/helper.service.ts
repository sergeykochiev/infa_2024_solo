import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HelperService {
    throwServerError(message: string, error: unknown): void {
        const throwClose = (typedError: string | Error): void => {
            throw new HttpException({
                message: message,
                cause: typedError
            }, HttpStatus.INTERNAL_SERVER_ERROR, { cause: error })
        }
        if (typeof error === 'string') {
            throwClose(error)
        } else if (error instanceof Error) {
            throwClose(error.message)
        } else {
            throwClose('Unknown error')
        }
    }
}

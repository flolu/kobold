import {ClassConstructor, plainToClass} from 'class-transformer'
import {validateOrReject} from 'class-validator'
import {StatusCodes} from 'http-status-codes'

import {Exception} from '@kobold/exceptions'

// LATER specify if additional properties are allowed
export const buildAndValidateModel = async <T extends object, V extends T>(
  Model: ClassConstructor<T>,
  data: V,
): Promise<T> => {
  try {
    /**
     * LATER use alternative to class-validator and class-transformer
     * since they are not performant
     * - https://deepkit.io/library/type
     * - https://github.com/colinhacks/zod
     */
    const model = plainToClass<T, V>(Model, data)
    await validateOrReject(model)
    return model
  } catch (err) {
    throw new Exception({
      name: 'data_validation_failed',
      originalError: err,
      httpStatusCode: StatusCodes.BAD_REQUEST,
    })
  }
}

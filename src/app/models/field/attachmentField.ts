import { Schema } from 'mongoose'

import { AttachmentSize, IAttachmentFieldSchema } from '../../../types/field'

const createAttachmentFieldSchema = () => {
  const AttachmentFieldSchema = new Schema<IAttachmentFieldSchema>({
    attachmentSize: {
      type: String,
      required: true,
      enum: Object.values(AttachmentSize),
    },
  })

  return AttachmentFieldSchema
}

export default createAttachmentFieldSchema

import mongoose from '../../config/database';
import paginate from 'mongoose-paginate-v2';

export interface Program {
  name: string;
}

export interface ProgramDocument extends Program, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema = new mongoose.Schema<ProgramDocument>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

ProgramSchema.plugin(paginate);

const ProgramModel = mongoose.model<ProgramDocument, mongoose.PaginateModel<ProgramDocument>>('Program', ProgramSchema);

export default ProgramModel;
import mongoose from '../../config/database';
import ProgramModel, {Program, ProgramDocument} from './programs.model';

export const create = async (data: Program): Promise<ProgramDocument> => {
  return ProgramModel.create(data);
};

export const createMany = async (
  data: Program[],
): Promise<ProgramDocument[]> => {
  return ProgramModel.insertMany(data);
};

export const findOne = async (
  query: mongoose.FilterQuery<ProgramDocument>,
  options: mongoose.QueryOptions = { lean: true },
): Promise<ProgramDocument | null> => {
  return await ProgramModel.findOne(query, {}, options);
};

export const find = async (
  query: mongoose.FilterQuery<ProgramDocument>,
  options: mongoose.PaginateOptions,
) => {
  return await ProgramModel.paginate(query, options);
};

export const update = async (
  query: mongoose.FilterQuery<ProgramDocument>,
  update: mongoose.UpdateQuery<ProgramDocument>,
  options: mongoose.QueryOptions = { new: true },
): Promise<ProgramDocument | null> => {
  return await ProgramModel.findOneAndUpdate(query, update, options);
};

export const remove = async (
  query: mongoose.FilterQuery<ProgramDocument>,
): Promise<ProgramDocument | null> => {
  return await ProgramModel.findOneAndDelete(query);
};

export const removeMany = async (
  query: mongoose.FilterQuery<ProgramDocument>,
) => {
  return await ProgramModel.deleteMany(query);
}
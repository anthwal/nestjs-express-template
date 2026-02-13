import { Injectable } from '@nestjs/common';
import { UserModel } from '../../../databases/models/user.model';
import { Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserRepoService {
  constructor(@InjectModel(UserModel) public userModel: typeof UserModel) {}

  /**
   * Find by email or returns null when not found
   * @param email
   * @param transaction
   */
  public findByEmail(
    email: string,
    transaction?: Transaction,
  ): Promise<UserModel | null> {
    return this.userModel.findOne({ where: { email }, transaction });
  }

  /**
   * Find user by email or fail
   * @param email
   * @param transaction
   */
  public findByEmailOrFail(
    email: string,
    transaction?: Transaction,
  ): Promise<UserModel> {
    return this.userModel.findOne({
      where: { email },
      transaction,
      rejectOnEmpty: true,
    });
  }

  /**
   * Finds the user or fails
   * @param id
   * @param transaction
   */
  public findOrFail(id: string, transaction?: Transaction): Promise<UserModel> {
    return this.userModel.findByPk(id, { transaction, rejectOnEmpty: true });
  }
}

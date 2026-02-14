import { Injectable } from '@nestjs/common';
import { UserModel } from '../../../databases/models/user.model';
import { Transaction } from 'sequelize';
import { InjectModel } from '@nestjs/sequelize';
import { HashEncryptService } from '../../../auth/services/hash-encrypt/hash-encrypt.service';

@Injectable()
export class UserRepoService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    private readonly hashEncryptService: HashEncryptService,
  ) {}

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

  // Create a new user
  public async create(
    userDetails: Pick<UserModel, 'email' | 'password'>,
    transaction?: Transaction,
  ): Promise<UserModel> {
    return this.userModel
      .build()
      .set({
        email: userDetails.email,
        password: userDetails.password
          ? await this.hashEncryptService.createHash(userDetails.password)
          : null,
      })
      .save({ transaction });
  }
}

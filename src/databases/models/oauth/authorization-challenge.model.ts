import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { UserModel } from '../user.model';
import { ClientModel } from './client.model';
import { RegisterModel } from '../../model-bootstrap/default-connection-models';
import { BaseModel } from '../base.model';

@RegisterModel()
@Table({ tableName: 'oauth_authorization_challenges' })
export class AuthorizationChallengeModel extends BaseModel<AuthorizationChallengeModel> {
  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID })
  declare public user_id: string;

  @Column({ type: DataType.STRING })
  declare public challenge: string;

  @Column({ type: DataType.STRING })
  declare public algorithm: string;

  @ForeignKey(() => ClientModel)
  @Column({ type: DataType.UUID })
  declare public client_id: string;

  @BelongsTo(() => UserModel)
  public user: UserModel;

  @BelongsTo(() => ClientModel)
  public client: ClientModel;
}

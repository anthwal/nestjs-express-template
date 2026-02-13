import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ClientModel } from './client.model';
import { UserModel } from '../user.model';
import { RegisterModel } from '../../model-bootstrap/default-connection-models';
import { BaseModel } from '../base.model';

@RegisterModel()
@Table({ tableName: 'oauth_access_tokens' })
export class AccessTokenModel extends BaseModel<AccessTokenModel> {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  declare public id: string;

  @ForeignKey(() => ClientModel)
  @Column({ type: DataType.STRING })
  declare public client_id: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID })
  declare public user_id: string | null;

  @Column({ type: DataType.DATE })
  declare public expires_at: Date | null;

  @BelongsTo(() => ClientModel)
  public client: ClientModel;

  @BelongsTo(() => UserModel)
  public user: UserModel | null;
}

import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { AccessTokenModel } from './access-token.model';
import { RegisterModel } from '../../model-bootstrap/default-connection-models';
import { BaseModel } from '../base.model';

@RegisterModel()
@Table({ tableName: 'oauth_refresh_tokens' })
export class RefreshTokenModel extends BaseModel<RefreshTokenModel> {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  declare public id: string;

  @ForeignKey(() => AccessTokenModel)
  @Column({ type: DataType.UUID })
  declare public access_token_id: string;

  @Column({ type: DataType.DATE })
  declare public expires_at: Date | null;

  @BelongsTo(() => AccessTokenModel)
  declare public accessToken: AccessTokenModel;
}

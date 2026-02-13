import { Column, DataType, Table, Default } from 'sequelize-typescript';
import { GrantTypes } from '../../../auth/grant-types/grant-type-implementation';
import { RegisterModel } from '../../model-bootstrap/default-connection-models';
import { BaseModel } from '../base.model';

@RegisterModel()
@Table({ tableName: 'oauth_clients' })
export class ClientModel extends BaseModel<ClientModel> {
  @Column({ type: DataType.STRING })
  declare public name: string;

  @Default(null)
  @Column({ type: DataType.STRING })
  declare public secret: string | null;

  @Column({ type: DataType.BOOLEAN })
  declare public is_revoked: boolean;

  @Column({ type: DataType.STRING })
  declare public grant_type: GrantTypes;
}

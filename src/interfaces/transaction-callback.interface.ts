import { Transaction } from 'sequelize';

export interface TransactionCallback {
  registerEventCallBacks(
    callback: () => Promise<any>,
    transaction?: Transaction,
  ): void;
}

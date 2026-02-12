import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';

@Injectable()
export class EventRegisterCallbackService {
  /**
   * Register callbacks for transaction. If transaction does not exists then fires synchronously
   * @param callback
   * @param transaction
   */
  public registerEventCallBacks(
    callback: () => Promise<void>,
    transaction?: Transaction,
  ): void {
    if (transaction) {
      transaction.afterCommit(async () => {
        await callback();
      });
      return;
    }

    void callback();
  }
}

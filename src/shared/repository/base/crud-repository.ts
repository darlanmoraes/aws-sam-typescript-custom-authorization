import * as AWS from 'aws-sdk';
import * as bluebird from 'bluebird';

const {
  REGION,
  ACCESS_KEY_ID,
  SECRET_ACCESS_KEY
} = process.env;

AWS.config.setPromisesDependency(bluebird);
AWS.config.update({
  region: REGION,
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY
});

export abstract class Mapper<T> {
  public abstract map(raw: any): T;
}

export abstract class CrudRepository<T extends { id: string }> {

  constructor(
    protected TableName: string,
    protected mapper: Mapper<T>,
    protected db = new AWS.DynamoDB.DocumentClient()
  ) { }
  
  public async findOneById(id: string): Promise<T> {
    const data = await this.db.get({
      TableName: this.TableName,
      Key: { id }
    }).promise();
    if (data.Item) {
      return this.mapper.map(data.Item);
    }
  }

  public async update(Item: T): Promise<T> {
    if (Item.id) {
      await this.db.put({
        TableName: this.TableName,
        Item
      }).promise();
      return Item;
    }
  }
  
  public async insert(Item: T): Promise<T> {
    Item.id = this.newModelId(4);
    await this.db.put({
      TableName: this.TableName,
      Item
    }).promise();
    return Item;
  }

  public async delete(Item: T): Promise<void> {
    if (Item.id) {
      await this.db.delete({
        TableName: this.TableName,
        Key: { 'id': Item.id }
      }).promise();
    }
  }

  public async findAll(): Promise<T[]> {
    const request = await this.db.scan({
      TableName: this.TableName
    }).promise();
    if (request.Count) {
      return request.Items.map(Item => this.mapper.map(Item));
    }
    return [];
  }

  private newModelId = (subId) => `${(
    (((new Date().getTime() - 1300000000000) * 64) + subId) * 512) + 
    ((Math.floor(Math.random() * 512)) % 512)}`;

}
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const dbName = process.env['MYSQL_DB'];
        const baseConn: DataSourceOptions = {
          type: 'mysql',
          host: process.env['MYSQL_HOST'],
          port: +(process.env['MYSQL_PORT'] || 0),
          username: process.env['MYSQL_USER'],
          password: process.env['MYSQL_PASS'],
        }


        const dataSource = new DataSource(baseConn);
        const tempConnection = await dataSource.initialize();
        const result = await tempConnection.query(`SHOW DATABASES LIKE '${dbName}';`);

        if (result.length === 0) {
          Logger.log("Database does not exist, create it");
          await tempConnection.query(`CREATE DATABASE ${dbName}`);
        }
        tempConnection.destroy().then();


        return {
          ...baseConn,
          database: dbName,
          autoLoadEntities: true,
          migrations: [`${__dirname}/migration/*.js`],
          entities: []
        }
      }
    })
  ],
})
export class DatabaseModule { }

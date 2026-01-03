import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../domain/user/aggregates/user.aggregate';
import { IUserRepo } from '../../domain/user/repos/user.repo.interface';
import { IDatabaseServiceToken } from 'src/shared/infra/database/database.service.interface';
import { userTable } from 'src/shared/infra/database/drizzle/schemas/user.schema';
import { eq } from 'drizzle-orm';
import { Name } from '../../domain/user/valueObjects/name.vo';
import { Email } from '../../domain/user/valueObjects/email.vo';
import { DrizzleService } from 'src/shared/infra/database/drizzle/drizzle.service';

@Injectable()
export class PostgresUserRepo implements IUserRepo {
  constructor(
    @Inject(IDatabaseServiceToken)
    private readonly databaseService: DrizzleService,
  ) {}

  private get db() {
    return this.databaseService.getClient();
  }

  async findById(id: string): Promise<User | null> {
    const rows = await this.db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id));
    if (!rows.length) return null;

    const row = rows[0];

    return User.fromPersistence({
      id: row.id,
      googleId: row.googleId,
      email: Email.create(row.email),
      name: Name.create(row.name),
      pictureUrl: row.pictureUrl ?? undefined,
      createdAt: row.createdAt,
    });
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    const rows = await this.db
      .select()
      .from(userTable)
      .where(eq(userTable.googleId, googleId));
    if (!rows.length) return null;

    const row = rows[0];

    return User.fromPersistence({
      id: row.id,
      googleId: row.googleId,
      email: Email.create(row.email),
      name: Name.create(row.name),
      pictureUrl: row.pictureUrl ?? undefined,
      createdAt: row.createdAt,
    });
  }

  async save(user: User): Promise<void> {
    const exists = await this.findById(user.id);

    if (exists) {
      await this.db
        .update(userTable)
        .set({
          email: user.email.value,
          name: user.name.value,
          pictureUrl: user.pictureUrl,
        })
        .where(eq(userTable.id, user.id));
    } else {
      await this.db.insert(userTable).values({
        id: user.id,
        googleId: user.googleId,
        email: user.email.value,
        name: user.name.value,
        pictureUrl: user.pictureUrl,
        createdAt: user.createdAt,
      });
    }
  }
}

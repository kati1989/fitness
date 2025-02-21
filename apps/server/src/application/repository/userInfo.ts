import { eq } from "drizzle-orm";
import { db, NewUserInfo, userInfoSchema } from "../database/database";

export class UserInfoRepository {
  public async findAll() {
    return db.select().from(userInfoSchema).execute();
  }

  public async findByUserId(userId: string) {
    return db
      .select()
      .from(userInfoSchema)
      .where(eq(userInfoSchema.user_id, userId))
      .execute();
  }

  public async create(userInfo: NewUserInfo) {
    return db.insert(userInfoSchema).values(userInfo).execute();
  }

  public async update(id: string, updatedUser: Partial<NewUserInfo>) {
    return db
      .update(userInfoSchema)
      .set(updatedUser)
      .where(eq(userInfoSchema.id, id))
      .execute();
  }
}

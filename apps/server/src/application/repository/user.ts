import { eq } from "drizzle-orm";
import { userSchema } from "../../../schema/schema";
import { db, type NewUser } from "../lib/database";

export class UserRepository {
  public async create(user: NewUser) {
    return db.insert(userSchema).values(user).execute();
  }

  public async find(id: number) {
    return db.select().from(userSchema).where(eq(userSchema.id, id)).execute();
  }

  public async findByEmail(email: string) {
    return db
      .select()
      .from(userSchema)
      .where(eq(userSchema.email, email))
      .execute();
  }
}

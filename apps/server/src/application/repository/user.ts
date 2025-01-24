import { eq } from "drizzle-orm";
import { db, userSchema, type NewUser } from "../database/database";

export class UserRepository {
  public async create(user: NewUser) {
    console.log(userSchema);

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

  public async update(id: number, updatedUser: Partial<NewUser>) {
    return db
      .update(userSchema)
      .set(updatedUser)
      .where(eq(userSchema.id, id))
      .execute();
  }
}

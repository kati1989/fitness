import { eq } from "drizzle-orm";
import { db, type NewGym, gymSchema } from "../database/database";

export class GymRepository {
  public async create(gym: NewGym) {
    return db.insert(gymSchema).values(gym).execute();
  }

  public async findById(id: string) {
    return db.select().from(gymSchema).where(eq(gymSchema.id, id)).execute();
  }

  public async findAll() {
    return db.select().from(gymSchema).execute();
  }

  public async update(id: string, updatedGym: Partial<NewGym>) {
    return db
      .update(gymSchema)
      .set(updatedGym)
      .where(eq(gymSchema.id, id))
      .execute();
  }

  public async delete(id: string) {
    return db.delete(gymSchema).where(eq(gymSchema.id, id)).execute();
  }
}

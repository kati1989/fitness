import { eq } from "drizzle-orm";
import { gymSchema } from "../../../schema/schema";
import { db, type NewGym } from "../lib/database";

export class GymRepository {
  public async create(gym: NewGym) {
    return db.insert(gymSchema).values(gym).execute();
  }

  public async findById(id: number) {
    return db.select().from(gymSchema).where(eq(gymSchema.id, id)).execute();
  }

  public async findAll() {
    return db.select().from(gymSchema).execute();
  }

  public async update(id: number, updatedGym: Partial<NewGym>) {
    return db
      .update(gymSchema)
      .set(updatedGym)
      .where(eq(gymSchema.id, id))
      .execute();
  }

  public async delete(id: number) {
    return db.delete(gymSchema).where(eq(gymSchema.id, id)).execute();
  }
}

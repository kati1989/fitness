import { eq } from "drizzle-orm";
import { db, type NewGymScore, gymScoreSchema } from "../database/database";

export class GymScoreRepository {
  public async create(gymScore: NewGymScore) {
    return db.insert(gymScoreSchema).values(gymScore).execute();
  }

  public async findById(id: string) {
    return db
      .select()
      .from(gymScoreSchema)
      .where(eq(gymScoreSchema.id, id))
      .execute();
  }

  public async findByGymId(gymId: string) {
    return db
      .select()
      .from(gymScoreSchema)
      .where(eq(gymScoreSchema.gym_id, gymId))
      .execute();
  }

  public async findByUserId(userId: string) {
    return db
      .select()
      .from(gymScoreSchema)
      .where(eq(gymScoreSchema.user_id, userId))
      .execute();
  }

  public async findAll() {
    return db.select().from(gymScoreSchema).execute();
  }

  public async update(id: string, updatedGymScore: Partial<NewGymScore>) {
    return db
      .update(gymScoreSchema)
      .set(updatedGymScore)
      .where(eq(gymScoreSchema.id, id))
      .execute();
  }

  public async delete(id: string) {
    return db.delete(gymScoreSchema).where(eq(gymScoreSchema.id, id)).execute();
  }
}

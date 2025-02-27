import { eq } from "drizzle-orm";
import {
  db,
  type NewGymMembership,
  gymMembershipSchema,
} from "../database/database";

export class GymMembershipRepository {
  public async create(gymMembership: NewGymMembership) {
    return db.insert(gymMembershipSchema).values(gymMembership).execute();
  }

  public async findById(id: string) {
    return db
      .select()
      .from(gymMembershipSchema)
      .where(eq(gymMembershipSchema.id, id))
      .execute();
  }

  public async findByGymId(gymId: string) {
    return db
      .select()
      .from(gymMembershipSchema)
      .where(eq(gymMembershipSchema.gym_id, gymId))
      .execute();
  }

  public async findAll() {
    return db.select().from(gymMembershipSchema).execute();
  }

  public async update(
    id: string,
    updatedGymMembership: Partial<NewGymMembership>
  ) {
    return db
      .update(gymMembershipSchema)
      .set(updatedGymMembership)
      .where(eq(gymMembershipSchema.id, id))
      .execute();
  }

  public async delete(id: string) {
    return db
      .delete(gymMembershipSchema)
      .where(eq(gymMembershipSchema.id, id))
      .execute();
  }
}

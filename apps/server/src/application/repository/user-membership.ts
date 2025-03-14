import { and, eq } from "drizzle-orm";
import {
  db,
  type NewUserMembership,
  userMembershipSchema,
  gymMembershipSchema,
  gymSchema,
} from "../database/database";

export interface UserMembershipWithDetails {
  userMembershipId: string;
  userId: string;
  membershipId: string;
  type: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  shortDescription: string;
  gymId: string;
  gymName: string;
  gymLocation: string;
}

export class UserMembershipRepository {
  public async create(userMembership: NewUserMembership) {
    return db.insert(userMembershipSchema).values(userMembership).execute();
  }

  public async findById(id: string) {
    return db
      .select()
      .from(userMembershipSchema)
      .where(eq(userMembershipSchema.id, id))
      .execute();
  }
  public async findByUserIdAndGymId(userId: string, gymId: string) {
    const result = await db
      .select({
        userMembershipId: userMembershipSchema.id,
        userId: userMembershipSchema.user_id,
        membershipId: gymMembershipSchema.id,
        type: gymMembershipSchema.type,
        monthlyPrice: gymMembershipSchema.monthly_price,
        yearlyPrice: gymMembershipSchema.yearly_price,
        description: gymMembershipSchema.description,
        shortDescription: gymMembershipSchema.short_description,
        gymId: gymMembershipSchema.gym_id,
        gymName: gymSchema.name,
        gymLocation: gymSchema.location,
      })
      .from(userMembershipSchema)
      .innerJoin(
        gymMembershipSchema,
        eq(userMembershipSchema.membership_id, gymMembershipSchema.id)
      )
      .innerJoin(gymSchema, eq(gymMembershipSchema.gym_id, gymSchema.id))
      .where(
        and(
          eq(userMembershipSchema.user_id, userId),
          eq(gymMembershipSchema.gym_id, gymId)
        )
      )
      .execute();

    return result;
  }

  public async findByUserIdWithMemberships(
    userId: string
  ): Promise<UserMembershipWithDetails[]> {
    return db
      .select({
        userMembershipId: userMembershipSchema.id,
        userId: userMembershipSchema.user_id,
        membershipId: gymMembershipSchema.id,
        type: gymMembershipSchema.type,
        monthlyPrice: gymMembershipSchema.monthly_price,
        yearlyPrice: gymMembershipSchema.yearly_price,
        description: gymMembershipSchema.description,
        shortDescription: gymMembershipSchema.short_description,
        gymId: gymSchema.id,
        gymName: gymSchema.name,
        gymLocation: gymSchema.location,
      })
      .from(userMembershipSchema)
      .innerJoin(
        gymMembershipSchema,
        eq(userMembershipSchema.membership_id, gymMembershipSchema.id)
      )
      .innerJoin(gymSchema, eq(gymMembershipSchema.gym_id, gymSchema.id))
      .where(eq(userMembershipSchema.user_id, userId))
      .execute();
  }

  public async findByUserId(userId: string) {
    return db
      .select()
      .from(userMembershipSchema)
      .where(eq(userMembershipSchema.user_id, userId))
      .execute();
  }

  public async findAll() {
    return db.select().from(userMembershipSchema).execute();
  }

  public async update(
    id: string,
    updatedUserMembership: Partial<NewUserMembership>
  ) {
    return db
      .update(userMembershipSchema)
      .set(updatedUserMembership)
      .where(eq(userMembershipSchema.id, id))
      .execute();
  }

  public async delete(id: string) {
    return db
      .delete(userMembershipSchema)
      .where(eq(userMembershipSchema.id, id))
      .execute();
  }
}

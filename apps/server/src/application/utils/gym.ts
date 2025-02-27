import { GymScore } from "@server/database/database";

export const calculateGymScore = (gymScores: GymScore[]) => {
  if (gymScores.length === 0) {
    return null;
  }

  let score = 0;

  gymScores.forEach((gymScore) => {
    score += gymScore.score;
  });

  return gymScores.length ? score / gymScores.length : 0;
};

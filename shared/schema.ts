import { pgTable, text, serial, integer, boolean, timestamp, real, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sports = pgTable("sports", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  color: text("color").notNull(),
  isActive: boolean("is_active").default(true),
});

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  shortName: text("short_name").notNull(),
  sportId: integer("sport_id").notNull(),
  logo: text("logo"),
  ranking: integer("ranking"),
  country: text("country"),
  isActive: boolean("is_active").default(true),
});

export const games = pgTable("games", {
  id: serial("id").primaryKey(),
  sportId: integer("sport_id").notNull(),
  homeTeamId: integer("home_team_id").notNull(),
  awayTeamId: integer("away_team_id").notNull(),
  gameTime: timestamp("game_time").notNull(),
  venue: text("venue"),
  weather: text("weather"),
  temperature: text("temperature"),
  status: text("status").default("scheduled"), // scheduled, live, completed, cancelled
  homeScore: integer("home_score"),
  awayScore: integer("away_score"),
  currentPeriod: text("current_period"),
  gameData: jsonb("game_data"), // Additional game-specific data
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const predictions = pgTable("predictions", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id").notNull(),
  predictedWinnerId: integer("predicted_winner_id").notNull(),
  confidence: real("confidence").notNull(), // 0-100
  factors: jsonb("factors"), // Prediction factors and weights
  teamFormFactor: real("team_form_factor"),
  headToHeadFactor: real("head_to_head_factor"),
  injuryFactor: real("injury_factor"),
  homeAdvantage: real("home_advantage"),
  weatherFactor: real("weather_factor"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const teamStats = pgTable("team_stats", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").notNull(),
  sportId: integer("sport_id").notNull(),
  gamesPlayed: integer("games_played").default(0),
  wins: integer("wins").default(0),
  losses: integer("losses").default(0),
  draws: integer("draws").default(0),
  winPercentage: real("win_percentage").default(0),
  averageScore: real("average_score").default(0),
  recentForm: text("recent_form"), // e.g., "WWLWD"
  homeWinRate: real("home_win_rate").default(0),
  awayWinRate: real("away_win_rate").default(0),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const playerStats = pgTable("player_stats", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  teamId: integer("team_id").notNull(),
  sportId: integer("sport_id").notNull(),
  position: text("position"),
  isInjured: boolean("is_injured").default(false),
  injuryDetails: text("injury_details"),
  performanceRating: real("performance_rating"),
  statsData: jsonb("stats_data"), // Sport-specific stats
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const liveScores = pgTable("live_scores", {
  id: serial("id").primaryKey(),
  gameId: integer("game_id").notNull(),
  homeTeamScore: integer("home_team_score").default(0),
  awayTeamScore: integer("away_team_score").default(0),
  period: text("period"),
  timeRemaining: text("time_remaining"),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

// Insert schemas
export const insertSportSchema = createInsertSchema(sports).omit({ id: true });
export const insertTeamSchema = createInsertSchema(teams).omit({ id: true });
export const insertGameSchema = createInsertSchema(games).omit({ id: true, createdAt: true, updatedAt: true });
export const insertPredictionSchema = createInsertSchema(predictions).omit({ id: true, createdAt: true, updatedAt: true });
export const insertTeamStatsSchema = createInsertSchema(teamStats).omit({ id: true, lastUpdated: true });
export const insertPlayerStatsSchema = createInsertSchema(playerStats).omit({ id: true, lastUpdated: true });
export const insertLiveScoreSchema = createInsertSchema(liveScores).omit({ id: true, lastUpdated: true });

// Types
export type Sport = typeof sports.$inferSelect;
export type Team = typeof teams.$inferSelect;
export type Game = typeof games.$inferSelect;
export type Prediction = typeof predictions.$inferSelect;
export type TeamStats = typeof teamStats.$inferSelect;
export type PlayerStats = typeof playerStats.$inferSelect;
export type LiveScore = typeof liveScores.$inferSelect;

export type InsertSport = z.infer<typeof insertSportSchema>;
export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type InsertGame = z.infer<typeof insertGameSchema>;
export type InsertPrediction = z.infer<typeof insertPredictionSchema>;
export type InsertTeamStats = z.infer<typeof insertTeamStatsSchema>;
export type InsertPlayerStats = z.infer<typeof insertPlayerStatsSchema>;
export type InsertLiveScore = z.infer<typeof insertLiveScoreSchema>;

// Extended types for API responses
export interface GameWithDetails extends Game {
  sport: Sport;
  homeTeam: Team;
  awayTeam: Team;
  prediction?: Prediction;
  liveScore?: LiveScore;
}

export interface TeamWithStats extends Team {
  stats: TeamStats;
  sport: Sport;
}

export interface GameStatsDetails {
  game: GameWithDetails;
  homeTeamStats: TeamStats;
  awayTeamStats: TeamStats;
  homePlayers: PlayerStats[];
  awayPlayers: PlayerStats[];
  headToHead: {
    totalGames: number;
    homeWins: number;
    awayWins: number;
    draws: number;
  };
}

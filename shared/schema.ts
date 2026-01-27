import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, jsonb, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Tracking event schema for timeline
export const trackingEventSchema = z.object({
  date: z.string(),
  time: z.string().optional(),
  location: z.string().optional(),
  status: z.string(),
  description: z.string(),
});

export type TrackingEvent = z.infer<typeof trackingEventSchema>;

// Main tracking records table
export const trackingRecords = pgTable("tracking_records", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  trackingNumber: text("tracking_number").notNull(),
  courier: text("courier"),
  courierCode: text("courier_code"),
  status: text("status").notNull().default("pending"),
  statusDescription: text("status_description"),
  origin: text("origin"),
  destination: text("destination"),
  estimatedDelivery: text("estimated_delivery"),
  lastUpdate: text("last_update"),
  events: jsonb("events").$type<TrackingEvent[]>().default([]),
  rawResponse: text("raw_response"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Tracking history for recent searches
export const trackingHistory = pgTable("tracking_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  trackingNumber: text("tracking_number").notNull(),
  courier: text("courier"),
  lastStatus: text("last_status"),
  searchedAt: timestamp("searched_at").defaultNow().notNull(),
});

// License keys for premium access
export const licenseKeys = pgTable("license_keys", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  licenseKey: text("license_key").notNull().unique(),
  email: text("email"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  activatedAt: timestamp("activated_at"),
});

// pSEO: Affiliate Offers Table ("The Ammo Box")
// Empire Build - Full Schema
export const offers = pgTable("offers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),

  // Core Identity
  partner_name: text("partner_name").notNull(),
  affiliate_link: text("affiliate_link").notNull(),

  // Targeting
  primary_keyword: text("primary_keyword").notNull(),
  target_country: text("target_country").notNull().default("Global"),

  // Content Structure
  subdirectory: text("subdirectory").notNull().default("guides"),
  language_code: text("language_code").notNull().default("en"),
  slug: text("slug"),

  // Legacy fields (for n8n compatibility)
  courier_name: text("courier_name"),
  city: text("city"),
  target_keyword: text("target_keyword"),

  // Status
  status: text("status").notNull().default("pending"), // pending, published
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const trackingRecordsRelations = relations(trackingRecords, ({ }) => ({}));
export const trackingHistoryRelations = relations(trackingHistory, ({ }) => ({}));
export const licenseKeysRelations = relations(licenseKeys, ({ }) => ({}));

// Insert schemas
export const insertTrackingRecordSchema = createInsertSchema(trackingRecords).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTrackingHistorySchema = createInsertSchema(trackingHistory).omit({
  id: true,
  searchedAt: true,
});

export const insertLicenseKeySchema = createInsertSchema(licenseKeys).omit({
  id: true,
  createdAt: true,
  activatedAt: true,
});

// Types
export type InsertTrackingRecord = z.infer<typeof insertTrackingRecordSchema>;
export type TrackingRecord = typeof trackingRecords.$inferSelect;
export type InsertTrackingHistory = z.infer<typeof insertTrackingHistorySchema>;
export type TrackingHistory = typeof trackingHistory.$inferSelect;
export type InsertLicenseKey = z.infer<typeof insertLicenseKeySchema>;
export type LicenseKey = typeof licenseKeys.$inferSelect;

// API request/response schemas
export const trackRequestSchema = z.object({
  trackingNumber: z.string().min(1, "Tracking number is required"),
  carrier: z.string().optional().nullable(),
});

export type TrackRequest = z.infer<typeof trackRequestSchema>;

// API response type (different from database schema)
export interface TrackingAPIResponse {
  trackingNumber: string;
  carrier: string;
  status: string;
  notFound?: boolean;
  estimatedDelivery: string | null;
  lastUpdated: string | null;
  events: Array<{
    status: string;
    location: string;
    city: string;
    state: string;
    country: string;
    date: string;
    time: string;
    timestamp: string;
    description: string;
  }>;
  origin: string | null;
  destination: string | null;
  trackingUrl?: string;
  aiPrediction?: {
    prediction: string;
    confidence: number;
    reasoning: string;
  };
}

// Status enum for UI display
export const TrackingStatus = {
  PENDING: "pending",
  IN_TRANSIT: "in_transit",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  EXCEPTION: "exception",
  UNKNOWN: "unknown",
} as const;

export type TrackingStatusType = typeof TrackingStatus[keyof typeof TrackingStatus];

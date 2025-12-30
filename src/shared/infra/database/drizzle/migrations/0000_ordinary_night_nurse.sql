CREATE TABLE "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"google_id" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"picture_url" text DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL
);

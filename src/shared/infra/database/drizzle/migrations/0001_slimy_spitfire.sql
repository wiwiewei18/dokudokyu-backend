CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"size" bigint NOT NULL,
	"storage_path" varchar(255) NOT NULL,
	"status" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

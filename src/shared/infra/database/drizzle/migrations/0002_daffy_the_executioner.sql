CREATE TABLE "knowledges" (
	"id" uuid PRIMARY KEY NOT NULL,
	"document_id" uuid NOT NULL,
	"extracted_content" text NOT NULL,
	"summary" text NOT NULL,
	"keywords" json NOT NULL,
	"important_dates" json NOT NULL,
	"actions" json NOT NULL,
	"created_at" timestamp NOT NULL
);

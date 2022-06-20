BEGIN;

DROP TABLE IF EXISTS "users", "operations", "customers", "comments", "deals" CASCADE ;

CREATE TABLE users(
    "user_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "admin_credentials" BOOLEAN NOT NULL DEFAULT FALSE,
    "password" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE customers(
    "customer_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE operations(
    "operation_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "fk_deal" INTEGER NOT NULL,
    "tasks" TEXT NOT NULL,
    "completion_status" NUMERIC NOT NULL DEFAULT 0.1,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE comments(
    "comment_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "content" TEXT,
    "fk_deal" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE deals(
    "deal_id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "fk_user" INTEGER DEFAULT 0,
    "fk_customer" INTEGER,
    "details" TEXT NOT NULL,
    "fk_operation" INTEGER,
    "monthly_value" INTEGER NOT NULL DEFAULT 0, 
    "one_off_value" INTEGER NOT NULL DEFAULT 0, 
    "contract_duration" INTEGER NOT NULL DEFAULT 1, 
    "status" NUMERIC NOT NULL DEFAULT 0.1,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE "comments"
  ADD FOREIGN KEY ("fk_deal") REFERENCES "deals" ("deal_id")
;

ALTER TABLE "operations"
  ADD FOREIGN KEY ("fk_deal") REFERENCES "deals"("deal_id")
;

ALTER TABLE "deals"
  ADD FOREIGN KEY ("fk_user") REFERENCES "users"("user_id"),
  ADD FOREIGN KEY ("fk_customer") REFERENCES "customers"("customer_id"),
  ADD FOREIGN KEY ("fk_operation") REFERENCES "operations"("operation_id")
;

COMMIT;
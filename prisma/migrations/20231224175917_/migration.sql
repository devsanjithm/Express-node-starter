/*
  Warnings:

  - The values [REFRESH,RESET_PASSWORD,VERIFY_EMAIL] on the enum `tokenType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "tokenType_new" AS ENUM ('refresh', 'resetPassword', 'verifyEmail', 'access');
ALTER TABLE "tokens" ALTER COLUMN "type" TYPE "tokenType_new" USING ("type"::text::"tokenType_new");
ALTER TYPE "tokenType" RENAME TO "tokenType_old";
ALTER TYPE "tokenType_new" RENAME TO "tokenType";
DROP TYPE "tokenType_old";
COMMIT;

/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `verifications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "verifications_token_key" ON "verifications"("token");

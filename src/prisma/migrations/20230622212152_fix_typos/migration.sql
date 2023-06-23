/*
  Warnings:

  - You are about to drop the column `descitprion` on the `Book` table. All the data in the column will be lost.
  - Added the required column `description` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "descitprion",
ADD COLUMN     "description" TEXT NOT NULL;

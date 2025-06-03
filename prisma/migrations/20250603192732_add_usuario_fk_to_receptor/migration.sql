/*
  Warnings:

  - Added the required column `usuarioId` to the `Receptor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Receptor" ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Receptor" ADD CONSTRAINT "Receptor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

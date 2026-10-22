-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "outOfStockColors" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "outOfStockSizes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "priceMax" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "priceMin" INTEGER NOT NULL DEFAULT 0;

-- Backfill existing rows so price range matches the current starting price
UPDATE "Product" SET "priceMin" = "startingPrice", "priceMax" = "startingPrice";

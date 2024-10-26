-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_address_key" ON "user"("email_address");

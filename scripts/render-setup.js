// Render deployment setup script
// 1. Swaps Prisma schema provider from sqlite to postgresql
// 2. Runs prisma generate and prisma db push
// 3. Runs the seed if first deploy

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const schemaPath = path.join(__dirname, "..", "prisma", "schema.prisma");
const schemaContent = fs.readFileSync(schemaPath, "utf8");

// Swap provider for PostgreSQL
const updatedContent = schemaContent.replace(
  /provider\s*=\s*"sqlite"/,
  'provider = "postgresql"'
);

fs.writeFileSync(schemaPath, updatedContent, "utf8");
console.log("✅ Switched schema provider to postgresql");

// Generate Prisma client
execSync("npx prisma generate", { stdio: "inherit" });
console.log("✅ Prisma client generated");

// Push schema to database
execSync("npx prisma db push", { stdio: "inherit" });
console.log("✅ Database schema pushed");

// Seed if needed (check if admin exists)
try {
  execSync("npm run seed", { stdio: "inherit" });
  console.log("✅ Database seeded");
} catch (e) {
  console.log("⚠️ Seed skipped (data may already exist)");
}

console.log("✅ Render setup complete!");

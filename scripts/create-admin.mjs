import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

const rl = createInterface({ input: stdin, output: stdout });

try {
  const email = (await rl.question("Administrator email: "))
    .trim()
    .toLowerCase();
  const name = (await rl.question("Administrator name: ")).trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Enter a valid email address.");
  }
  if (!name) throw new Error("Name is required.");

  const password = await new Promise((resolve, reject) => {
    stdout.write("Administrator password (hidden): ");
    stdin.setRawMode?.(true);
    let value = "";

    const onData = (chunk) => {
      const key = chunk.toString();

      if (key === "\u0003") {
        stdin.setRawMode?.(false);
        stdin.off("data", onData);
        reject(new Error("Cancelled."));
      } else if (key === "\r" || key === "\n") {
        stdin.setRawMode?.(false);
        stdin.off("data", onData);
        stdout.write("\n");
        resolve(value);
      } else if (key === "\u007f" || key === "\b") {
        value = value.slice(0, -1);
      } else {
        value += key;
      }
    };

    stdin.on("data", onData);
  });

  if (password.length < 12 || password.length > 128) {
    throw new Error("Use a password between 12 and 128 characters.");
  }

  const url = process.env.DATABASE_URL_POOLED || process.env.DATABASE_URL;
  if (!url) throw new Error("Database environment variable is missing.");

  const sql = neon(url);
  const hash = await bcrypt.hash(password, 12);

  await sql`
    INSERT INTO admin_users (email, name, password_hash, role, active)
    VALUES (${email}, ${name}, ${hash}, 'super_admin', TRUE)
    ON CONFLICT (email) DO UPDATE SET
      name = EXCLUDED.name,
      password_hash = EXCLUDED.password_hash,
      role = 'super_admin',
      active = TRUE,
      updated_at = NOW()
  `;

  console.log("Administrator provisioned successfully.");
  console.log("Email:", email);
  console.log("Role: super_admin");
} catch (error) {
  console.error(error instanceof Error ? error.message : "Provisioning failed.");
  process.exitCode = 1;
} finally {
  rl.close();
}

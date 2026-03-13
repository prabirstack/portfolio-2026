import { auth } from "@/lib/auth";
async function seed() {
  await auth.api.signUpEmail({
    body: {
      name: "Prabir Singh",
      email: "prabir@prabir.dev",
      password: process.env.ADMIN_PASSWORD!,
    },
  });
  console.log("Admin user created successfully");
}

seed()
  .catch(console.error)
  .finally(() => process.exit(0));

import bcrypt from "bcryptjs";

export default async function hashPassword() {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    console.log(hashedPassword);
}


"use server";

import * as repository from '../repository';
import * as emnify from '../emnify';
import { auth, signIn, signOut } from "@/auth"

import bcrypt from "bcrypt"

export async function userAuthenticate(formData: FormData) {
  const { username, password } = Object.fromEntries(formData.entries())
  const result = await emnify.authenticate({ token: process.env.BWS_EMNIFY_AUTH_TOKEN })
  if (!result) return
  await signIn("credentials", {
    token: result.token,
    username,
    password
  })
}

export async function isAdmOrSupport(): Promise<boolean> {
  const data = await auth()
  if(!data){
      return false
  }
  return data.user.role ===  'adm' || data.user.role === "support"
}

export async function userLogout() {
  try {
    await signOut({ redirectTo: "/login" });
  } catch (error) {
    throw error;
  }
}

export async function changeUserPassword(formData: FormData) {
  const { new_password } = Object.fromEntries(formData.entries())
  const hashPassword = await bcrypt.hash(new_password as string, 10)
  return await repository.updateUser({
    password: hashPassword
  })
}

export async function recoverUserPassword(formData: FormData) {
  const entries = Object.fromEntries(formData.entries());
  const username = entries.username.toString();
  const new_password = entries.new_password.toString();


  const user = await repository.listUserByUsername(username);
  if (!user) {
    throw new Error('Usuário não encontrado');
  }
  const hashPassword = await bcrypt.hash(new_password, 10)
  return await repository.updateUser({
    username: username,
    password: hashPassword
  })
}
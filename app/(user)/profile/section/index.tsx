'use client'
import { Button } from "@bwsoft/button";
import { Input } from "@bwsoft/input";

export default function FormProfile() {
    return (
        <>
        <Input.Root className="col-span-full">
            <Input.Label >Nova senha</Input.Label>
            <Input.Group>
                <Input.Field 
                    type="password"
                    name="new_password"
                    id="new_password"
                    placeholder="143" 
                />
            </Input.Group>
        </Input.Root>

        <Input.Root className="col-span-full">
            <Input.Label >Confirmar nova senha</Input.Label>
            <Input.Group>
                <Input.Field 
                    type="password"
                    name="confirm_new_password"
                    id="confirm_new_password"
                />
            </Input.Group>
        </Input.Root>

        <div className="flex w-full col-span-full items-center justify-end gap-6">
            <Button
                type="submit"
                // className="rounded-md bg-indigo-600 w-auto px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Confirmar alteração de senha
            </Button>
        </div>
    </>
    )
}
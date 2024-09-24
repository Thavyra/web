"use server"

import { fetchWithAuth } from "@/actions/fetch"
import { z } from "zod"

export async function getCurrentUser() {
    const response = await fetchWithAuth("/users/@me")

    const data = await response.json()

    return data as {
        id: string
        username: string
        description: string | null
    }
}

export interface ChangeUsernameState {
    result?: "success" | "failed"
    errors?: string[]
}

export async function changeUsername(prevState: ChangeUsernameState, formData: FormData): Promise<ChangeUsernameState> {

    const schema = z.object({
        username: z.string()
            .min(1)
            .max(40)
            .regex(/([a-zA-Z0-9_\-\'\.]+)/)
    })

    const validationResult = schema.safeParse({
        username: formData.get("username")
    })

    if (!validationResult.success) {
        validationResult.error.flatten().fieldErrors
    }

    const data = validationResult.data

    const response = await fetchWithAuth("/users/@me", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    if (!response.ok) {
        const errors = await response.json() as ErrorResponse

        return {
            result: "failed",
            errors: errors.errors.map(x => x.reason)
        }
    }

    return {
        result: "success"
    }
}
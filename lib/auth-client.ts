import { createAuthClient } from "better-auth/client"
import { apiKeyClient, jwtClient, passkeyClient, twoFactorClient, usernameClient } from "better-auth/client/plugins"
export const authClient = createAuthClient({
    plugins: [
        twoFactorClient(),
        usernameClient(),
        passkeyClient(),

        apiKeyClient(),
        jwtClient()
    ]
})

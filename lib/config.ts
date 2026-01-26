// Client-side configuration
// Next.js will replace these at build time from environment variables
export const config = {
  vapi: {
    webToken: process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN || "5923fdde-e31e-4c01-9ef0-e3e8f0f97638",
    workflowId: process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID || "865b34d9-2164-4c46-abe5-73bb53c84022",
  },
} as const;
